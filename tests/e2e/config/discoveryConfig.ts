/**
 * @fileoverview Endpoint Discovery Configuration
 *
 * Configuration settings for the endpoint discovery system,
 * including filters, validation rules, and discovery behavior.
 */

export interface DiscoveryConfig {
  /** Whether to include all discovered endpoints */
  includeAllEndpoints: boolean;

  /** Specific API names to include (if not including all) */
  includedApis: string[];

  /** Specific API names to exclude */
  excludedApis: string[];

  /** Specific endpoint IDs to exclude */
  excludedEndpoints: string[];

  /** Whether to validate discovered endpoints */
  validateEndpoints: boolean;

  /** Whether to include debug output */
  enableDebugOutput: boolean;

  /** Maximum number of endpoints to process (for testing) */
  maxEndpoints?: number;

  /** Whether to generate configurations for all discovered APIs */
  generateAllConfigs: boolean;

  /** Specific APIs to generate configurations for */
  configGenerationApis: string[];
}

/**
 * Default discovery configuration
 */
export const defaultDiscoveryConfig: DiscoveryConfig = {
  includeAllEndpoints: true,
  includedApis: [],
  excludedApis: [],
  excludedEndpoints: [],
  validateEndpoints: true,
  enableDebugOutput: false,
  generateAllConfigs: true,
  configGenerationApis: [],
};

/**
 * Proof of concept configuration - limits discovery to 2-3 APIs
 */
export const pocDiscoveryConfig: DiscoveryConfig = {
  includeAllEndpoints: false,
  includedApis: ["wsdot-highway-cameras", "wsf-fares", "wsdot-traffic-flow"],
  excludedApis: [],
  excludedEndpoints: [],
  validateEndpoints: true,
  enableDebugOutput: true,
  maxEndpoints: 10,
  generateAllConfigs: false,
  configGenerationApis: [
    "wsdot-highway-cameras",
    "wsf-fares",
    "wsdot-traffic-flow",
  ],
};

/**
 * Production configuration for full test suite
 */
export const productionDiscoveryConfig: DiscoveryConfig = {
  includeAllEndpoints: true,
  includedApis: [],
  excludedApis: [],
  excludedEndpoints: [],
  validateEndpoints: true,
  enableDebugOutput: false,
  generateAllConfigs: true,
  configGenerationApis: [],
};

/**
 * Gets the active discovery configuration
 */
export const getDiscoveryConfig = (): DiscoveryConfig => {
  const configMode = process.env.DISCOVERY_CONFIG_MODE || "poc";

  switch (configMode) {
    case "production":
      return productionDiscoveryConfig;
    case "poc":
      return pocDiscoveryConfig;
    case "default":
      return defaultDiscoveryConfig;
    case "test-runner":
      // Try to import test runner config, fallback to poc if not available
      try {
        const testRunnerConfig = require("./testRunnerConfig.js");
        return testRunnerConfig.testRunnerConfig;
      } catch (error) {
        console.warn(
          "Test runner config not found, falling back to poc config"
        );
        return pocDiscoveryConfig;
      }
    default:
      return pocDiscoveryConfig;
  }
};

/**
 * Filters discovered endpoints based on configuration
 */
export const filterDiscoveredEndpoints = <T>(
  endpoints: T[],
  config: DiscoveryConfig
): T[] => {
  let filtered = [...endpoints];

  // Apply API-level filtering
  if (!config.includeAllEndpoints && config.includedApis.length > 0) {
    filtered = filtered.filter((endpoint: unknown) =>
      config.includedApis.includes((endpoint as { api: string }).api)
    );
  }

  // Apply exclusions
  if (config.excludedApis.length > 0) {
    filtered = filtered.filter(
      (endpoint: unknown) =>
        !config.excludedApis.includes((endpoint as { api: string }).api)
    );
  }

  if (config.excludedEndpoints.length > 0) {
    filtered = filtered.filter(
      (endpoint: unknown) =>
        !config.excludedEndpoints.includes((endpoint as { id: string }).id)
    );
  }

  // Apply max endpoints limit
  if (config.maxEndpoints && config.maxEndpoints > 0) {
    filtered = filtered.slice(0, config.maxEndpoints);
  }

  return filtered;
};

/**
 * Checks if an API should be included in configuration generation
 */
export const shouldGenerateApiConfig = (
  apiName: string,
  config: DiscoveryConfig
): boolean => {
  if (!config.generateAllConfigs && config.configGenerationApis.length > 0) {
    return config.configGenerationApis.includes(apiName);
  }

  return true;
};

/**
 * Gets the list of APIs to generate configurations for
 */
export const getApisForConfigGeneration = (
  allApis: string[],
  config: DiscoveryConfig
): string[] => {
  if (config.generateAllConfigs) {
    return allApis;
  }

  return config.configGenerationApis.filter((apiName) =>
    allApis.includes(apiName)
  );
};
