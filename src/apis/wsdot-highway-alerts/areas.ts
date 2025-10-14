import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Map areas define geographic regions used for organizing and filtering highway alerts. Each area has a unique identifier and descriptive name to help users locate relevant traffic information.";

export const areasResource = {
  name: "areas",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getMapAreas",
      endpoint: "/getMapAreasAsJson",
      inputSchema: i.getMapAreasSchema,
      outputSchema: z.array(o.areaSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns a list of all available map areas with their identifiers and descriptions. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetMapAreasInput, o.Area[]>,
  },
};
