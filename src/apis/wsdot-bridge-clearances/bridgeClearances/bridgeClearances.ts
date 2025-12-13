import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotBridgeClearancesApiMeta } from "../apiMeta";
import {
  type BridgeClearancesInput,
  bridgeClearancesInputSchema,
} from "./shared/bridgeClearances.input";
import {
  type BridgeClearance,
  bridgeClearanceSchema,
} from "./shared/bridgeClearances.output";

/**
 * Metadata for the fetchBridgeClearances endpoint
 */
export const bridgeClearancesMeta = {
  functionName: "fetchBridgeClearances",
  endpoint: "/getClearancesAsJson",
  inputSchema: bridgeClearancesInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List vertical clearance data for all Washington State bridges.",
  toolDescription: {
    purpose: "List vertical clearance data for all Washington State bridges.",
    useWhen: [
      "comprehensive bridge database analysis",
      "bulk data export for external systems",
      "complete state-wide bridge inventory",
    ],
    avoidWhen: [
      "you only need bridges on specific routes (prefer fetchBridgeClearancesByRoute)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per bridge",
    outputHighlights: [
      "IDs: BridgeNumber (route/structure), StateStructureId, CrossingLocationId",
      "Location: Latitude, Longitude, SRMP (milepost), StateRouteID",
      "Clearance: VerticalClearanceMaximumInches/MinimumInches (in inches), VerticalClearanceMaximumFeetInch/MinimumFeetInch (formatted)",
      "Metadata: CrossingDescription, APILastUpdate, RouteDate",
      "Large dataset: thousands of bridges with detailed location and clearance data",
    ],
    chaining: [
      "fetchBridgeClearances → extract StateRouteID → call fetchBridgeClearancesByRoute with { Route: ... } (for route-specific filtering)",
    ],
  },
} satisfies EndpointMeta<BridgeClearancesInput, BridgeClearance[]>;

/**
 * Factory result for bridge clearances
 */
const bridgeClearancesFactory = createFetchAndHook<
  BridgeClearancesInput,
  BridgeClearance[]
>({
  api: wsdotBridgeClearancesApiMeta,
  endpoint: bridgeClearancesMeta,
  getEndpointGroup: () =>
    require("./shared/bridgeClearances.endpoints").bridgeClearancesGroup,
});

/**
 * Fetch function and React Query hook for retrieving vertical clearance data for all Washington State bridges
 */
export const { fetch: fetchBridgeClearances, hook: useBridgeClearances } =
  bridgeClearancesFactory;
