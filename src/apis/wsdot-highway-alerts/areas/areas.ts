import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./areas.input";
import * as o from "./areas.output";

export const areasResource = {
  name: "areas",
  resourceDescription:
    "Map areas define geographic regions used for organizing and filtering highway alerts. Each area has a unique identifier and descriptive name to help users locate relevant traffic information.",
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getMapAreas: {
      function: "getMapAreas",
      endpoint: "/getMapAreasAsJson",
      inputSchema: i.getMapAreasSchema,
      outputSchema: z.array(o.areaSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of all available map areas with their identifiers and descriptions.",
    } satisfies EndpointDefinition<i.GetMapAreasInput, o.Area[]>,
  },
};
