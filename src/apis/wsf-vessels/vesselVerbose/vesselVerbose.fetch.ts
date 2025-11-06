import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselVerboseResource } from "./vesselVerbose.endpoints";
import type {
  VesselVerboseByIdInput,
  VesselVerboseInput,
} from "./vesselVerbose.input";
import type { VesselVerbose } from "./vesselVerbose.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  vesselVerboseResource
);

export const fetchVesselsVerbose = fetchFunctions.fetchVesselsVerbose as (
  params?: FetchFunctionParams<VesselVerboseInput>
) => Promise<VesselVerbose[]>;

export const fetchVesselsVerboseByVesselId =
  fetchFunctions.fetchVesselsVerboseByVesselId as (
    params?: FetchFunctionParams<VesselVerboseByIdInput>
  ) => Promise<VesselVerbose>;
