/**
 * @fileoverview Public API for Data Fetching
 *
 * This module provides the public API functions for fetching data from WSDOT and WSF APIs.
 * These functions are the main entry points for consumers of the fetching module.
 */

import type { Endpoint } from "@/shared/endpoints";
import type { LoggingMode } from "@/shared/types";
import { fetch } from "./internal/fetch";

// ============================================================================
// PUBLIC API - Four explicit functions
// ============================================================================

/**
 * JSONP fetch without validation
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing configuration
 * @param params - Optional input parameters
 * @param logMode - Logging verbosity level
 * @returns Promise resolving to response data with .NET dates converted
 */
export const fetchJsonp = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode: LoggingMode = "none"
): Promise<TOutput> => fetch(endpoint, params, "jsonp", "none", logMode);

/**
 * JSONP fetch with Zod validation
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing schemas and configuration
 * @param params - Optional input parameters to validate
 * @param logMode - Logging verbosity level
 * @returns Promise resolving to validated and transformed response data
 */
export const fetchAndValidateJsonp = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode: LoggingMode = "none"
): Promise<TOutput> => fetch(endpoint, params, "jsonp", "zod", logMode);

/**
 * Native fetch without validation
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing configuration
 * @param params - Optional input parameters
 * @param logMode - Logging verbosity level
 * @returns Promise resolving to response data with .NET dates converted
 */
export const fetchNative = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode: LoggingMode = "none"
): Promise<TOutput> => fetch(endpoint, params, "native", "none", logMode);

/**
 * Native fetch with Zod validation
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing schemas and configuration
 * @param params - Optional input parameters to validate
 * @param logMode - Logging verbosity level
 * @returns Promise resolving to validated and transformed response data
 */
export const fetchAndValidateNative = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  logMode: LoggingMode = "none"
): Promise<TOutput> => fetch(endpoint, params, "native", "zod", logMode);
