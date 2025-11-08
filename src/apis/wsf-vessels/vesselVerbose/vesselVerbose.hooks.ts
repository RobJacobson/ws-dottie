import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselVerboseResource } from "./vesselVerbose.endpoints";
import * as fetchFunctions from "./vesselVerbose.fetch";
import type {
  VesselVerboseByIdInput,
  VesselVerboseInput,
} from "./vesselVerbose.input";
import type { VesselVerbose } from "./vesselVerbose.output";

const hooks = createHooks(wsfVesselsApi, vesselVerboseResource, fetchFunctions);

export const useVesselsVerbose: (
  params?: FetchFunctionParams<VesselVerboseInput>,
  options?: QueryHookOptions<VesselVerbose[]>
) => UseQueryResult<VesselVerbose[], Error> = hooks.useVesselsVerbose;

export const useVesselsVerboseByVesselId: (
  params?: FetchFunctionParams<VesselVerboseByIdInput>,
  options?: QueryHookOptions<VesselVerbose>
) => UseQueryResult<VesselVerbose, Error> = hooks.useVesselsVerboseByVesselId;
