/**
 * @fileoverview Configuration Management for WS-Dottie
 *
 * This module provides configuration management for WS-Dottie API operations,
 * including API key and domain configuration with runtime modification
 * capability. It supports environment variable configuration and runtime
 * updates for different deployment scenarios.
 */

/** Default base URL for WSDOT/WSF API requests */
const DEFAULT_BASE_URL = "http://www.wsdot.wa.gov";

/**
 * Configuration interface for WS-Dottie
 *
 * Defines the structure for WS-Dottie configuration including API key
 * and domain settings.
 */
export interface WsdotConfig {
  /** WSDOT API access token for authentication */
  apiKey: string;
  /** Base domain for API requests */
  domain: string;
}

/** Runtime configuration state */
const runtimeConfig = {
  apiKey: process.env.WSDOT_ACCESS_TOKEN || "",
  domain: process.env.WSDOT_BASE_URL || DEFAULT_BASE_URL,
};

/**
 * Gets the current WSDOT API access token
 *
 * This function returns the currently configured API access token,
 * which is used for authenticating requests to WSDOT/WSF APIs.
 *
 * @returns The current API key string
 */
export const getApiKey = (): string => {
  return runtimeConfig.apiKey;
};

/**
 * Gets the current WSDOT base URL
 *
 * This function returns the currently configured base URL for
 * WSDOT/WSF API requests.
 *
 * @returns The current base URL string
 */
export const getDomain = (): string => {
  return runtimeConfig.domain;
};

/**
 * Sets the WSDOT API access token
 *
 * This function allows runtime modification of the API access token,
 * useful for different environments or when tokens need to be updated.
 *
 * @param apiKey - The new API key string to set
 */
export const setApiKey = (apiKey: string): void => {
  runtimeConfig.apiKey = apiKey;
};

/**
 * Sets the WSDOT base URL
 *
 * This function allows runtime modification of the base URL,
 * useful for different environments or API endpoints.
 *
 * @param domain - The new domain string to set
 */
export const setDomain = (domain: string): void => {
  runtimeConfig.domain = domain;
};

/**
 * Configuration manager object
 *
 * This object provides a convenient interface for accessing and
 * modifying WS-Dottie configuration settings.
 */
export const configManager = {
  getApiKey,
  getDomain,
  setApiKey,
  setDomain,
};
