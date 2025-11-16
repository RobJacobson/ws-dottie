#!/usr/bin/env node

/**
 * Generate OpenAPI 3.0 specifications from all API definitions
 *
 * This script converts Zod schemas to OpenAPI format and generates
 * complete OpenAPI specifications for all APIs in the ws-dottie project.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import yaml from "js-yaml";
// Import shared schemas for canonical registration
import { roadwayLocationSchema } from "../../src/apis/shared/roadwayLocationSchema.ts";
import type { ApiDefinition } from "../../src/apis/types.ts";
import { apis, endpoints } from "../../src/shared/endpoints.ts";
import type { Endpoint } from "../../src/shared/types.ts";
import { z } from "../../src/shared/zod.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../..");

/**
 * Schema registry to track registered schemas per OpenAPI registry
 * This enables deduplication within each API specification
 */
const schemaRegistries = new WeakMap<
  OpenAPIRegistry,
  WeakMap<z.ZodSchema, string>
>();

/**
 * Format JSON data for display in code examples with truncation indicators
 *
 * For arrays, returns first item + a truncation indicator object showing how many
 * items were omitted. For objects, returns the full response.
 * Returns actual JavaScript objects/arrays (not strings) so OpenAPI
 * can properly serialize them as JSON/YAML with syntax highlighting.
 *
 * @param data - The JSON data to format
 * @returns Object containing truncated data and metadata about truncation
 */
const formatSampleData = (
  data: unknown
): {
  data: unknown;
  isTruncated: boolean;
  totalItems?: number;
} => {
  const isArray = Array.isArray(data);

  if (isArray && data.length > 1) {
    // For arrays with multiple items, return first item only
    const truncatedArray = [data[0]];
    return {
      data: truncatedArray,
      isTruncated: true,
      totalItems: data.length,
    };
  } else if (isArray && data.length === 1) {
    // Single item array - no truncation needed
    return {
      data: [data[0]],
      isTruncated: false,
      totalItems: 1,
    };
  } else if (isArray) {
    // Empty array
    return {
      data: [],
      isTruncated: false,
      totalItems: 0,
    };
  } else {
    // Single object - return full response
    return {
      data,
      isTruncated: false,
    };
  }
};

/**
 * Finds the endpoint group name for a given endpoint
 *
 * This function matches endpoints to their groups by examining the endpoint's
 * function name and matching it to group patterns. Since endpoints don't directly
 * reference their groups, we match them based on function name patterns.
 *
 * @param api - The API definition containing endpoint groups
 * @param endpoint - The endpoint to find the group for
 * @returns The group name, or a default group name if not found
 */
const findEndpointGroup = (
  api: ApiDefinition,
  endpoint: Endpoint<unknown, unknown>
): string => {
  // Try to match endpoint to a group by checking function name patterns
  // This is a heuristic approach - we match based on common naming patterns
  const functionNameLower = endpoint.functionName
    .toLowerCase()
    .replace(/^fetch/, "");

  for (const group of api.endpointGroups) {
    // Check if the function name matches common patterns for this group
    // For example, "fetchVesselLocations" might belong to "vessel-locations" group
    const groupNameLower = group.name.toLowerCase().replace(/-/g, "");

    // Check if function name contains group name keywords (after removing "fetch" prefix)
    if (
      functionNameLower.includes(groupNameLower) ||
      groupNameLower.includes(functionNameLower)
    ) {
      return group.name;
    }
  }

  // Fallback: use the first group or create a default
  return api.endpointGroups[0]?.name || "default";
};

const fetchAndSaveSampleData = async (
  api: ApiDefinition,
  functionName: string,
  _endpoint: Endpoint<unknown, unknown>
): Promise<{
  data: unknown;
  isTruncated: boolean;
  totalItems?: number;
}> => {
  const samplesPath = join(
    projectRoot,
    "docs",
    "generated",
    "sample-data",
    api.api.name,
    `${functionName}.json`
  );

  try {
    // Read existing sample data from file instead of fetching fresh data
    if (!existsSync(samplesPath)) {
      throw new Error(
        `Sample data file not found: ${samplesPath}. Please ensure sample data exists.`
      );
    }

    const data = JSON.parse(readFileSync(samplesPath, "utf-8"));
    process.stderr.write(`  [sample] loaded from file for ${functionName}\r`);

    // Return formatted data for use in documentation
    return formatSampleData(data);
  } catch (error) {
    process.stderr.write(
      `  [sample] error loading ${functionName}: ${error instanceof Error ? error.message : JSON.stringify(error)}\r`
    );
    throw new Error(
      `Failed to load sample data for ${functionName}: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

/**
 * Generate code example as a template string
 *
 * Creates a complete, executable code example showing how to use the endpoint
 * with the fetch function directly, including imports, function call, and proper formatting.
 * Matches the format used in README.md and documentation.
 *
 * @param api - The API definition (needed for import path)
 * @param endpoint - The endpoint definition containing function name and sample parameters
 * @returns A formatted string containing the complete code example
 */
const generateCodeExample = (
  api: ApiDefinition,
  functionName: string,
  endpoint: Endpoint<unknown, unknown>
): string => {
  const sampleParams = endpoint.sampleParams;
  const hasParams =
    sampleParams &&
    typeof sampleParams !== "function" &&
    Object.keys(sampleParams).length > 0;

  const paramsLine = hasParams
    ? `  params: ${JSON.stringify(sampleParams, null, 2)
        .split("\n")
        .map((line, i) => (i === 0 ? line : `  ${line}`))
        .join("\n")},\n`
    : "";

  const apiCoreImportPath = `ws-dottie/${api.api.name}/core`;

  return `import { ${functionName} } from '${apiCoreImportPath}';

const data = await ${functionName}({
${paramsLine}  fetchMode: 'native',
  validate: true
});

console.log(data);`;
};

/**
 * Separate input schema fields into path and query parameters
 *
 * Analyzes the endpoint path and input schema to determine which parameters
 * belong in the URL path vs query string, returning them as separate objects.
 *
 * @param inputSchema - The Zod object schema containing input parameters
 * @param endpointPath - The endpoint path template (e.g., "/api/{id}/items")
 * @returns An object containing `pathParams` and `queryParams` as separate Zod object schemas
 */
const separateParams = (
  inputSchema: z.ZodObject<Record<string, z.ZodTypeAny>>,
  endpointPath: string
): {
  pathParams: Record<string, z.ZodTypeAny>;
  queryParams: Record<string, z.ZodTypeAny>;
} => {
  const shapeDef = (
    inputSchema._def as { shape?: Record<string, z.ZodTypeAny> }
  ).shape;

  if (!shapeDef || Object.keys(shapeDef).length === 0) {
    return { pathParams: {}, queryParams: {} };
  }

  return Object.entries(shapeDef).reduce(
    (acc, [key, fieldSchema]) => {
      if (endpointPath.includes(`{${key}}`)) {
        acc.pathParams[key] = fieldSchema;
      } else {
        acc.queryParams[key] = fieldSchema;
      }
      return acc;
    },
    {
      pathParams: {} as Record<string, z.ZodTypeAny>,
      queryParams: {} as Record<string, z.ZodTypeAny>,
    }
  );
};

/**
 * Generate a schema name from endpoint function name and type
 *
 * @param functionName - The endpoint function name (e.g., "getVesselLocations")
 * @param type - The schema type ("Input" or "Output")
 * @returns Formatted schema name (e.g., "GetVesselLocationsOutput")
 */
const generateSchemaName = (
  functionName: string,
  type: "Input" | "Output"
): string => {
  // Convert function name like "getVesselLocationsByVesselId" to "VesselLocationsByVesselId"
  const baseName =
    functionName.startsWith("get") &&
    functionName.length > 3 &&
    functionName[3] === functionName[3].toUpperCase()
      ? functionName.slice(3)
      : functionName.charAt(0).toUpperCase() + functionName.slice(1);

  return `${baseName}${type}`;
};

/**
 * Get canonical name for a shared schema if it's a known shared schema
 *
 * @param schema - The Zod schema to check
 * @returns Canonical name if it's a shared schema, null otherwise
 */
const getSharedSchemaName = (schema: z.ZodSchema): string | null => {
  // Check if this is roadwayLocationSchema (shared across WSDOT APIs)
  if (schema === roadwayLocationSchema) {
    return "RoadwayLocation";
  }
  // Add more shared schema checks here as needed
  return null;
};

/**
 * Register a schema in components/schemas by applying .openapi() method
 *
 * Implements schema deduplication by tracking registered schema instances
 * and reusing them when encountered again. Shared schemas get canonical names.
 *
 * @param registry - The OpenAPI registry
 * @param schema - The Zod schema to register
 * @param schemaName - The name to register it under (may be overridden for shared schemas)
 * @returns The schema with .openapi() applied if available, otherwise original schema
 */
const registerSchema = (
  registry: OpenAPIRegistry,
  schema: z.ZodSchema,
  schemaName: string
): z.ZodSchema => {
  // Get or create schema registry for this OpenAPI registry
  let schemaRegistry = schemaRegistries.get(registry);
  if (!schemaRegistry) {
    schemaRegistry = new WeakMap<z.ZodSchema, string>();
    schemaRegistries.set(registry, schemaRegistry);
  }

  // Check if this schema is already registered in this API's registry
  const existingName = schemaRegistry.get(schema);
  if (existingName) {
    // Schema already registered - return a reference to it
    // The library will handle $ref automatically when using .openapi() with same name
    const schemaAny = schema as z.ZodTypeAny & {
      openapi?: (name: string) => z.ZodTypeAny;
    };
    if (typeof schemaAny.openapi === "function") {
      return schemaAny.openapi(existingName) as z.ZodSchema;
    }
    return schema;
  }

  // Check if this is a shared schema that should use a canonical name
  const sharedSchemaName = getSharedSchemaName(schema);
  const finalSchemaName = sharedSchemaName || schemaName;

  const schemaAny = schema as z.ZodTypeAny & {
    openapi?: (name: string) => z.ZodTypeAny;
  };

  if (typeof schemaAny.openapi === "function") {
    try {
      // Apply .openapi() to register the schema name
      const registeredSchema = schemaAny.openapi(finalSchemaName);
      // Explicitly register with the registry to ensure it appears in components/schemas
      registry.register(finalSchemaName, registeredSchema);
      // Track this schema instance as registered in this API's registry
      schemaRegistry.set(schema, finalSchemaName);
      return registeredSchema as z.ZodSchema;
    } catch {
      // If registration fails, return schema as-is (will be inline)
      return schema;
    }
  }

  // Schema doesn't have .openapi() - return as-is (will be inline)
  // This happens when schemas were created before extendZodWithOpenApi was called
  return schema;
};

/**
 * Convert endpoint to OpenAPI path using registry
 *
 * Registers an endpoint definition with the OpenAPI registry, converting
 * Zod schemas to OpenAPI format automatically. Handles path/query parameter
 * separation, registers schemas in components/schemas, and generates code examples.
 *
 * @param registry - The OpenAPI registry to register the endpoint with
 * @param api - The API definition (needed for sample cache lookup)
 * @param endpoint - The endpoint definition containing schemas, function name, and metadata
 * @param endpointPath - The endpoint path template (e.g., "/api/{id}/items")
 * @param groupName - The tag/group name for organizing endpoints
 */
const registerEndpoint = async (
  registry: OpenAPIRegistry,
  api: ApiDefinition,
  endpoint: Endpoint<unknown, unknown>,
  groupName: string
): Promise<void> => {
  const operationId = endpoint.functionName;
  const summary = endpoint.endpointDescription || "";

  // Register output schema in components/schemas
  const rawOutputSchema = endpoint.outputSchema ?? z.any();
  const endpointPath = endpoint.endpoint;
  let responseSchema: z.ZodSchema = rawOutputSchema;

  // Handle array schemas - register the item schema
  if (rawOutputSchema instanceof z.ZodArray) {
    const arrayDef = rawOutputSchema._def as unknown as {
      element?: z.ZodTypeAny;
    };
    const itemSchema = arrayDef.element;

    if (itemSchema) {
      const itemSchemaName = generateSchemaName(operationId, "Output");
      const registeredItemSchema = registerSchema(
        registry,
        itemSchema as z.ZodSchema,
        itemSchemaName
      );
      // Create array schema using the registered item schema
      responseSchema = z.array(registeredItemSchema) as z.ZodSchema;
    }
  } else {
    // Register single object schema
    const outputSchemaName = generateSchemaName(operationId, "Output");
    responseSchema = registerSchema(
      registry,
      rawOutputSchema,
      outputSchemaName
    );
  }

  // Build request - register parameters so they appear under components/parameters
  const request: Record<string, unknown> = {};
  if (endpoint.inputSchema instanceof z.ZodObject) {
    const { pathParams, queryParams } = separateParams(
      endpoint.inputSchema,
      endpointPath
    );

    const toParamRef = (
      key: string,
      fieldSchema: z.ZodTypeAny,
      location: "path" | "query"
    ): z.ZodTypeAny => {
      const isOptional = fieldSchema instanceof z.ZodOptional;
      const paramName = `${generateSchemaName(operationId, "Input")}${
        key.charAt(0).toUpperCase() + key.slice(1)
      }Param`;
      const schemaAny = fieldSchema as z.ZodTypeAny & {
        openapi?: (meta: unknown) => z.ZodTypeAny;
      };
      const withMeta =
        typeof schemaAny.openapi === "function"
          ? schemaAny.openapi({
              param: {
                name: key,
                in: location,
                required: location === "path" ? true : !isOptional,
              },
            })
          : fieldSchema;
      // Register parameter component
      const paramRef = (
        registry as unknown as {
          registerParameter: (
            name: string,
            schema: z.ZodTypeAny
          ) => z.ZodTypeAny;
        }
      ).registerParameter(paramName, withMeta as z.ZodTypeAny);
      return paramRef as z.ZodTypeAny;
    };

    if (Object.keys(pathParams).length > 0) {
      const pathParamRefs = Object.fromEntries(
        Object.entries(pathParams).map(([k, s]) => [
          k,
          toParamRef(k, s, "path"),
        ])
      );
      request.params = z.object(pathParamRefs);
    }

    if (Object.keys(queryParams).length > 0) {
      const queryParamRefs = Object.fromEntries(
        Object.entries(queryParams).map(([k, s]) => [
          k,
          toParamRef(k, s, "query"),
        ])
      );
      request.query = z.object(queryParamRefs);
    }
  }

  // Generate code example (may use cached samples or fetch live)
  process.stderr.write(`  Fetching sample data for ${operationId}...\r`);
  const codeExample = generateCodeExample(api, operationId, endpoint);
  process.stderr.write(`  Fetched sample data for ${operationId}      \r`);

  // Get sample data for response examples
  process.stderr.write(`  Preparing sample data for ${operationId}...\r`);
  const sampleDataResult = await fetchAndSaveSampleData(
    api,
    operationId,
    endpoint
  );
  process.stderr.write(`  Prepared sample data for ${operationId}\r`);

  // Build example description with truncation info if applicable
  let exampleDescription = "Example of a successful response from the API";
  if (
    sampleDataResult.isTruncated &&
    sampleDataResult.totalItems !== undefined
  ) {
    exampleDescription += ` (showing first item of ${sampleDataResult.totalItems} total)`;
  }

  // Register the path - library handles schema conversion automatically
  registry.registerPath({
    method: "get",
    path: endpointPath,
    summary,
    operationId,
    tags: [groupName],
    ...(Object.keys(request).length > 0 && { request }),
    responses: {
      200: {
        description: "Success",
        content: {
          "application/json": {
            schema: responseSchema,
            examples: {
              sampleResponse: {
                summary: "Sample response",
                description: exampleDescription,
                value: sampleDataResult.data,
              },
            },
          },
        },
      },
    },
    "x-codeSamples": [
      {
        lang: "JavaScript",
        source: codeExample,
      },
    ],
  });
};

/**
 * All API modules to process
 *
 * Uses the shared API_MODULES array from src/shared/endpoints.ts
 * to ensure consistency with the rest of the codebase.
 */
const ALL_APIS: readonly ApiDefinition[] = Object.values(apis);

/**
 * Generate OpenAPI specification for a single API
 *
 * Creates a complete OpenAPI 3.0 specification document from an API definition,
 * including all endpoints, schemas, tags, and metadata. The zod-to-openapi library
 * handles automatic schema conversion.
 *
 * @param api - The API definition containing endpoint groups and metadata
 * @returns The complete OpenAPI specification object
 */
const generateOpenApiSpec = async (api: ApiDefinition): Promise<unknown> => {
  process.stderr.write(`Processing ${api.api.name}...\r`);
  const registry = new OpenAPIRegistry();

  // Pre-register shared schemas with canonical names to enable deduplication
  // This ensures shared schemas are registered once and reused via $ref
  if (roadwayLocationSchema) {
    registerSchema(registry, roadwayLocationSchema, "RoadwayLocation");
  }

  // Filter endpoints for this API from the flat registry
  const apiEndpoints = endpoints.filter((e) => e.api.name === api.api.name);
  const totalEndpoints = apiEndpoints.length;

  // Register all endpoints and wait for completion
  const endpointPromises = apiEndpoints.map(async (endpoint, index) => {
    process.stderr.write(
      `  [${index + 1}/${totalEndpoints}] Registering ${endpoint.functionName}...\r`
    );

    // Find the group name for this endpoint
    const groupName = findEndpointGroup(api, endpoint);

    await registerEndpoint(registry, api, endpoint, groupName);
  });

  // Wait for all endpoints to be registered
  await Promise.all(endpointPromises);

  process.stderr.write(`  Generating OpenAPI spec for ${api.api.name}...\r`);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  // Create a title from the API name (e.g., "wsf-vessels" -> "WSF Vessels API")
  const title =
    // biome-ignore lint/style/useTemplate: OK here
    api.api.name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ") + " API";

  const openApiDoc = generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title,
      version: "1.0.0",
      description: `${title} - Washington State Department of Transportation APIs`,
    },
    servers: [
      {
        url: api.api.baseUrl,
        description: "Production server",
      },
    ],
  });

  // Add tags with descriptions
  const tags = api.endpointGroups.map((group) => {
    const documentation = group.documentation ?? {};

    const description =
      documentation.summary ??
      documentation.description ??
      documentation.resourceDescription ??
      "";

    return {
      name: group.name,
      description,
      // Add extended description as a custom field
      ...(documentation.description && documentation.description !== documentation.summary && {
        "x-description": documentation.description,
      }),
      // Add cache strategy information
      ...(group.cacheStrategy && {
        "x-cacheStrategy": group.cacheStrategy,
      }),
      // Keep existing fields for backward compatibility
      ...(documentation.businessContext && {
        externalDocs: {
          description: documentation.businessContext,
        },
      }),
      ...(documentation.useCases && {
        "x-useCases": documentation.useCases,
      }),
      ...(documentation.updateFrequency && {
        "x-updateFrequency": documentation.updateFrequency,
      }),
    };
  });

  return {
    ...openApiDoc,
    tags,
  };
};

/**
 * Generate OpenAPI spec for a single API and save to YAML file
 *
 * Generates the OpenAPI specification, writes it to a YAML file in the
 * generated directory, and logs statistics about paths, tags, and schemas.
 *
 * @param api - The API definition to generate and save
 */
const generateAndSaveOpenApiSpec = async (
  api: ApiDefinition
): Promise<void> => {
  process.stderr.write(`Generating spec for ${api.api.name}...\r`);
  const spec = await generateOpenApiSpec(api);
  const outputDir = join(projectRoot, "docs", "generated", "openapi");
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, `${api.api.name}.yaml`);
  process.stderr.write(`  Writing ${api.api.name}.yaml...\r`);
  writeFileSync(
    outputPath,
    yaml.dump(spec, { indent: 2, lineWidth: -1, noRefs: false }),
    "utf-8"
  );

  const pathsCount = Object.keys(
    (spec as { paths?: Record<string, unknown> }).paths || {}
  ).length;
  const tagsCount = ((spec as { tags?: unknown[] }).tags || []).length;
  const schemasCount = Object.keys(
    (spec as { components?: { schemas?: Record<string, unknown> } }).components
      ?.schemas || {}
  ).length;

  console.log(`✓ ${api.api.name}: ${outputPath}`);
  console.log(
    `  - ${pathsCount} paths, ${tagsCount} tags, ${schemasCount} schemas`
  );
};

/**
 * Main execution function
 *
 * Processes all API definitions, generates OpenAPI specifications,
 * saves them to files, and reports success/failure statistics.
 */
const main = async (): Promise<void> => {
  console.log(
    `Generating OpenAPI specifications for ${ALL_APIS.length} APIs...\n`
  );

  const results = await Promise.all(
    ALL_APIS.map(async (api, index) => {
      try {
        process.stderr.write(
          `[${index + 1}/${ALL_APIS.length}] Processing ${api.api.name}...\n`
        );
        await generateAndSaveOpenApiSpec(api);
        const spec = await generateOpenApiSpec(api);
        return {
          totals: {
            paths: Object.keys(
              (spec as { paths?: Record<string, unknown> }).paths || {}
            ).length,
            tags: ((spec as { tags?: unknown[] }).tags || []).length,
            schemas: Object.keys(
              (spec as { components?: { schemas?: Record<string, unknown> } })
                .components?.schemas || {}
            ).length,
          },
          errors: [] as Array<{ api: string; error: unknown }>,
        };
      } catch (error) {
        process.stderr.write(`  ✗ Error in ${api.api.name}\n`);
        console.error(`✗ Error generating spec for ${api.api.name}:`, error);
        return {
          totals: { paths: 0, tags: 0, schemas: 0 },
          errors: [{ api: api.api.name, error }],
        };
      }
    })
  );

  // Combine all results
  const { totals, errors } = results.reduce(
    (acc, result) => ({
      totals: {
        paths: acc.totals.paths + result.totals.paths,
        tags: acc.totals.tags + result.totals.tags,
        schemas: acc.totals.schemas + result.totals.schemas,
      },
      errors: [...acc.errors, ...result.errors],
    }),
    {
      totals: { paths: 0, tags: 0, schemas: 0 },
      errors: [] as Array<{ api: string; error: unknown }>,
    }
  );

  if (errors.length > 0) {
    console.error(`\n✗ Failed to generate ${errors.length} specification(s):`);
    errors.forEach(({ api }) => {
      console.error(`  - ${api}`);
    });
  }
};

main();
