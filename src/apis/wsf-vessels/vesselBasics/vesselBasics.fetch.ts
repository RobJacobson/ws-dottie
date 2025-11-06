import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselBasicsResource } from "./vesselBasics.endpoints";
import type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics.input";
import type { VesselBasic } from "./vesselBasics.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfVesselsApi,
  vesselBasicsResource
);

export const fetchVesselBasics = fetchFunctions.fetchVesselBasics as (
  params?: FetchFunctionParams<VesselBasicsInput>
) => Promise<VesselBasic[]>;

export const fetchVesselBasicsByVesselId =
  fetchFunctions.fetchVesselBasicsByVesselId as (
    params?: FetchFunctionParams<VesselBasicsByIdInput>
  ) => Promise<VesselBasic>;
