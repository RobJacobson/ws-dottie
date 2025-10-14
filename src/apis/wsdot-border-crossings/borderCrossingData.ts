import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const borderCrossingDataResource = {
  name: "border-crossing-data",
  resourceDescription:
    "BorderCrossingData provides real-time information about Canadian border crossing wait times, including location details, crossing names, timestamps, and current wait times in minutes. Data updates frequently based on border conditions.",
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
