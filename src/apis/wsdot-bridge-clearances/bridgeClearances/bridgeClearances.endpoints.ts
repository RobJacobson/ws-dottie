import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import {
  bridgeClearancesByRouteInputSchema,
  bridgeClearancesInputSchema,
} from "./bridgeClearances.input";
import { bridgeClearanceSchema } from "./bridgeClearances.output";

export const bridgeClearancesGroup = defineEndpointGroup({
  name: "bridge-clearances",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Each BridgeDataGIS item represents vertical clearance measurements for Washington State bridges, including bridge identification numbers, GPS coordinates, route information, and clearance height data in both feet-inches and inches formats. These items provide essential height restriction information needed for commercial vehicle routing and oversize load permit applications.",
    businessContext:
      "Use to check bridge heights and plan commercial vehicle routes by providing vertical clearance measurements, bridge location data, and route information for Washington State bridges. Verify vehicle clearance requirements and identify height restrictions before planning routes with oversize loads.",
  },
});

export const fetchBridgeClearances = defineEndpoint({
  api: API,
  group: bridgeClearancesGroup,
  functionName: "fetchBridgeClearances",
  endpoint: "/getClearancesAsJson",
  inputSchema: bridgeClearancesInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of BridgeDataGIS objects containing vertical clearance data for all Washington State bridges.",
});

export const fetchBridgeClearancesByRoute = defineEndpoint({
  api: API,
  group: bridgeClearancesGroup,
  functionName: "fetchBridgeClearancesByRoute",
  endpoint: "/getClearancesAsJson?Route={Route}",
  inputSchema: bridgeClearancesByRouteInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: { Route: "005" },
  endpointDescription:
    "Returns an array of BridgeDataGIS objects containing vertical clearance data filtered by specified state route.",
});
