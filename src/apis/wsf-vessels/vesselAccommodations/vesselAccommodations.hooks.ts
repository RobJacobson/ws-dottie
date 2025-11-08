import type { UseQueryResult } from "@tanstack/react-query";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { vesselAccommodationsResource } from "./vesselAccommodations.endpoints";
import * as fetchFunctions from "./vesselAccommodations.fetch";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations.input";
import type { VesselAccommodation } from "./vesselAccommodations.output";

const hooks = createHooks(
  wsfVesselsApi,
  vesselAccommodationsResource,
  fetchFunctions
);

export const useVesselAccommodations: (
  params?: FetchFunctionParams<VesselAccommodationsInput>,
  options?: QueryHookOptions<VesselAccommodation[]>
) => UseQueryResult<VesselAccommodation[], Error> =
  hooks.useVesselAccommodations;

export const useVesselAccommodationsByVesselId: (
  params?: FetchFunctionParams<VesselAccommodationsByIdInput>,
  options?: QueryHookOptions<VesselAccommodation>
) => UseQueryResult<VesselAccommodation, Error> =
  hooks.useVesselAccommodationsByVesselId;
