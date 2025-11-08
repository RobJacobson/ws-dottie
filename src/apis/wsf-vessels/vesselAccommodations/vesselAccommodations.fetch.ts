import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselAccommodationsResource } from "./vesselAccommodations.endpoints";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations.input";
import type { VesselAccommodation } from "./vesselAccommodations.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  vesselAccommodationsResource
);

export const fetchVesselAccommodations: (
  params?: FetchFunctionParams<VesselAccommodationsInput>
) => Promise<VesselAccommodation[]> = fetchFunctions.fetchVesselAccommodations;

export const fetchVesselAccommodationsByVesselId: (
  params?: FetchFunctionParams<VesselAccommodationsByIdInput>
) => Promise<VesselAccommodation> =
  fetchFunctions.fetchVesselAccommodationsByVesselId;
