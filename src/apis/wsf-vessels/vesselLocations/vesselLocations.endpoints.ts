import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import {
  vesselLocationsByIdInputSchema,
  vesselLocationsInputSchema,
} from "./vesselLocations.input";
import { vesselLocationSchema } from "./vesselLocations.output";

export const vesselLocationsGroup = defineEndpointGroup({
  name: "vessel-locations",
  cacheStrategy: "REALTIME",
  documentation: {
    resourceDescription:
      "Each VesselLocation item represents real-time vessel tracking data for Washington State Ferries. These include current position (latitude and longitude), speed and heading information, whether or not vessel is at dock, departure and arrival terminal details, and estimated time of arrival.",
    businessContext:
      "Use to track real-time vessel positions and calculate arrival times by providing GPS coordinates, speed/heading data, and terminal departure/arrival information for WSF fleet monitoring. Determine current trip status, including start terminal, destination terminal, scheduled departure, at-dock status and ETA for this trip.",
  },
});

export const fetchVesselLocations = defineEndpoint({
  api: API,
  group: vesselLocationsGroup,
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns multiple VesselLocation objects for all vessels in fleet.",
});

export const fetchVesselLocationsByVesselId = defineEndpoint({
  api: API,
  group: vesselLocationsGroup,
  functionName: "fetchVesselLocationsByVesselId",
  endpoint: "/vesselLocations/{VesselID}",
  inputSchema: vesselLocationsByIdInputSchema,
  outputSchema: vesselLocationSchema,
  sampleParams: { VesselID: 18 },
  endpointDescription:
    "Returns a VesselLocation object containing real-time position and status information for specified vessel.",
});
