import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotBridgeClearancesApi } from "../apiDefinition";
import {
  bridgeClearancesByRouteInputSchema,
  bridgeClearancesInputSchema,
} from "./bridgeClearances.input";
import { bridgeClearanceSchema } from "./bridgeClearances.output";

const group = defineEndpointGroup({
  api: wsdotBridgeClearancesApi,
  name: "bridge-clearances",
  documentation: {
    resourceDescription:
      "Each BridgeDataGIS item represents vertical clearance measurements for Washington State bridges, including bridge identification numbers, GPS coordinates, route information, and clearance height data in both feet-inches and inches formats. These items provide essential height restriction information needed for commercial vehicle routing and oversize load permit applications.",
    businessContext:
      "Use to check bridge heights and plan commercial vehicle routes by providing vertical clearance measurements, bridge location data, and route information for Washington State bridges. Verify vehicle clearance requirements and identify height restrictions before planning routes with oversize loads.",
  },
  cacheStrategy: "STATIC",
});

export const fetchBridgeClearances = defineEndpoint({
  group,
  functionName: "fetchBridgeClearances",
  definition: {
    endpoint: "/getClearancesAsJson",
    inputSchema: bridgeClearancesInputSchema,
    outputSchema: bridgeClearanceSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns an array of BridgeDataGIS objects containing vertical clearance data for all Washington State bridges.",
  },
});

export const fetchBridgeClearancesByRoute = defineEndpoint({
  group,
  functionName: "fetchBridgeClearancesByRoute",
  definition: {
    endpoint: "/getClearancesAsJson?Route={Route}",
    inputSchema: bridgeClearancesByRouteInputSchema,
    outputSchema: bridgeClearanceSchema.array(),
    sampleParams: { Route: "005" },
    endpointDescription:
      "Returns an array of BridgeDataGIS objects containing vertical clearance data filtered by specified state route.",
  },
});

export const bridgeClearancesGroup = group.descriptor;
