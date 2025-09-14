/**
 * @fileoverview WSDOT API Configuration Manager
 *
 * This module provides centralized configuration management for WSDOT and WSF APIs.
 * It handles API key management, base URL configuration, and environment-based
 * configuration loading across different platforms (Node.js, browser, test environments).
 *
 * Key Features:
 * - Environment-based API key loading (WSDOT_ACCESS_TOKEN)
 * - Configurable base URL (WSDOT_BASE_URL)
 * - Cross-platform compatibility (Node.js, browser, test)
 * - Global configuration state management
 * - Type-safe configuration interface
 * - Always-on Zod validation for fail-fast error handling
 *
 * Usage:
 * ```typescript
 * // Set API key only
 * configManager.setApiKey("your-api-key");
 *
 * // Set domain only
 * configManager.setDomain("https://custom.wsdot.wa.gov");
 *
 * // Get API key (auto-initializes from environment if not set)
 * const apiKey = configManager.getApiKey();
 *
 * // Get domain
 * const domain = configManager.getDomain();
 * ```
 */

/** Default base URL for WSDOT/WSF requests */
const DEFAULT_BASE_URL = "https://www.wsdot.wa.gov";

/**
 * Configuration interface for WSDOT API settings
 *
 * This interface defines the structure for WSDOT API configuration,
 * including required API keys and optional base URL overrides.
 */
export interface WsdotConfig {
  /** Required API access token for WSDOT API authentication */
  WSDOT_ACCESS_TOKEN: string;
  /** Optional custom base URL for WSDOT API requests */
  WSDOT_BASE_URL?: string;
}

/**
 * Safely accesses environment variables across different platforms
 *
 * This function provides cross-platform environment variable access that works
 * in Node.js, browser environments (with custom env objects), and bundler contexts.
 *
 * @param key - Environment variable key to retrieve
 * @returns Environment variable value or undefined if not found
 */
const getEnvVar = (key: string): string | undefined => {
  // Check Node.js environment first
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }

  // Check browser environment with custom env object
  if (typeof window !== "undefined") {
    type EnvWindow = Window & { __ENV__?: Record<string, string> };
    const env = (window as EnvWindow).__ENV__;
    if (env) return env[key];
  }

  // For bundlers that inject environment variables, rely on consuming application
  // to provide configuration rather than trying to access them directly
  return undefined;
};

/**
 * Initializes configuration from environment variables at module load
 *
 * This function is called when the module is first loaded to set up the
 * initial configuration from environment variables or defaults.
 *
 * @returns Initial configuration object with environment values or defaults
 */
const initializeFromEnv = (): WsdotConfig => {
  const apiKey = getEnvVar("WSDOT_ACCESS_TOKEN") || "";
  const baseUrl = getEnvVar("WSDOT_BASE_URL") || DEFAULT_BASE_URL;

  return {
    WSDOT_ACCESS_TOKEN: apiKey,
    WSDOT_BASE_URL: baseUrl,
  };
};

/** Global configuration state - initialized from environment at module load */
let globalConfig: WsdotConfig = initializeFromEnv();

/**
 * Retrieves the current API key, throwing an error if not configured
 *
 * @returns Current API key string
 * @throws {Error} When API key is not set
 */
const getApiKey = (): string => {
  if (!globalConfig.WSDOT_ACCESS_TOKEN) {
    throw new Error(
      "WSDOT_ACCESS_TOKEN is required. Set it via WSDOT_ACCESS_TOKEN environment variable or use configManager.setApiKey()."
    );
  }
  return globalConfig.WSDOT_ACCESS_TOKEN;
};

/**
 * Retrieves the current domain for API requests
 *
 * @returns Domain string, defaults to DEFAULT_BASE_URL if not set
 */
const getDomain = (): string => {
  return globalConfig.WSDOT_BASE_URL || DEFAULT_BASE_URL;
};

/**
 * Sets the API key for WSDOT API authentication
 *
 * @param apiKey - API key string to set
 * @throws {Error} When API key is empty or invalid
 */
const setApiKey = (apiKey: string): void => {
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API key cannot be empty");
  }

  globalConfig.WSDOT_ACCESS_TOKEN = apiKey.trim();
};

/**
 * Sets the custom domain for WSDOT API requests
 *
 * @param domain - Domain string to set
 * @throws {Error} When domain is empty or invalid
 */
const setDomain = (domain: string): void => {
  if (!domain || domain.trim() === "") {
    throw new Error("Domain cannot be empty");
  }

  globalConfig.WSDOT_BASE_URL = domain.trim();
};

/**
 * Resets configuration to initial environment-based values
 *
 * Useful for testing or when configuration needs to be refreshed.
 * This function reloads configuration from environment variables.
 */
const clearConfig = (): void => {
  globalConfig = initializeFromEnv();
};

/**
 * Configuration manager object providing a clean interface for all configuration operations
 *
 * This object provides a centralized interface for managing WSDOT API configuration,
 * including API keys, base URLs, and configuration state management.
 *
 * @note Zod validation is always enabled for all API requests to ensure
 * fail-fast error handling and consistent behavior across environments.
 */
export const configManager = {
  getApiKey,
  getDomain,
  setApiKey,
  setDomain,
  clearConfig,
};
