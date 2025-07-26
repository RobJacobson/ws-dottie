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

// Helper function to safely access environment variables
const getEnvVar = (key: string): string | undefined => {
  // Node.js environment
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }

  // Browser environment - try to access via window object if available
  if (typeof window !== "undefined" && (window as any).__ENV__) {
    return (window as any).__ENV__[key];
  }

  // For bundlers that inject environment variables, we'll rely on the consuming application
  // to provide these via configuration rather than trying to access them directly
  return undefined;
};

// Get API key from environment variables
const getApiKeyFromEnv = (): string => {
  const apiKey =
    getEnvVar("WSDOT_ACCESS_TOKEN") ||
    getEnvVar("EXPO_PUBLIC_WSDOT_ACCESS_TOKEN");
  return apiKey || "";
};

// Get base URL from environment variables
const getBaseUrlFromEnv = (): string | undefined => {
  return getEnvVar("WSDOT_BASE_URL") || getEnvVar("EXPO_PUBLIC_WSDOT_BASE_URL");
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
