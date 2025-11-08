import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselVerboseResource } from "./vesselVerbose.endpoints";
import * as fetchFunctions from "./vesselVerbose.fetch";
import type {
  VesselVerboseByIdInput,
  VesselVerboseInput,
} from "./vesselVerbose.input";
import type { VesselVerbose } from "./vesselVerbose.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  vesselVerboseResource,
  fetchFunctions
);

export const useVesselsVerbose: (
  params?: VesselVerboseInput,
  options?: QueryHookOptions<VesselVerbose[]>
) => UseQueryResult<VesselVerbose[], Error> = hooks.useVesselsVerbose;

export const useVesselsVerboseByVesselId: (
  params?: VesselVerboseByIdInput,
  options?: QueryHookOptions<VesselVerbose>
) => UseQueryResult<VesselVerbose, Error> = hooks.useVesselsVerboseByVesselId;
