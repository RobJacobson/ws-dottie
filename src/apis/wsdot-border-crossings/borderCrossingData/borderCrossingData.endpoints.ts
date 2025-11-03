import { z } from "@/shared/zod-openapi-init";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./borderCrossingData.input";
import * as o from "./borderCrossingData.output";

export const borderCrossingDataResource: EndpointGroup = {
  name: "border-crossing-data",
  documentation: {
    resourceDescription:
      "Each BorderCrossingData item represents current border crossing wait time information for Washington State crossings into Canada, including crossing identification (name and type), location coordinates, timestamp data, and wait time measurements in minutes. These items provide real-time traffic flow data for I-5, SR-543, SR-539, and SR-9 crossings, supporting both general purpose and specialized lanes (Nexus, Trucks, FAST).",
    businessContext:
      "Use to plan border crossing routes and estimate wait times by providing real-time wait time data, crossing location information, and timestamp measurements for Washington State crossings into Canada. Compare wait times across different crossing types (general purpose, Nexus, truck lanes) and select optimal crossing points for travel planning.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getBorderCrossings: {
      function: "getBorderCrossings",
      endpoint: "/GetBorderCrossingsAsJson",
      inputSchema: i.getBorderCrossingsSchema,
      outputSchema: z.array(o.borderCrossingDataSchema),
      sampleParams: {},
      endpointDescription:
        "Returns an array of BorderCrossingData objects containing current wait times for all Washington State border crossings into Canada.",
    } satisfies EndpointDefinition<
      i.GetBorderCrossingsInput,
      o.BorderCrossingData[]
    >,
  },
};
