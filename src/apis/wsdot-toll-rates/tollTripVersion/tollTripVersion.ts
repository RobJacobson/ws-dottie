import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTollRatesApiMeta } from "../apiMeta";
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
 * Factory result for toll trip version
 */
const tollTripVersionFactory = createFetchAndHook<
  TollTripVersionInput,
  TollTripVersion
>({
  api: wsdotTollRatesApiMeta,
  endpoint: tollTripVersionMeta,
  getEndpointGroup: () =>
    require("./shared/tollTripVersion.endpoints").tollTripVersionGroup,
});

/**
 * Fetch function and React Query hook for retrieving current version and timestamp for toll trip data
 */
export const { fetch: fetchTollTripVersion, hook: useTollTripVersion } =
  tollTripVersionFactory;
