import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./bridgeClearances.input";
import * as o from "./bridgeClearances.output";

export const bridgeClearancesGroup: EndpointGroup = {
  name: "bridge-clearances",
  documentation: {
    resourceDescription:
      "Each BridgeDataGIS item represents vertical clearance measurements for Washington State bridges, including bridge identification numbers, GPS coordinates, route information, and clearance height data in both feet-inches and inches formats. These items provide essential height restriction information needed for commercial vehicle routing and oversize load permit applications.",
    businessContext:
      "Use to check bridge heights and plan commercial vehicle routes by providing vertical clearance measurements, bridge location data, and route information for Washington State bridges. Verify vehicle clearance requirements and identify height restrictions before planning routes with oversize loads.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getBridgeClearances: {
      function: "getBridgeClearances",
      endpoint: "/getClearancesAsJson",
      inputSchema: i.getClearancesSchema,
      outputSchema: z.array(o.bridgeDataGISSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of BridgeDataGIS objects containing vertical clearance data for all Washington State bridges.",
    } satisfies EndpointDefinition<i.GetClearancesInput, o.BridgeDataGIS[]>,
    getBridgeClearancesByRoute: {
      function: "getBridgeClearancesByRoute",
      endpoint: "/getClearancesAsJson?Route={Route}",
      inputSchema: i.getClearancesByRouteSchema,
      outputSchema: z.array(o.bridgeDataGISSchema),
      sampleParams: { Route: "005" },
      endpointDescription:
        "Returns an array of BridgeDataGIS objects containing vertical clearance data filtered by specified state route.",
    } satisfies EndpointDefinition<
      i.GetClearancesByRouteInput,
      o.BridgeDataGIS[]
    >,
  },
};
