import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  bridgeClearancesByRouteInputSchema,
  bridgeClearancesInputSchema,
} from "./bridgeClearances.input";
import { bridgeClearanceSchema } from "./bridgeClearances.output";

export const bridgeClearancesGroup: EndpointGroup = {
  name: "bridge-clearances",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Vertical clearance measurements for Washington State bridges.",
    description:
      "Bridge height restrictions including location data, route associations, and clearance measurements in both feet-inches and inches formats.",
    useCases: [
      "Plan commercial vehicle routes with height restrictions.",
      "Verify clearance requirements for oversize load permits.",
      "Identify bridge height limitations for route planning.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchBridgeClearances = createEndpoint({
  api: apis.wsdotBridgeClearances,
  group: bridgeClearancesGroup,
  functionName: "fetchBridgeClearances",
  endpoint: "/getClearancesAsJson",
  inputSchema: bridgeClearancesInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List vertical clearance data for all Washington State bridges.",
});

export const fetchBridgeClearancesByRoute = createEndpoint({
  api: apis.wsdotBridgeClearances,
  group: bridgeClearancesGroup,
  functionName: "fetchBridgeClearancesByRoute",
  endpoint: "/getClearancesAsJson?Route={Route}",
  inputSchema: bridgeClearancesByRouteInputSchema,
  outputSchema: bridgeClearanceSchema.array(),
  sampleParams: { Route: "005" },
  endpointDescription:
    "Get vertical clearance data for bridges on a specific state route.",
});
