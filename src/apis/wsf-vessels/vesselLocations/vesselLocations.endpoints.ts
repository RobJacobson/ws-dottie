import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type {
  VesselLocationsByIdInput,
  VesselLocationsInput,
} from "./vesselLocations.input";
import {
  vesselLocationsByIdInputSchema,
  vesselLocationsInputSchema,
} from "./vesselLocations.input";
import type { VesselLocation } from "./vesselLocations.output";
import { vesselLocationSchema } from "./vesselLocations.output";

export const vesselLocationsGroup = {
  name: "vessel-locations",
  documentation: {
    resourceDescription:
      "Each VesselLocation item represents real-time vessel tracking data for Washington State Ferries. These include current position (latitude and longitude), speed and heading information, whether or not the vessel is at dock, departure and arrival terminal details, and estimated time of arrival.",
    businessContext:
      "Use to track real-time vessel positions and calculate arrival times by providing GPS coordinates, speed/heading data, and terminal departure/arrival information for WSF fleet monitoring. Determine current trip status, including start terminal, destination terminal, scheduled departure, at-dock status and ETA for this trip.",
  },
  // Using REALTIME strategy because vessel locations update every few seconds as vessels move
  cacheStrategy: "REALTIME" as const,
  endpoints: {
    getVesselLocations: {
      function: "getVesselLocations",
      endpoint: "/vesselLocations",
      inputSchema: vesselLocationsInputSchema,
      outputSchema: z.array(vesselLocationSchema),
      sampleParams: {},
      endpointDescription:
        "Returns multiple VesselLocation objects for all vessels in the fleet.",
    } satisfies EndpointDefinition<VesselLocationsInput, VesselLocation[]>,
    getVesselLocationsByVesselId: {
      function: "getVesselLocationsByVesselId",
      endpoint: "/vesselLocations/{VesselID}",
      inputSchema: vesselLocationsByIdInputSchema,
      outputSchema: vesselLocationSchema,
      sampleParams: { VesselID: 18 },
      endpointDescription:
        "Returns a VesselLocation object containing real-time position and status information for the specified vessel.",
    } satisfies EndpointDefinition<VesselLocationsByIdInput, VesselLocation>,
  },
} satisfies EndpointGroup;
