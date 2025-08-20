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

// Configuration interface
export interface WsdotConfig {
  WSDOT_ACCESS_TOKEN: string;
  WSDOT_BASE_URL?: string;
  WS_DOTTIE_VALIDATION_MODE?: "strict" | "disabled" | "auto";
}

// Helper function to safely access environment variables
const getEnvVar = (key: string): string | undefined => {
  // Node.js environment
  if (typeof process !== "undefined" && process.env) {
    return process.env[key];
  }

  // Browser environment - try to access via window object if available
  if (typeof window !== "undefined") {
    type EnvWindow = Window & { __ENV__?: Record<string, string> };
    const env = (window as EnvWindow).__ENV__;
    if (env) return env[key];
  }

  // For bundlers that inject environment variables, we'll rely on the consuming application
  // to provide these via configuration rather than trying to access them directly
  return undefined;
};

// Initialize configuration from environment variables at module load
const initializeFromEnv = (): WsdotConfig => {
  const apiKey = getEnvVar("WSDOT_ACCESS_TOKEN") || "";
  const baseUrl = getEnvVar("WSDOT_BASE_URL") || DEFAULT_BASE_URL;
  const validationMode =
    (getEnvVar("WS_DOTTIE_VALIDATION_MODE") as
      | "strict"
      | "disabled"
      | "auto") || "auto";

  return {
    WSDOT_ACCESS_TOKEN: apiKey,
    WSDOT_BASE_URL: baseUrl,
    WS_DOTTIE_VALIDATION_MODE: validationMode,
  };
};

// Global configuration state - initialized from environment at module load
let globalConfig: WsdotConfig = initializeFromEnv();

// Configuration management functions
const getApiKey = (): string => {
  if (!globalConfig.WSDOT_ACCESS_TOKEN) {
    throw new Error(
      "WSDOT_ACCESS_TOKEN is required. Set it via WSDOT_ACCESS_TOKEN environment variable or use configManager.setApiKey()."
    );
  }
  return globalConfig.WSDOT_ACCESS_TOKEN;
};

const getBaseUrl = (): string => {
  return globalConfig.WSDOT_BASE_URL || DEFAULT_BASE_URL;
};

const setApiKey = (apiKey: string): void => {
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("API key cannot be empty");
  }

  globalConfig.WSDOT_ACCESS_TOKEN = apiKey.trim();
};

const setBaseUrl = (baseUrl: string): void => {
  if (!baseUrl || baseUrl.trim() === "") {
    throw new Error("Base URL cannot be empty");
  }

  globalConfig.WSDOT_BASE_URL = baseUrl.trim();
};

const setValidationMode = (mode: "strict" | "disabled" | "auto"): void => {
  globalConfig.WS_DOTTIE_VALIDATION_MODE = mode;
};

const getValidationMode = (): "strict" | "disabled" | "auto" => {
  return globalConfig.WS_DOTTIE_VALIDATION_MODE || "auto";
};

const shouldValidateInputs = (): boolean => {
  const mode = getValidationMode();
  if (mode === "strict") return true;
  if (mode === "disabled") return false;

  // 'auto' mode: validate in production, skip in development
  const nodeEnv = getEnvVar("NODE_ENV");
  return nodeEnv === "production";
};

const clearConfig = (): void => {
  globalConfig = initializeFromEnv();
};

// Configuration manager object for clean interface
export const configManager = {
  getApiKey,
  getBaseUrl,
  setApiKey,
  setBaseUrl,
  setValidationMode,
  getValidationMode,
  shouldValidateInputs,
  clearConfig,
};
