import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useVesselsVerbose = hooks.useVesselsVerbose as (
  params?: VesselVerboseInput,
  options?: QueryHookOptions<VesselVerbose[]>
) => UseQueryResult<VesselVerbose[], Error>;

export const useVesselsVerboseByVesselId =
  hooks.useVesselsVerboseByVesselId as (
    params?: VesselVerboseByIdInput,
    options?: QueryHookOptions<VesselVerbose>
  ) => UseQueryResult<VesselVerbose, Error>;
