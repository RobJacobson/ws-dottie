import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
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

export const fetchVesselBasics: (
  params?: FetchFunctionParams<VesselBasicsInput>
) => Promise<VesselBasic[]> = fetchFunctions.fetchVesselBasics;

export const fetchVesselBasicsByVesselId: (
  params?: FetchFunctionParams<VesselBasicsByIdInput>
) => Promise<VesselBasic> = fetchFunctions.fetchVesselBasicsByVesselId;
