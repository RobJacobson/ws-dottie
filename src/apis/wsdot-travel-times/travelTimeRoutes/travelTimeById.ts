import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotTravelTimesApiMeta } from "../apiMeta";
import {
  type TravelTimeByIdInput,
  travelTimeByIdInputSchema,
} from "./shared/travelTimeRoutes.input";
import {
  type TravelTimeRoute,
  travelTimeRouteSchema,
} from "./shared/travelTimeRoutes.output";

/**
 * Metadata for the fetchTravelTimeById endpoint
 */
export const travelTimeByIdMeta = {
  functionName: "fetchTravelTimeById",
  endpoint: "/getTravelTimeAsJson?TravelTimeID={TravelTimeID}",
  inputSchema: travelTimeByIdInputSchema,
  outputSchema: travelTimeRouteSchema,
  sampleParams: { TravelTimeID: 1 },
  endpointDescription: "Get travel time data for a specific route by ID.",
} satisfies EndpointMeta<TravelTimeByIdInput, TravelTimeRoute>;

/**
 * Factory result for travel time by ID
 */
const travelTimeByIdFactory = createFetchAndHook<
  TravelTimeByIdInput,
  TravelTimeRoute
>({
  api: wsdotTravelTimesApiMeta,
  endpoint: travelTimeByIdMeta,
  getEndpointGroup: () =>
    require("./shared/travelTimeRoutes.endpoints").travelTimeRoutesGroup,
});

/**
 * Fetch function and React Query hook for retrieving travel time data for a specific route by ID
 */
export const { fetch: fetchTravelTimeById, hook: useTravelTimeById } =
  travelTimeByIdFactory;
