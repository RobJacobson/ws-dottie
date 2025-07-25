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
 *
 * Usage:
 * ```typescript
 * // Set configuration manually
 * configManager.setConfig({
 *   WSDOT_ACCESS_TOKEN: "your-api-key",
 *   WSDOT_BASE_URL: "https://custom.wsdot.wa.gov"
 * });
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

// Configuration interface
export interface WsdotConfig {
  WSDOT_ACCESS_TOKEN: string;
  WSDOT_BASE_URL?: string;
}

// Get API key from environment variables
const getApiKeyFromEnv = (): string => {
  // Node.js environment
  if (typeof process !== "undefined" && process.env?.WSDOT_ACCESS_TOKEN) {
    return process.env.WSDOT_ACCESS_TOKEN;
  }

  // Browser environment - let build tools handle the rest
  if (typeof import.meta !== "undefined") {
    const env = (import.meta as { env?: { WSDOT_ACCESS_TOKEN?: string } }).env;
    if (env?.WSDOT_ACCESS_TOKEN) {
      return env.WSDOT_ACCESS_TOKEN;
    }
  }

  return "";
};

// Get base URL from environment variables
const getBaseUrlFromEnv = (): string | undefined => {
  // Node.js environment
  if (typeof process !== "undefined" && process.env?.WSDOT_BASE_URL) {
    return process.env.WSDOT_BASE_URL;
  }

  // Browser environment - let build tools handle the rest
  if (typeof import.meta !== "undefined") {
    const env = (import.meta as { env?: { WSDOT_BASE_URL?: string } }).env;
    if (env?.WSDOT_BASE_URL) {
      return env.WSDOT_BASE_URL;
    }
  }

  return undefined;
};

// Global configuration state
let globalConfig: WsdotConfig | null = null;

// Initialize config from environment if not already set
const initializeConfig = (): WsdotConfig => {
  // Return existing config if already initialized
  if (globalConfig) {
    return globalConfig;
  }

  // Read from environment variables
  const apiKey = getApiKeyFromEnv();
  if (!apiKey) {
    throw new Error(
      "WSDOT_ACCESS_TOKEN is required. Set it via WSDOT_ACCESS_TOKEN environment variable."
    );
  }

  // Create and store the config
  globalConfig = {
    WSDOT_ACCESS_TOKEN: apiKey,
    WSDOT_BASE_URL: getBaseUrlFromEnv() || DEFAULT_BASE_URL,
  };

  return globalConfig;
};

// Configuration management functions
const getApiKey = (): string => {
  return initializeConfig().WSDOT_ACCESS_TOKEN;
};

const getBaseUrl = (): string => {
  return initializeConfig().WSDOT_BASE_URL || DEFAULT_BASE_URL;
};

const setConfig = (config: WsdotConfig): void => {
  globalConfig = config;
};

const clearConfig = (): void => {
  globalConfig = null;
};

// Configuration manager object for clean interface
export const configManager = {
  getApiKey,
  getBaseUrl,
  setConfig,
  clearConfig,
};
