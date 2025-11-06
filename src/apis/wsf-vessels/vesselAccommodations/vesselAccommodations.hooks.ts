import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useVesselAccommodations = hooks.useVesselAccommodations as (
  params?: VesselAccommodationsInput,
  options?: QueryHookOptions<VesselAccommodation[]>
) => UseQueryResult<VesselAccommodation[], Error>;

export const useVesselAccommodationsByVesselId =
  hooks.useVesselAccommodationsByVesselId as (
    params?: VesselAccommodationsByIdInput,
    options?: QueryHookOptions<VesselAccommodation>
  ) => UseQueryResult<VesselAccommodation, Error>;
