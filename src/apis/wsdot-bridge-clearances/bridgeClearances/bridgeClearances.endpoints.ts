import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances.input";
import {
  bridgeClearancesByRouteInputSchema,
  bridgeClearancesInputSchema,
} from "./bridgeClearances.input";
import type { BridgeClearance } from "./bridgeClearances.output";
import { bridgeClearanceSchema } from "./bridgeClearances.output";

export const bridgeClearancesGroup = {
  name: "bridge-clearances",
  documentation: {
    resourceDescription:
      "Each BridgeDataGIS item represents vertical clearance measurements for Washington State bridges, including bridge identification numbers, GPS coordinates, route information, and clearance height data in both feet-inches and inches formats. These items provide essential height restriction information needed for commercial vehicle routing and oversize load permit applications.",
    businessContext:
      "Use to check bridge heights and plan commercial vehicle routes by providing vertical clearance measurements, bridge location data, and route information for Washington State bridges. Verify vehicle clearance requirements and identify height restrictions before planning routes with oversize loads.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    fetchBridgeClearances: {
      endpoint: "/getClearancesAsJson",
      inputSchema: bridgeClearancesInputSchema,
      outputSchema: z.array(bridgeClearanceSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of BridgeDataGIS objects containing vertical clearance data for all Washington State bridges.",
    } satisfies EndpointDefinition<BridgeClearancesInput, BridgeClearance[]>,
    fetchBridgeClearancesByRoute: {
      endpoint: "/getClearancesAsJson?Route={Route}",
      inputSchema: bridgeClearancesByRouteInputSchema,
      outputSchema: z.array(bridgeClearanceSchema),
      sampleParams: { Route: "005" },
      endpointDescription:
        "Returns an array of BridgeDataGIS objects containing vertical clearance data filtered by specified state route.",
    } satisfies EndpointDefinition<
      BridgeClearancesByRouteInput,
      BridgeClearance[]
    >,
  },
} satisfies EndpointGroup;
