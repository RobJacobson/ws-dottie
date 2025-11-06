import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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
