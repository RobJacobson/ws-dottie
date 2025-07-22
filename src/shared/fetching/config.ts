// WSDOT API configuration

// Logging modes
export type LoggingMode = "none" | "info" | "debug";

// Configuration interface
export interface WsdotConfig {
  apiKey: string;
  timeout?: number; // defaults to 10000
  retries?: number; // defaults to 3
  logLevel?: LoggingMode; // defaults to 'none'
}

// Legacy compatibility
export const API_KEY = process.env.WSDOT_ACCESS_TOKEN || "";
