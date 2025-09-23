/**
 * @fileoverview JSONP Fetch Tool (No Validation)
 *
 * This module provides raw API access using JSONP with automatic
 * conversion of .NET datetime strings to JavaScript Date objects.
 * No Zod validation is performed on input or output.
 * Use this in browser environments to bypass CORS restrictions.
 */

import type { Endpoint } from "@/shared/endpoints";
import { fetchCore } from "@/shared/fetching/shared/core";
import type { FetchOptions, FetchTool } from "@/shared/types";
import { convertDotNetDates } from "@/shared/utils/dateUtils";

/**
 * JSONP fetch with automatic .NET date conversion (no validation)
 *
 * This tool provides raw API access using JSONP with automatic
 * conversion of .NET datetime strings to JavaScript Date objects.
 * No Zod validation is performed on input or output.
 * Use this in browser environments to bypass CORS restrictions.
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 * @param endpoint - Complete endpoint object containing configuration
 * @param params - Optional input parameters
 * @param options - Optional fetch options including logging mode
 * @returns Promise resolving to response data with .NET dates converted
 */
export const fetchJsonp: FetchTool = async <TInput = never, TOutput = unknown>(
  endpoint: Endpoint<TInput, TOutput>,
  params?: TInput,
  options?: FetchOptions
): Promise<TOutput> => {
  const rawData = await fetchCore(endpoint, params, options, "jsonp");
  return convertDotNetDates(rawData) as TOutput;
};
