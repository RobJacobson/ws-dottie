import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
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
 * Factory result for toll trip info
 */
const tollTripInfoFactory = createFetchAndHook<
  TollTripInfoInput,
  TollTripInfo[]
>({
  api: wsdotTollRatesApiMeta,
  endpoint: tollTripInfoMeta,
  getEndpointGroup: () =>
    require("./shared/tollTripInfo.endpoints").tollTripInfoGroup,
});

/**
 * Fetch function and React Query hook for retrieving trip information for all toll trips statewide
 */
export const { fetch: fetchTollTripInfo, hook: useTollTripInfo } =
  tollTripInfoFactory;
