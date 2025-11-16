import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { borderCrossingsInputSchema } from "./borderCrossingData.input";
import { borderCrossingSchema } from "./borderCrossingData.output";

export const borderCrossingDataGroup: EndpointGroup = {
  name: "border-crossing-data",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Current wait times for Washington border crossings into Canada by crossing and lane type.",
    description:
      "Snapshot wait-time data for I-5, SR-543, SR-539, and SR-9 crossings, covering general, Nexus, and truck lanes.",
    useCases: [
      "Plan trips into Canada based on current border wait times.",
      "Compare wait times across crossings and lane types.",
      "Show live wait-time information in traveler or operations dashboards.",
    ],
    updateFrequency: "1m",
  },
};

export const fetchBorderCrossings = createEndpoint({
  api: apis.wsdotBorderCrossings,
  group: borderCrossingDataGroup,
  functionName: "fetchBorderCrossings",
  endpoint: "/GetBorderCrossingsAsJson",
  inputSchema: borderCrossingsInputSchema,
  outputSchema: borderCrossingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current wait times for all Washington border crossings into Canada.",
});
