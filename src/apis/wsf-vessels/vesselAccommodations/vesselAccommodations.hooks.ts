import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselAccommodationsResource } from "./vesselAccommodations.endpoints";
import * as fetchFunctions from "./vesselAccommodations.fetch";
import type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations.input";
import type { VesselAccommodation } from "./vesselAccommodations.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  vesselAccommodationsResource,
  fetchFunctions
);

export const useVesselAccommodations: (
  params?: VesselAccommodationsInput,
  options?: QueryHookOptions<VesselAccommodation[]>
) => UseQueryResult<VesselAccommodation[], Error> = hooks.useVesselAccommodations;

export const useVesselAccommodationsByVesselId: (
  params?: VesselAccommodationsByIdInput,
  options?: QueryHookOptions<VesselAccommodation>
) => UseQueryResult<VesselAccommodation, Error> = hooks.useVesselAccommodationsByVesselId;
