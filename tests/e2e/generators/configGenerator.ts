/**
 * @fileoverview Configuration Generator for Auto-Discovered Endpoints
 *
 * This module generates test configurations from discovered Endpoint objects,
 * creating comprehensive test configurations that work with the existing
 * test generator patterns while leveraging the metadata from defineEndpoint.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchWithZod } from "@/shared/fetching";

/**
 * Test configuration for a single endpoint
 */
export interface EndpointTestConfig<TParams, TOutput> {
  /** The API function handler created from the endpoint */
  apiFunction: (params: TParams) => Promise<TOutput>;

  /** Zod schema for input validation */
  inputSchema: Endpoint<TParams, TOutput>["inputSchema"];

  /** Zod schema for output validation */
  outputSchema: Endpoint<TParams, TOutput>["outputSchema"];

  /** Valid test parameters */
  validParams: Partial<TParams>;

  /** Invalid test parameters for error testing */
  invalidParams: Partial<TParams>[];

  /** Human-readable endpoint name */
  endpointName: string;

  /** Test category for organization */
  category: string;

  /** Maximum expected response time in milliseconds */
  maxResponseTime: number;

  /** Custom test scenarios specific to this endpoint */
  customTests?: CustomTestScenario<TParams, TOutput>[];

  /** Reference to the original endpoint definition */
  endpointDefinition: Endpoint<TParams, TOutput>;
}

/**
 * Custom test scenario for specific endpoint behaviors
 */
export interface CustomTestScenario<TParams, TOutput> {
  /** Scenario name */
  name: string;

  /** Test parameters for this scenario */
  params: TParams;

  /** Expected behavior or validation */
  expectation: "success" | "error" | "partial";

  /** Custom validation function */
  validator?: (result: TOutput) => boolean;

  /** Description of what this test validates */
  description: string;
}

/**
 * Complete API module configuration
 */
export interface ApiModuleConfig {
  /** Formatted module name */
  moduleName: string;

  /** Array of endpoint configurations */
  endpoints: EndpointTestConfig<any, any>[];

  /** API-specific settings */
  settings: ApiSettings;
}

/**
 * API-specific test settings
 */
export interface ApiSettings {
  /** Base timeout for all requests in this API */
  baseTimeout: number;

  /** Whether this API requires authentication */
  requiresAuth: boolean;

  /** Rate limiting configuration */
  rateLimit?: {
    requestsPerSecond: number;
    burstLimit: number;
  };

  /** API-specific test categories */
  testCategories: string[];
}

/**
 * Maps cache strategy to appropriate maximum response time
 */
const getMaxResponseTime = (
  cacheStrategy: Endpoint<unknown, unknown>["cacheStrategy"]
): number => {
  switch (cacheStrategy) {
    case "REALTIME_UPDATES":
      return 5000; // 5 seconds for real-time data
    case "MINUTE_UPDATES":
      return 10000; // 10 seconds for frequently updated data
    case "FIVE_MINUTE_UPDATES":
      return 15000; // 15 seconds
    case "HOURLY_UPDATES":
      return 30000; // 30 seconds for hourly data
    case "DAILY_UPDATES":
      return 60000; // 1 minute for daily data
    case "DAILY_STATIC":
    case "WEEKLY_STATIC":
      return 120000; // 2 minutes for static data
    case "NONE":
      return 30000; // 30 seconds default
    default:
      return 30000;
  }
};

/**
 * Categorizes endpoints based on their function name and purpose
 */
const categorizeEndpoint = (endpoint: Endpoint<unknown, unknown>): string => {
  const functionName = endpoint.functionName.toLowerCase();

  if (functionName.includes("get") || functionName.includes("fetch")) {
    return "data-retrieval";
  } else if (functionName.includes("search") || functionName.includes("find")) {
    return "search";
  } else if (functionName.includes("list") || functionName.includes("all")) {
    return "listing";
  } else if (
    functionName.includes("status") ||
    functionName.includes("condition")
  ) {
    return "status";
  } else if (
    functionName.includes("alert") ||
    functionName.includes("warning")
  ) {
    return "alerts";
  } else {
    return "general";
  }
};

/**
 * Formats API name for display purposes
 */
const formatApiName = (apiName: string): string => {
  return apiName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
};

/**
 * Generates invalid test parameters for error testing
 */
const generateInvalidParams = <TParams>(
  endpoint: Endpoint<TParams, unknown>
): Partial<TParams>[] => {
  const invalidParams: Partial<TParams>[] = [];

  // If the endpoint has no required parameters, we can't generate invalid params
  if (
    !endpoint.sampleParams ||
    Object.keys(endpoint.sampleParams).length === 0
  ) {
    return invalidParams;
  }

  // Generate common invalid parameter scenarios
  const sampleParams =
    typeof endpoint.sampleParams === "function" ? {} : endpoint.sampleParams;

  // Add invalid parameter variations
  invalidParams.push({} as Partial<TParams>); // Empty params
  invalidParams.push({ invalidField: "invalidValue" } as Partial<TParams>); // Extra field

  // If we have sample params, create invalid variations
  if (typeof sampleParams === "object" && sampleParams !== null) {
    Object.entries(sampleParams).forEach(([key, value]) => {
      // Invalid type variations
      if (typeof value === "string") {
        invalidParams.push({ [key]: 123 } as Partial<TParams>);
        invalidParams.push({ [key]: null } as Partial<TParams>);
      } else if (typeof value === "number") {
        invalidParams.push({ [key]: "invalid" } as Partial<TParams>);
        invalidParams.push({ [key]: -999999 } as Partial<TParams>);
      }
    });
  }

  return invalidParams.slice(0, 3); // Limit to 3 invalid scenarios
};

/**
 * Generates custom test scenarios based on endpoint characteristics
 */
const generateCustomTests = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): CustomTestScenario<TParams, TOutput>[] => {
  const customTests: CustomTestScenario<TParams, TOutput>[] = [];

  // Add cache strategy specific tests
  if (endpoint.cacheStrategy !== "NONE") {
    customTests.push({
      name: "Cache Strategy Validation",
      params: endpoint.sampleParams || ({} as TParams),
      expectation: "success",
      description: `Validates that ${endpoint.cacheStrategy} caching works correctly`,
    });
  }

  // Add parameter-specific tests if we have sample params
  if (endpoint.sampleParams && typeof endpoint.sampleParams === "object") {
    customTests.push({
      name: "Sample Parameters Test",
      params: endpoint.sampleParams as TParams,
      expectation: "success",
      description: "Tests with the provided sample parameters",
    });
  }

  return customTests;
};

/**
 * Gets API-specific settings based on the API name
 */
const getApiSettings = (apiName: string): ApiSettings => {
  const baseSettings: ApiSettings = {
    baseTimeout: 30000,
    requiresAuth: false,
    testCategories: ["data-retrieval", "validation", "performance"],
  };

  // API-specific customizations
  if (apiName.includes("wsdot")) {
    baseSettings.rateLimit = {
      requestsPerSecond: 10,
      burstLimit: 50,
    };
  } else if (apiName.includes("wsf")) {
    baseSettings.rateLimit = {
      requestsPerSecond: 5,
      burstLimit: 20,
    };
  }

  return baseSettings;
};

/**
 * Generates a complete test configuration for a single endpoint
 */
export const generateEndpointConfig = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>
): EndpointTestConfig<TParams, TOutput> => {
  return {
    apiFunction: (params: TParams) => fetchWithZod(endpoint, params),
    inputSchema: endpoint.inputSchema,
    outputSchema: endpoint.outputSchema,
    validParams: endpoint.sampleParams || ({} as Partial<TParams>),
    invalidParams: generateInvalidParams(endpoint),
    endpointName: endpoint.functionName,
    category: categorizeEndpoint(endpoint),
    maxResponseTime: getMaxResponseTime(endpoint.cacheStrategy),
    customTests: generateCustomTests(endpoint),
    endpointDefinition: endpoint,
  };
};

/**
 * Generates a complete API module configuration from discovered endpoints
 */
export const generateApiConfig = (
  discoveredEndpoints: Endpoint<unknown, unknown>[],
  apiName: string
): ApiModuleConfig => {
  const apiEndpoints = discoveredEndpoints.filter((ep) => ep.api === apiName);

  if (apiEndpoints.length === 0) {
    throw new Error(`No endpoints found for API: ${apiName}`);
  }

  return {
    moduleName: formatApiName(apiName),
    endpoints: apiEndpoints.map((endpoint) => generateEndpointConfig(endpoint)),
    settings: getApiSettings(apiName),
  };
};

/**
 * Generates configurations for all discovered APIs
 */
export const generateAllApiConfigs = (
  discoveredEndpoints: Endpoint<unknown, unknown>[]
): Record<string, ApiModuleConfig> => {
  const apiNames = [...new Set(discoveredEndpoints.map((ep) => ep.api))];
  const configs: Record<string, ApiModuleConfig> = {};

  apiNames.forEach((apiName) => {
    try {
      configs[apiName] = generateApiConfig(discoveredEndpoints, apiName);
    } catch (error) {
      console.warn(`Failed to generate config for API ${apiName}:`, error);
    }
  });

  return configs;
};

/**
 * Validates generated configurations
 */
export const validateGeneratedConfigs = (
  configs: Record<string, ApiModuleConfig>
): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];

  Object.entries(configs).forEach(([apiName, config]) => {
    if (config.endpoints.length === 0) {
      issues.push(`API ${apiName} has no endpoints configured`);
    }

    config.endpoints.forEach((endpoint, index) => {
      if (!endpoint.apiFunction) {
        issues.push(`API ${apiName}, endpoint ${index}: missing apiFunction`);
      }

      if (!endpoint.inputSchema || !endpoint.outputSchema) {
        issues.push(`API ${apiName}, endpoint ${index}: missing schemas`);
      }

      if (endpoint.maxResponseTime <= 0) {
        issues.push(
          `API ${apiName}, endpoint ${index}: invalid maxResponseTime`
        );
      }
    });
  });

  return {
    isValid: issues.length === 0,
    issues,
  };
};
