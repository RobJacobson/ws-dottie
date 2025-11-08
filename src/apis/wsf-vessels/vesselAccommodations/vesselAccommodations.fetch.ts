import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { vesselAccommodationsResource } from "./vesselAccommodations.endpoints";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations.input";
import type { VesselAccommodation } from "./vesselAccommodations.output";

const fetchFunctions = createFetchFunctions(
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
