/**
 * @fileoverview Data Integrity Validation for zodFetch vs Native Fetch
 *
 * This module provides comprehensive data integrity validation to ensure that
 * zodFetch returns the same data as native fetch (after converting dates to JS Date objects).
 * It validates field shapes, data content, and provides configurable field whitelisting.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchNative } from "@/shared/fetching";
import { fetchWithZod } from "@/shared/fetching";
import { buildApiUrl } from "@/shared/fetching";

/**
 * Data integrity test configuration for zodFetch vs native fetch validation
 */
export interface DataIntegrityTestConfig {
  /** Fields intentionally excluded from zodFetch */
  excludedFields: string[];

  /** Fields that should be converted to Date objects */
  dateConversionFields: string[];

  /** Tolerance configuration for comparisons */
  toleranceConfig?: {
    numericPrecision?: number;
    dateTolerance?: number;
  };

  /** Whether to enable strict field shape validation */
  strictFieldShape?: boolean;

  /** Whether to enable data content validation */
  enableContentValidation?: boolean;

  /** Custom field validators for specific fields */
  customFieldValidators?: Record<
    string,
    (zodValue: unknown, nativeValue: unknown) => boolean
  >;
}

/**
 * Default data integrity configuration
 */
export const DEFAULT_DATA_INTEGRITY_CONFIG: DataIntegrityTestConfig = {
  excludedFields: [],
  dateConversionFields: [],
  toleranceConfig: {
    numericPrecision: 0.0001,
    dateTolerance: 1000, // 1 second tolerance for date comparisons
  },
  strictFieldShape: true,
  enableContentValidation: true,
  customFieldValidators: {},
};

/**
 * API-specific data integrity configurations
 */
export const API_DATA_INTEGRITY_CONFIGS: Record<
  string,
  DataIntegrityTestConfig
> = {
  "wsf-schedule": {
    excludedFields: [],
    dateConversionFields: ["sailingDate", "departureTime", "arrivalTime"],
    toleranceConfig: {
      numericPrecision: 0.0001,
      dateTolerance: 1000,
    },
    strictFieldShape: true,
    enableContentValidation: true,
  },
  "wsf-fares": {
    excludedFields: [],
    dateConversionFields: ["effectiveDate"],
    toleranceConfig: {
      numericPrecision: 0.01, // Currency precision
      dateTolerance: 1000,
    },
    strictFieldShape: true,
    enableContentValidation: true,
  },
  "wsdot-traffic-flow": {
    excludedFields: [],
    dateConversionFields: ["timeStamp"],
    toleranceConfig: {
      numericPrecision: 0.0001,
      dateTolerance: 1000,
    },
    strictFieldShape: true,
    enableContentValidation: true,
  },
  "wsdot-highway-cameras": {
    excludedFields: [],
    dateConversionFields: ["timeStamp"],
    toleranceConfig: {
      numericPrecision: 0.0001,
      dateTolerance: 1000,
    },
    strictFieldShape: true,
    enableContentValidation: true,
  },
  // Add more API-specific configurations as needed
};

/**
 * Gets the appropriate data integrity configuration for an API
 */
export const getDataIntegrityConfig = (
  apiName: string
): DataIntegrityTestConfig => {
  return API_DATA_INTEGRITY_CONFIGS[apiName] || DEFAULT_DATA_INTEGRITY_CONFIG;
};

/**
 * Fetches raw data using native fetch for comparison
 */
export const fetchNativeData = async <TParams>(
  endpoint: Endpoint<TParams, unknown>,
  params: TParams
): Promise<unknown> => {
  try {
    // Build the URL using the same logic as the main pipeline
    const url = buildApiUrl(endpoint.urlTemplate, params);

    // Fetch raw data using native fetch
    const rawResponse = await fetchNative(url);

    // Parse the JSON response
    const data = JSON.parse(rawResponse);

    return data;
  } catch (error) {
    throw new Error(
      `Native fetch failed for ${endpoint.functionName}: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Fetches data using zodFetch for comparison
 */
export const fetchZodData = async <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  params: TParams
): Promise<TOutput> => {
  try {
    return await fetchWithZod(endpoint, params);
  } catch (error) {
    throw new Error(
      `Zod fetch failed for ${endpoint.functionName}: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Compares field shapes between zodFetch and native fetch results
 */
export const compareFieldShapes = (
  zodResult: unknown,
  nativeResult: unknown,
  config: DataIntegrityTestConfig,
  context: string
): void => {
  if (!config.strictFieldShape) {
    return;
  }

  const zodKeys = getObjectKeys(zodResult);
  const nativeKeys = getObjectKeys(nativeResult);

  // Filter out excluded fields from comparison
  const filteredNativeKeys = nativeKeys.filter(
    (key) => !config.excludedFields.includes(key)
  );

  // Check if all zod keys exist in native result (accounting for exclusions)
  const missingInNative = zodKeys.filter(
    (key) => !filteredNativeKeys.includes(key)
  );
  if (missingInNative.length > 0) {
    throw new Error(
      `Field shape mismatch in ${context}: zodFetch has fields not in native fetch: ${missingInNative.join(", ")}`
    );
  }

  // Check if all native keys (after exclusions) exist in zod result
  const missingInZod = filteredNativeKeys.filter(
    (key) => !zodKeys.includes(key)
  );
  if (missingInZod.length > 0) {
    throw new Error(
      `Field shape mismatch in ${context}: native fetch has fields not in zodFetch: ${missingInZod.join(", ")}`
    );
  }
};

/**
 * Compares data content between zodFetch and native fetch results
 */
export const compareDataContent = (
  zodResult: unknown,
  nativeResult: unknown,
  config: DataIntegrityTestConfig,
  context: string,
  path: string = ""
): void => {
  if (!config.enableContentValidation) {
    return;
  }

  // Handle null/undefined cases
  if (zodResult === null && nativeResult === null) return;
  if (zodResult === undefined && nativeResult === undefined) return;
  if (zodResult === null || nativeResult === null) {
    throw new Error(
      `Null mismatch in ${context} at ${path}: zod=${zodResult}, native=${nativeResult}`
    );
  }
  if (zodResult === undefined || nativeResult === undefined) {
    throw new Error(
      `Undefined mismatch in ${context} at ${path}: zod=${zodResult}, native=${nativeResult}`
    );
  }

  // Handle primitive types
  if (typeof zodResult !== "object" || typeof nativeResult !== "object") {
    if (typeof zodResult === "number" && typeof nativeResult === "number") {
      const tolerance = config.toleranceConfig?.numericPrecision || 0.0001;
      if (Math.abs(zodResult - nativeResult) > tolerance) {
        throw new Error(
          `Numeric mismatch in ${context} at ${path}: zod=${zodResult}, native=${nativeResult}`
        );
      }
      return;
    }

    if (zodResult !== nativeResult) {
      throw new Error(
        `Value mismatch in ${context} at ${path}: zod=${zodResult}, native=${nativeResult}`
      );
    }
    return;
  }

  // Handle arrays
  if (Array.isArray(zodResult) && Array.isArray(nativeResult)) {
    if (zodResult.length !== nativeResult.length) {
      throw new Error(
        `Array length mismatch in ${context} at ${path}: zod=${zodResult.length}, native=${nativeResult.length}`
      );
    }

    zodResult.forEach((item, index) => {
      compareDataContent(
        item,
        nativeResult[index],
        config,
        context,
        `${path}[${index}]`
      );
    });
    return;
  }

  // Handle objects
  if (Array.isArray(zodResult) || Array.isArray(nativeResult)) {
    throw new Error(
      `Type mismatch in ${context} at ${path}: zod is ${Array.isArray(zodResult) ? "array" : "object"}, native is ${Array.isArray(nativeResult) ? "array" : "object"}`
    );
  }

  const zodObj = zodResult as Record<string, unknown>;
  const nativeObj = nativeResult as Record<string, unknown>;

  // Get all keys from both objects
  const allKeys = new Set([...Object.keys(zodObj), ...Object.keys(nativeObj)]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;

    // Skip excluded fields
    if (config.excludedFields.includes(key)) {
      continue;
    }

    // Check if key exists in both objects
    if (!(key in zodObj) || !(key in nativeObj)) {
      throw new Error(
        `Key mismatch in ${context} at ${currentPath}: zod has ${key in zodObj ? "key" : "no key"}, native has ${key in nativeObj ? "key" : "no key"}`
      );
    }

    // Use custom validator if available
    if (config.customFieldValidators?.[key]) {
      const isValid = config.customFieldValidators[key](
        zodObj[key],
        nativeObj[key]
      );
      if (!isValid) {
        throw new Error(
          `Custom validation failed in ${context} at ${currentPath}`
        );
      }
      continue;
    }

    // Handle date conversion fields
    if (config.dateConversionFields.includes(key)) {
      compareDates(zodObj[key], nativeObj[key], config, context, currentPath);
      continue;
    }

    // Recursive comparison for nested objects
    compareDataContent(
      zodObj[key],
      nativeObj[key],
      config,
      context,
      currentPath
    );
  }
};

/**
 * Compares date fields accounting for conversion
 */
export const compareDates = (
  zodValue: unknown,
  nativeValue: unknown,
  config: DataIntegrityTestConfig,
  context: string,
  path: string
): void => {
  const tolerance = config.toleranceConfig?.dateTolerance || 1000;

  // Handle Date objects (from zodFetch)
  if (zodValue instanceof Date && typeof nativeValue === "string") {
    const zodTime = zodValue.getTime();
    const nativeTime = new Date(nativeValue).getTime();

    if (Math.abs(zodTime - nativeTime) > tolerance) {
      throw new Error(
        `Date mismatch in ${context} at ${path}: zod=${zodValue.toISOString()}, native=${nativeValue}`
      );
    }
    return;
  }

  // Handle string dates (both should be strings)
  if (typeof zodValue === "string" && typeof nativeValue === "string") {
    const zodTime = new Date(zodValue).getTime();
    const nativeTime = new Date(nativeValue).getTime();

    if (Math.abs(zodTime - nativeTime) > tolerance) {
      throw new Error(
        `Date mismatch in ${context} at ${path}: zod=${zodValue}, native=${nativeValue}`
      );
    }
    return;
  }

  // Fallback to regular comparison
  if (zodValue !== nativeValue) {
    throw new Error(
      `Value mismatch in ${context} at ${path}: zod=${zodValue}, native=${nativeValue}`
    );
  }
};

/**
 * Gets all keys from an object, handling nested objects and arrays
 */
export const getObjectKeys = (obj: unknown): string[] => {
  if (obj === null || obj === undefined) {
    return [];
  }

  if (typeof obj !== "object") {
    return [];
  }

  if (Array.isArray(obj)) {
    return [];
  }

  return Object.keys(obj as Record<string, unknown>);
};

/**
 * Creates a comprehensive data integrity test for an endpoint
 */
export const createDataIntegrityTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  config: DataIntegrityTestConfig = DEFAULT_DATA_INTEGRITY_CONFIG
) => {
  const testName = `Data Integrity: ${endpoint.functionName} (${endpoint.api})`;

  return {
    name: testName,
    test: async (params: TParams) => {
      const context = `${endpoint.api}.${endpoint.functionName}`;

      try {
        // Fetch data using both methods
        const [zodResult, nativeResult] = await Promise.all([
          fetchZodData(endpoint, params),
          fetchNativeData(endpoint, params),
        ]);

        // Compare field shapes
        compareFieldShapes(zodResult, nativeResult, config, context);

        // Compare data content
        compareDataContent(zodResult, nativeResult, config, context);

        return {
          success: true,
          message: `Data integrity validation passed for ${context}`,
          zodResult,
          nativeResult,
        };
      } catch (error) {
        return {
          success: false,
          message: `Data integrity validation failed for ${context}: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  };
};

/**
 * Creates data integrity tests for multiple endpoints
 */
export const createBulkDataIntegrityTests = <TParams, TOutput>(
  endpoints: Endpoint<TParams, TOutput>[],
  configs: Record<string, DataIntegrityTestConfig> = {}
) => {
  return endpoints.map((endpoint) => {
    const config =
      configs[endpoint.api] || getDataIntegrityConfig(endpoint.api);
    return createDataIntegrityTest(endpoint, config);
  });
};

/**
 * Validates that data integrity configuration is valid
 */
export const validateDataIntegrityConfig = (
  config: DataIntegrityTestConfig
): string[] => {
  const errors: string[] = [];

  if (!Array.isArray(config.excludedFields)) {
    errors.push("excludedFields must be an array");
  }

  if (!Array.isArray(config.dateConversionFields)) {
    errors.push("dateConversionFields must be an array");
  }

  if (config.toleranceConfig) {
    if (
      typeof config.toleranceConfig.numericPrecision !== "number" ||
      config.toleranceConfig.numericPrecision < 0
    ) {
      errors.push("numericPrecision must be a non-negative number");
    }

    if (
      typeof config.toleranceConfig.dateTolerance !== "number" ||
      config.toleranceConfig.dateTolerance < 0
    ) {
      errors.push("dateTolerance must be a non-negative number");
    }
  }

  if (typeof config.strictFieldShape !== "boolean") {
    errors.push("strictFieldShape must be a boolean");
  }

  if (typeof config.enableContentValidation !== "boolean") {
    errors.push("enableContentValidation must be a boolean");
  }

  if (
    config.customFieldValidators &&
    typeof config.customFieldValidators !== "object"
  ) {
    errors.push("customFieldValidators must be an object");
  }

  return errors;
};
