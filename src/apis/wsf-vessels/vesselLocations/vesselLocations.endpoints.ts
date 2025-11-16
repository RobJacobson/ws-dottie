import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  type VesselLocationsByIdInput,
  type VesselLocationsInput,
  vesselLocationsByIdInputSchema,
  vesselLocationsInputSchema,
} from "./vesselLocations.input";
import {
  type VesselLocation,
  vesselLocationSchema,
} from "./vesselLocations.output";

export const vesselLocationsGroup: EndpointGroup = {
  name: "vessel-locations",
  cacheStrategy: "REALTIME",
  documentation: {
    summary: "Real-time vessel positions and status for WSF fleet.",
    description:
      "Current GPS coordinates, speed, heading, terminal assignments, and ETAs. This endpoint is real-time; cacheFlushDate is not used for cache invalidation.",
    useCases: [
      "Show live vessel positions and ETAs in rider apps.",
      "Monitor fleet operations in internal dashboards.",
      "Calculate arrival times and voyage progress.",
    ],
    updateFrequency: "5s",
  },
};

export const fetchVesselLocations = createEndpoint<
  VesselLocationsInput,
  VesselLocation[]
>({
  api: apis.wsfVessels,
  group: vesselLocationsGroup,
  functionName: "fetchVesselLocations",
  endpoint: "/vesselLocations",
  inputSchema: vesselLocationsInputSchema,
  outputSchema: vesselLocationSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List current locations and status for all active vessels.",
});

export const fetchVesselLocationsByVesselId = createEndpoint<
  VesselLocationsByIdInput,
  VesselLocation
>({
  api: apis.wsfVessels,
  group: vesselLocationsGroup,
  functionName: "fetchVesselLocationsByVesselId",
  endpoint: "/vesselLocations/{VesselID}",
  inputSchema: vesselLocationsByIdInputSchema,
  sampleParams: { VesselID: 18 },
  outputSchema: vesselLocationSchema,
  endpointDescription:
    "Get current location and status for a specific vessel by ID.",
});
