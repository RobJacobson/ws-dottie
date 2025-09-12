/**
 * API execution utilities
 */

import { execSync } from "child_process";
import { parseDotNetTimestamp } from "@/shared/utils";
import { buildFetchUrl } from "@/shared/fetching/pipeline/prepareRequest";
import type { CliOptions, AnyEndpointDefinition, CliParams } from "./types";

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
 * Execute native API call using curl
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

  const curlCommand = `curl -s "${url}"`;
  const result = execSync(curlCommand, { encoding: "utf8" });

  return JSON.parse(result, (_, value) => {
    if (options.fixDates && typeof value === "string") {
      const date = parseDotNetTimestamp(value);
      return date || value;
    }
    return value;
  });
};
