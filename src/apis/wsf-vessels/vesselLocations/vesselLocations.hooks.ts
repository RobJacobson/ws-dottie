import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselLocationsGroup } from "./vesselLocations.endpoints";
import * as fetchFunctions from "./vesselLocations.fetch";
import type {
  VesselLocationsByIdInput,
  VesselLocationsInput,
} from "./vesselLocations.input";
import type { VesselLocation } from "./vesselLocations.output";

const hooks = createHooks(wsfVesselsApi, vesselLocationsGroup, fetchFunctions);

export const useVesselLocations: (
  params?: FetchFunctionParams<VesselLocationsInput>,
  options?: QueryHookOptions<VesselLocation[]>
) => UseQueryResult<VesselLocation[], Error> = hooks.useVesselLocations;

export const useVesselLocationsByVesselId: (
  params?: FetchFunctionParams<VesselLocationsByIdInput>,
  options?: QueryHookOptions<VesselLocation>
) => UseQueryResult<VesselLocation, Error> = hooks.useVesselLocationsByVesselId;
