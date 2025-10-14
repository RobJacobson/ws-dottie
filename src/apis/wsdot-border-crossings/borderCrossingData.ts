import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "BorderCrossingData provides real-time information about Canadian border crossing wait times, including location details, crossing names, timestamps, and current wait times in minutes. Data updates frequently based on border conditions.";

export const borderCrossingDataResource = {
  name: "border-crossing-data",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getBorderCrossings",
      endpoint: "/GetBorderCrossingsAsJson",
      inputSchema: i.getBorderCrossingsSchema,
      outputSchema: z.array(o.borderCrossingDataSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns current border crossing wait time data for all border crossings. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetBorderCrossingsInput,
      o.BorderCrossingData[]
    >,
  },
};
