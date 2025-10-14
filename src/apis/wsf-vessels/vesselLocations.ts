import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const vesselLocationsResource = {
  name: "vessel-locations",
  resourceDescription:
    "Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, whether or not the vessel is at dock, departure and arrival terminal details, and estimated time of arrival. Data is real time, updated every few seconds.",
  cacheStrategy: "REALTIME" as const,
  endpoints: {
    getVesselLocations: {
      function: "getVesselLocations",
      endpoint: "/vesselLocations",
      inputSchema: i.vesselLocationsSchema,
      outputSchema: z.array(o.vesselLocationsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns a list of VesselLocation data for all vesselLocations.",
    } satisfies EndpointDefinition<i.VesselLocationsInput, o.VesselLocations[]>,
    getVesselLocationsByVesselId: {
      function: "getVesselLocationsByVesselId",
      endpoint: "/vesselLocations/{VesselID}",
      inputSchema: i.vesselLocationsByIdSchema,
      outputSchema: o.vesselLocationsSchema,
      sampleParams: { VesselID: 18 },
      endpointDescription:
        "Returns VesselLocation data for the vessellocation with the given identifier.",
    } satisfies EndpointDefinition<
      i.VesselLocationsByIdInput,
      o.VesselLocations
    >,
  },
};
