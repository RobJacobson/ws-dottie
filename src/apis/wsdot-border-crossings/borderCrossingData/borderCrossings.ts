import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotBorderCrossingsApiMeta } from "../apiMeta";
import { borderCrossingDataGroup } from "./shared/borderCrossingData.endpoints";
import {
  type BorderCrossingsInput,
  borderCrossingsInputSchema,
} from "./shared/borderCrossingData.input";
import {
  type BorderCrossing,
  borderCrossingSchema,
} from "./shared/borderCrossingData.output";

/**
 * Metadata for the fetchBorderCrossings endpoint
 */
export const borderCrossingsMeta = {
  functionName: "fetchBorderCrossings",
  endpoint: "/GetBorderCrossingsAsJson",
  inputSchema: borderCrossingsInputSchema,
  outputSchema: borderCrossingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current wait times for all Washington border crossings into Canada.",
} satisfies EndpointMeta<BorderCrossingsInput, BorderCrossing[]>;

/**
 * Fetch function for retrieving current wait times for all Washington border crossings into Canada
 */
export const fetchBorderCrossings: FetchFactory<
  BorderCrossingsInput,
  BorderCrossing[]
> = createFetchFunction({
  api: wsdotBorderCrossingsApiMeta,
  endpoint: borderCrossingsMeta,
});

/**
 * React Query hook for retrieving current wait times for all Washington border crossings into Canada
 */
export const useBorderCrossings: HookFactory<
  BorderCrossingsInput,
  BorderCrossing[]
> = createHook({
  apiName: wsdotBorderCrossingsApiMeta.name,
  endpointName: borderCrossingsMeta.functionName,
  fetchFn: fetchBorderCrossings,
  cacheStrategy: borderCrossingDataGroup.cacheStrategy,
});
