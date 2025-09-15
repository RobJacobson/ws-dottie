import type { Endpoint } from "@/shared/endpoints";
import { fetchWithZod } from "@/shared/fetching";

/**
 * Configuration for data integrity testing
 */
export interface DataIntegrityConfig {
  /** Fields to exclude from comparison (intentionally filtered) */
  excludedFields: string[];
  /** Fields that should be converted to Date objects */
  dateConversionFields: string[];
  /** Tolerance for numeric comparisons */
  numericTolerance?: number;
  /** Tolerance for date comparisons (milliseconds) */
  dateTolerance?: number;
}

/**
 * Default configuration for data integrity testing
 */
const DEFAULT_CONFIG: DataIntegrityConfig = {
  excludedFields: [],
  dateConversionFields: ["date", "time", "created", "updated", "timestamp"],
  numericTolerance: 0.0001,
  dateTolerance: 1000, // 1 second
};

/**
 * Convert .NET datetime string to JavaScript Date
 */
const convertDotNetDateTime = (value: string): Date => {
  // Handle .NET datetime format: "2024-01-15T10:30:00.000Z" or "2024-01-15T10:30:00"
  if (typeof value === "string" && value.includes("T")) {
    return new Date(value);
  }
  return new Date(value);
};

/**
 * Check if a field should be converted to Date
 */
const shouldConvertToDate = (
  fieldName: string,
  config: DataIntegrityConfig
): boolean => {
  const lowerFieldName = fieldName.toLowerCase();
  return config.dateConversionFields.some((field) =>
    lowerFieldName.includes(field.toLowerCase())
  );
};

/**
 * Compare two values with proper type handling
 */
const compareValues = (
  zodValue: unknown,
  nativeValue: unknown,
  fieldName: string,
  config: DataIntegrityConfig
): boolean => {
  // Handle null/undefined
  if (zodValue === null && nativeValue === null) return true;
  if (zodValue === undefined && nativeValue === undefined) return true;
  if (zodValue === null || nativeValue === null) return false;
  if (zodValue === undefined || nativeValue === undefined) return false;

  // Handle dates
  if (shouldConvertToDate(fieldName, config)) {
    const zodDate =
      zodValue instanceof Date
        ? zodValue
        : convertDotNetDateTime(String(zodValue));
    const nativeDate =
      nativeValue instanceof Date
        ? nativeValue
        : convertDotNetDateTime(String(nativeValue));

    const timeDiff = Math.abs(zodDate.getTime() - nativeDate.getTime());
    return timeDiff <= (config.dateTolerance || 1000);
  }

  // Handle numbers
  if (typeof zodValue === "number" && typeof nativeValue === "number") {
    const tolerance = config.numericTolerance || 0.0001;
    return Math.abs(zodValue - nativeValue) <= tolerance;
  }

  // Handle strings
  if (typeof zodValue === "string" && typeof nativeValue === "string") {
    return zodValue === nativeValue;
  }

  // Handle booleans
  if (typeof zodValue === "boolean" && typeof nativeValue === "boolean") {
    return zodValue === nativeValue;
  }

  // Handle arrays
  if (Array.isArray(zodValue) && Array.isArray(nativeValue)) {
    if (zodValue.length !== nativeValue.length) return false;
    return zodValue.every((item, index) =>
      compareValues(item, nativeValue[index], `${fieldName}[${index}]`, config)
    );
  }

  // Handle objects
  if (
    typeof zodValue === "object" &&
    typeof nativeValue === "object" &&
    zodValue !== null &&
    nativeValue !== null
  ) {
    return compareObjects(
      zodValue as Record<string, unknown>,
      nativeValue as Record<string, unknown>,
      config
    );
  }

  // Default comparison
  return zodValue === nativeValue;
};

/**
 * Compare two objects recursively
 */
const compareObjects = (
  zodObj: Record<string, unknown>,
  nativeObj: Record<string, unknown>,
  config: DataIntegrityConfig
): boolean => {
  const zodKeys = Object.keys(zodObj);
  const nativeKeys = Object.keys(nativeObj);

  // Check if all keys in zodObj exist in nativeObj (accounting for excluded fields)
  const filteredNativeKeys = nativeKeys.filter(
    (key) => !config.excludedFields.includes(key)
  );

  if (zodKeys.length !== filteredNativeKeys.length) {
    console.log(
      `❌ Key count mismatch: zod has ${zodKeys.length}, native has ${filteredNativeKeys.length} (after exclusions)`
    );
    return false;
  }

  // Check each key
  for (const key of zodKeys) {
    if (!nativeObj.hasOwnProperty(key)) {
      console.log(`❌ Missing key in native result: ${key}`);
      return false;
    }

    if (!compareValues(zodObj[key], nativeObj[key], key, config)) {
      console.log(
        `❌ Value mismatch for key ${key}: zod=${zodObj[key]}, native=${nativeObj[key]}`
      );
      return false;
    }
  }

  return true;
};

/**
 * Fetch data using native fetch (no Zod validation)
 */
const fetchNativeData = async <TParams>(
  endpoint: Endpoint<TParams, unknown>,
  params: TParams
): Promise<unknown> => {
  const url = new URL(endpoint.urlTemplate);

  // Add query parameters
  if (params && typeof params === "object") {
    Object.entries(params as Record<string, unknown>).forEach(
      ([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    );
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Create a data integrity test for an endpoint
 */
export const createDataIntegrityTest = <TParams, TOutput>(
  endpoint: Endpoint<TParams, TOutput>,
  config: DataIntegrityConfig = DEFAULT_CONFIG
) => {
  return {
    name: `Data Integrity: ${endpoint.functionName} (${endpoint.api})`,
    test: async (params: TParams) => {
      const context = `${endpoint.api}.${endpoint.functionName}`;

      try {
        console.log(`🔍 [DATA-INTEGRITY] Fetching data for ${context}...`);

        // Fetch data using both methods
        const [zodResult, nativeResult] = await Promise.all([
          fetchWithZod(endpoint, params),
          fetchNativeData(endpoint, params),
        ]);

        console.log(`🔍 [DATA-INTEGRITY] Comparing results for ${context}...`);

        // Compare the results
        console.log(
          `🔍 [DATA-INTEGRITY] Zod result type: ${typeof zodResult}, keys: ${Object.keys(zodResult as Record<string, unknown>).join(", ")}`
        );
        console.log(
          `🔍 [DATA-INTEGRITY] Native result type: ${typeof nativeResult}, keys: ${Object.keys(nativeResult as Record<string, unknown>).join(", ")}`
        );

        const isValid = compareObjects(
          zodResult as Record<string, unknown>,
          nativeResult as Record<string, unknown>,
          config
        );

        if (isValid) {
          console.log(
            `✅ [DATA-INTEGRITY] ${context}: Data integrity validation passed`
          );
          return {
            success: true,
            message: `Data integrity validation passed for ${context}`,
            zodResult,
            nativeResult,
          };
        } else {
          console.log(
            `❌ [DATA-INTEGRITY] ${context}: Data integrity validation failed`
          );
          return {
            success: false,
            message: `Data integrity validation failed for ${context}`,
            zodResult,
            nativeResult,
          };
        }
      } catch (error) {
        console.log(
          `❌ [DATA-INTEGRITY] ${context}: Error during validation - ${error instanceof Error ? error.message : "Unknown error"}`
        );
        return {
          success: false,
          message: `Data integrity validation failed for ${context}: ${error instanceof Error ? error.message : "Unknown error"}`,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  };
};
