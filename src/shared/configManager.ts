/**
 * WSDOT API Configuration Manager
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
 * // Set base URL only
 * configManager.setBaseUrl("https://custom.wsdot.wa.gov");
 *
 * // Get API key (auto-initializes from environment if not set)
 * const apiKey = configManager.getApiKey();
 *
 * // Get base URL
 * const baseUrl = configManager.getBaseUrl();
 * ```
 */

// Default base URL for WSDOT/WSF requests
const DEFAULT_BASE_URL = "https://www.wsdot.wa.gov";

/**
 * Configuration interface for WSDOT API settings
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

// Global configuration state - initialized from environment at module load
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
 * Retrieves the current base URL for API requests
 *
 * @returns Base URL string, defaults to DEFAULT_BASE_URL if not set
 */
const getBaseUrl = (): string => {
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
 * Sets the custom base URL for WSDOT API requests
 *
 * @param baseUrl - Base URL string to set
 * @throws {Error} When base URL is empty or invalid
 */
const setBaseUrl = (baseUrl: string): void => {
  if (!baseUrl || baseUrl.trim() === "") {
    throw new Error("Base URL cannot be empty");
  }

  globalConfig.WSDOT_BASE_URL = baseUrl.trim();
};

/**
 * Resets configuration to initial environment-based values
 * Useful for testing or when configuration needs to be refreshed
 */
const clearConfig = (): void => {
  globalConfig = initializeFromEnv();
};

/**
 * Configuration manager object providing a clean interface for all configuration operations
 *
 * Note: Zod validation is always enabled for all API requests to ensure
 * fail-fast error handling and consistent behavior across environments.
 */
export const configManager = {
  getApiKey,
  getBaseUrl,
  setApiKey,
  setBaseUrl,
  clearConfig,
};
