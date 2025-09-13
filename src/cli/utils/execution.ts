/**
 * API execution utilities
 */

import { fetchNative } from "@/shared/fetching/execution/fetchNative";
import { buildFetchUrl } from "@/shared/fetching/pipeline/prepareRequest";
import { parseDotNetTimestamp } from "@/shared/utils";
import type { AnyEndpointDefinition, CliOptions, CliParams } from "./types";

/**
 * Execute validated API call using Zod pipeline
 */
export const executeValidated = async (
  endpointDef: AnyEndpointDefinition,
  params: CliParams
): Promise<unknown> => {
  return endpointDef.handleFetch(params as unknown);
};

/**
 * Execute native API call using native fetch
 */
export const executeNative = async (
  endpointDef: AnyEndpointDefinition,
  params: CliParams,
  options: CliOptions
): Promise<unknown> => {
  const url = buildFetchUrl(
    endpointDef.meta.endpoint,
    endpointDef.meta.inputSchema,
    params,
    {
      endpoint: endpointDef.meta.function,
      logMode: "none",
      interpolatedUrl: endpointDef.meta.endpoint,
    }
  );

  const result = await fetchNative(url);

  return JSON.parse(result, (_, value) => {
    if (options.fixDates && typeof value === "string") {
      const date = parseDotNetTimestamp(value);
      return date || value;
    }
    return value;
  });
};
