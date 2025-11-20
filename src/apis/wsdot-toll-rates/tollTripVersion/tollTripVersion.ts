import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import { tollTripVersionGroup } from "./shared/tollTripVersion.endpoints";
import {
  type TollTripVersionInput,
  tollTripVersionInputSchema,
} from "./shared/tollTripVersion.input";
import {
  type TollTripVersion,
  tollTripVersionSchema,
} from "./shared/tollTripVersion.output";

/**
 * Metadata for the fetchTollTripVersion endpoint
 */
export const tollTripVersionMeta = {
  functionName: "fetchTollTripVersion",
  endpoint: "/getTollTripVersionAsJson",
  inputSchema: tollTripVersionInputSchema,
  outputSchema: tollTripVersionSchema,
  sampleParams: {},
  endpointDescription: "Get current version and timestamp for toll trip data.",
} satisfies EndpointMeta<TollTripVersionInput, TollTripVersion>;

/**
 * Fetch function for retrieving current version and timestamp for toll trip data
 */
export const fetchTollTripVersion: FetchFactory<
  TollTripVersionInput,
  TollTripVersion
> = createFetchFunction({
  api: wsdotTollRatesApiMeta,
  endpoint: tollTripVersionMeta,
});

/**
 * React Query hook for retrieving current version and timestamp for toll trip data
 */
export const useTollTripVersion: HookFactory<
  TollTripVersionInput,
  TollTripVersion
> = createHook({
  apiName: wsdotTollRatesApiMeta.name,
  endpointName: tollTripVersionMeta.functionName,
  fetchFn: fetchTollTripVersion,
  cacheStrategy: tollTripVersionGroup.cacheStrategy,
});
