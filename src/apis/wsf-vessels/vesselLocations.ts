import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, whether or not the vessel is at dock, departure and arrival terminal details, and estimated time of arrival. Data is real time, updated every few seconds.";

export const vesselLocationsResource = {
  name: "vessel-locations",
  description: DESCRIPTION,
  cacheStrategy: "REALTIME" as const,
  endpoints: {
    all: {
      function: "getVesselLocations",
      endpoint: "/vesselLocations",
      inputSchema: i.vesselLocationsSchema,
      outputSchema: z.array(o.vesselLocationsSchema),
      sampleParams: {},
      cacheStrategy: "REALTIME",
      description: `Returns a list of VesselLocation data for all vesselLocations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.VesselLocationsInput, o.VesselLocations[]>,
    byId: {
      function: "getVesselLocationsByVesselId",
      endpoint: "/vesselLocations/{VesselID}",
      inputSchema: i.vesselLocationsByIdSchema,
      outputSchema: o.vesselLocationsSchema,
      sampleParams: { VesselID: 18 },
      cacheStrategy: "REALTIME",
      description: `Returns VesselLocation data for the vessellocation with the given identifier. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.VesselLocationsByIdInput,
      o.VesselLocations
    >,
  },
};
