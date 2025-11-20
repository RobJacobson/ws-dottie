import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
import { tollTripInfoGroup } from "./shared/tollTripInfo.endpoints";
import {
  type TollTripInfoInput,
  tollTripInfoInputSchema,
} from "./shared/tollTripInfo.input";
import {
  type TollTripInfo,
  tollTripInfoSchema,
} from "./shared/tollTripInfo.output";

/**
 * Metadata for the fetchTollTripInfo endpoint
 */
export const tollTripInfoMeta = {
  functionName: "fetchTollTripInfo",
  endpoint: "/getTollTripInfoAsJson",
  inputSchema: tollTripInfoInputSchema,
  outputSchema: tollTripInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "List trip information for all toll trips statewide.",
} satisfies EndpointMeta<TollTripInfoInput, TollTripInfo[]>;

/**
 * Fetch function for retrieving trip information for all toll trips statewide
 */
export const fetchTollTripInfo: FetchFactory<
  TollTripInfoInput,
  TollTripInfo[]
> = createFetchFunction({
  api: wsdotTollRatesApiMeta,
  endpoint: tollTripInfoMeta,
});

/**
 * React Query hook for retrieving trip information for all toll trips statewide
 */
export const useTollTripInfo: HookFactory<TollTripInfoInput, TollTripInfo[]> =
  createHook({
    apiName: wsdotTollRatesApiMeta.name,
    endpointName: tollTripInfoMeta.functionName,
    fetchFn: fetchTollTripInfo,
    cacheStrategy: tollTripInfoGroup.cacheStrategy,
  });
