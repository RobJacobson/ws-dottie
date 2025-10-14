import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "FlowData represents real-time traffic flow information from sensors across the state. Data includes traffic conditions (WideOpen, Moderate, Heavy, StopAndGo), station locations, and timestamps. Data is updated every 90 seconds.";

export const flowDataResource = {
  name: "flow-data",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getTrafficFlows",
      endpoint: "/getTrafficFlowsAsJson",
      inputSchema: i.getTrafficFlowsSchema,
      outputSchema: z.array(o.flowDataSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns real-time traffic flow data for all stations across the state. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTrafficFlowsInput, o.FlowData[]>,
    byId: {
      function: "getTrafficFlowById",
      endpoint: "/getTrafficFlowAsJson?FlowDataID={FlowDataID}",
      inputSchema: i.getTrafficFlowSchema,
      outputSchema: o.flowDataSchema,
      sampleParams: { FlowDataID: 2482 },
      cacheStrategy: "FREQUENT",
      description: `Returns real-time traffic flow data for a specific station by FlowDataID. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetTrafficFlowInput, o.FlowData>,
  },
};