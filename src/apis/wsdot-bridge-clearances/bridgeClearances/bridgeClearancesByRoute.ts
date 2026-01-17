import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotBridgeClearancesApiMeta } from "../apiMeta";
import {
  type BridgeClearancesByRouteInput,
  bridgeClearancesByRouteInputSchema,
} from "./shared/bridgeClearances.input";
import {
  type BridgeClearance,
  bridgeClearanceSchema,
} from "./shared/bridgeClearances.output";

/**
 * Metadata for the fetchBridgeClearancesByRoute endpoint
 */
export const bridgeClearancesByRouteMeta = {
  functionName: "fetchBridgeClearancesByRoute",
  endpoint: "/getClearancesAsJson?Route={Route}",
  inputSchema: bridgeClearancesByRouteInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: { Route: "005" },
  endpointDescription:
    "Get vertical clearance data for bridges on a specific state route.",
  toolDescription: {
    purpose:
      "Get vertical clearance data for bridges on a specific state route.",
    useWhen: [
      "route planning with height restrictions",
      "bridge clearance verification for specific highways",
      "targeted bridge data analysis by route",
    ],
    avoidWhen: [
      "you need bridges across all routes (prefer fetchBridgeClearances)",
    ],
    inputs: [
      "Route: three-digit route identifier, e.g., '005' for I-5, '167' for SR-167",
    ],
    returns: "array — one item per bridge on the specified route",
    outputHighlights: [
      "IDs: BridgeNumber (route/structure), StateStructureId, CrossingLocationId",
      "Location: Latitude, Longitude, SRMP (milepost), StateRouteID",
      "Clearance: VerticalClearanceMaximumInches/MinimumInches (in inches), VerticalClearanceMaximumFeetInch/MinimumFeetInch (formatted)",
      "Metadata: CrossingDescription, APILastUpdate, RouteDate",
      "Route-filtered: subset of bridges specific to requested route",
    ],
    chaining: [
      "fetchBridgeClearances → extract StateRouteID → call fetchBridgeClearancesByRoute (to filter to specific route)",
    ],
  },
} satisfies EndpointMeta<BridgeClearancesByRouteInput, BridgeClearance[]>;

/**
 * Factory result for bridge clearances by route
 */
const bridgeClearancesByRouteFactory = createFetchAndHook<
  BridgeClearancesByRouteInput,
  BridgeClearance[]
>({
  api: wsdotBridgeClearancesApiMeta,
  endpoint: bridgeClearancesByRouteMeta,
  getEndpointGroup: () =>
    require("./shared/bridgeClearances.endpoints").bridgeClearancesGroup,
});

/**
 * Fetch function and React Query hook for retrieving vertical clearance data for bridges on a specific state route
 */
export const {
  fetch: fetchBridgeClearancesByRoute,
  hook: useBridgeClearancesByRoute,
} = bridgeClearancesByRouteFactory;
