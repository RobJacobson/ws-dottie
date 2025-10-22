import { z } from "zod";
import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import * as i from "./borderCrossingData.input";
import * as o from "./borderCrossingData.output";

export const borderCrossingDataResource: EndpointGroup = {
  name: "border-crossing-data",
  documentation: {
    resourceDescription:
      "BorderCrossingData provides real-time information about Canadian border crossing wait times, including location details, crossing names, timestamps, and current wait times in minutes.",
    businessContext: "",
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
        "Returns current border crossing wait time data for all border crossings.",
    } satisfies EndpointDefinition<
      i.GetBorderCrossingsInput,
      o.BorderCrossingData[]
    >,
  },
};
