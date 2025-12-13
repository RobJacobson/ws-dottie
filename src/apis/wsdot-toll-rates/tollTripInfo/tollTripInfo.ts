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
  toolDescription: {
    purpose: "List trip information for all toll trips statewide.",
    useWhen: [
      "mapping toll routes and lanes",
      "understanding toll trip geography",
      "route planning with location data",
    ],
    avoidWhen: [
      "you only need pricing information (prefer fetchTollRates)",
      "you need current toll amounts (prefer fetchTollRates)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per toll trip route",
    outputHighlights: [
      "Locations: StartLocationName/EndLocationName with milepost markers",
      "Coordinates: Start/End Latitude/Longitude for precise mapping",
      "Route details: TravelDirection, TripName (unique route identifier)",
      "Geometry: Encoded route geometry data for visualization (may be null)",
      "Metadata: ModifiedDate showing when route info was last updated",
    ],
  },
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
