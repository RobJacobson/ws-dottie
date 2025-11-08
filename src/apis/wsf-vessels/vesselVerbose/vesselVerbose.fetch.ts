import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { vesselVerboseResource } from "./vesselVerbose.endpoints";
import type {
  VesselVerboseByIdInput,
  VesselVerboseInput,
} from "./vesselVerbose.input";
import type { VesselVerbose } from "./vesselVerbose.output";

const fetchFunctions = createFetchFunctions(
  wsfVesselsApi,
  vesselVerboseResource
);

export const fetchVesselsVerbose: (
  params?: FetchFunctionParams<VesselVerboseInput>
) => Promise<VesselVerbose[]> = fetchFunctions.fetchVesselsVerbose;

export const fetchVesselsVerboseByVesselId: (
  params?: FetchFunctionParams<VesselVerboseByIdInput>
) => Promise<VesselVerbose> = fetchFunctions.fetchVesselsVerboseByVesselId;
