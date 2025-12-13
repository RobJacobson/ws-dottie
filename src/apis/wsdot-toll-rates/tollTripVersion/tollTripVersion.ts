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
  toolDescription: {
    purpose: "Get current version and timestamp for toll trip data.",
    useWhen: [
      "checking if toll data has been updated",
      "version tracking for caching decisions",
      "determining when to refresh toll rate data",
    ],
    avoidWhen: ["you need the actual toll rates (prefer fetchTollTripRates)"],
    inputs: [],
    returns: "object — current version number and timestamp",
    outputHighlights: [
      "Version: numeric version number that increments when toll rates change",
      "TimeStamp: UTC datetime when this version was created/updated",
      "Change detection: compare Version to detect toll rate updates",
      "Caching: use for determining when to refresh cached toll data",
    ],
  },
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
