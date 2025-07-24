// WSDOT API configuration manager

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
  if (!globalConfig) {
    const apiKey = getApiKeyFromEnv();
    if (!apiKey) {
      throw new Error(
        "WSDOT_ACCESS_TOKEN is required. Set it via WSDOT_ACCESS_TOKEN environment variable."
      );
    }
    globalConfig = {
      WSDOT_ACCESS_TOKEN: apiKey,
      WSDOT_BASE_URL: getBaseUrlFromEnv() || DEFAULT_BASE_URL,
    };
  }
  return globalConfig;
};

// Configuration management functions
export const getApiKey = (): string => {
  return initializeConfig().WSDOT_ACCESS_TOKEN;
};

export const getBaseUrl = (): string => {
  return initializeConfig().WSDOT_BASE_URL || DEFAULT_BASE_URL;
};

export const clearConfig = (): void => {
  globalConfig = null;
};

// Configuration manager object for clean interface
export const configManager = {
  getApiKey,
  getBaseUrl,
  clearConfig,
};
