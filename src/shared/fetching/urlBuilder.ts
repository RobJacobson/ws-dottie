// Functional URL builder for WSDOT APIs

import { dateToWsfPathFormat } from "./dateUtils";

/**
 * Type-safe URL parameter types
 */
export type UrlParam = string | number | Date | boolean;

/**
 * URL template with typed parameters
 */
export interface UrlTemplate<
  T extends Record<string, UrlParam> = Record<string, UrlParam>,
> {
  path: string;
  requiredParams: (keyof T)[];
  optionalParams?: (keyof T)[];
}

/**
 * Functional URL builder
 */
export const buildUrl = <T extends Record<string, UrlParam>>(
  template: string,
  params: T
): string => {
  const formatValue = (value: any): string =>
    value instanceof Date ? dateToWsfPathFormat(value) : String(value);

  return Object.entries(params).reduce(
    (url, [key, value]) => url.replace(`{${key}}`, formatValue(value)),
    template
  );
};

/**
 * Validates required parameters
 */
const validateParams = <T extends Record<string, UrlParam>>(
  template: UrlTemplate<T>,
  params: T
): void => {
  const missingParams = template.requiredParams.filter(
    (param) => !(param in params)
  );

  if (missingParams.length > 0) {
    throw new Error(`Missing required parameters: ${missingParams.join(", ")}`);
  }
};

/**
 * Builds a complete URL with validation
 */
export const buildUrlWithValidation = <T extends Record<string, UrlParam>>(
  template: UrlTemplate<T>,
  params: T
): string => {
  validateParams(template, params);
  return buildUrl(template.path, params);
};

/**
 * Legacy compatibility function - maintains existing API
 * @deprecated Use buildUrl instead for better type safety
 */
export const buildWsfUrl = (
  template: string,
  params: Record<string, string | number | Date | boolean> = {}
): string => buildUrl(template, params);

/**
 * Utility functions
 */
export const isDate = (value: any): value is Date => value instanceof Date;

export const formatDate = (date: Date): string =>
  date.toISOString().split("T")[0];

export const logError = (
  config: { logLevel: string },
  endpoint: string,
  error: any
) =>
  config.logLevel !== "none" &&
  console.error(`API error (${endpoint}):`, error);
