import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Bridge clearance data provides information about vertical clearances for bridges along state routes. Each record includes bridge identification, location details (latitude/longitude, route, milepost), and clearance measurements in both feet-inches and inches formats. Data is sourced from WSDOT's bridge inventory system.";

export const bridgeClearancesResource = {
  name: "bridge-clearances",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getBridgeClearances",
      endpoint: "/getClearancesAsJson",
      inputSchema: i.getClearancesSchema,
      outputSchema: z.array(o.bridgeDataGISSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns bridge clearance data for all bridges. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.GetClearancesInput, o.BridgeDataGIS[]>,
    byRoute: {
      function: "getBridgeClearancesByRoute",
      endpoint: "/getClearancesAsJson?Route={Route}",
      inputSchema: i.getClearancesByRouteSchema,
      outputSchema: z.array(o.bridgeDataGISSchema),
      sampleParams: { Route: "005" },
      cacheStrategy: "STATIC",
      description: `Returns bridge clearance data filtered by state route. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetClearancesByRouteInput,
      o.BridgeDataGIS[]
    >,
  },
};
