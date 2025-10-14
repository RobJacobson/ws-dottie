import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each VesselStat item represents detailed vessel specifications including physical dimensions (length, beam, draft), engine specifications (count, horsepower, propulsion type), capacity information (passenger count, vehicle space), and historical details (year built, vessel history). Data updates infrequently.";

export const vesselStatsResource = {
  name: "vessel-stats",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    all: {
      function: "getVesselStats",
      endpoint: "/vesselStats",
      inputSchema: i.vesselStatsSchema,
      outputSchema: z.array(o.vesselStatsSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: `Returns a list of VesselStat data for all vesselStats. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselStatsInput, o.VesselStats[]>,
    byId: {
      function: "getVesselStatsByVesselId",
      endpoint: "/vesselStats/{VesselID}",
      inputSchema: i.vesselStatsByIdSchema,
      outputSchema: o.vesselStatsSchema,
      sampleParams: { VesselID: 32 },
      cacheStrategy: "STATIC",
      description: `Returns VesselStat data for the vesselstat with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselStatsByIdInput, o.VesselStats>,
  },
};
