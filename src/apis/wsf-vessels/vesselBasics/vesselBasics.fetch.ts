import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import { vesselBasicsResource } from "./vesselBasics.endpoints";
import type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics.input";
import type { VesselBasic } from "./vesselBasics.output";

const fetchFunctions = createFetchFunctions(
  wsfVesselsApi,
  vesselBasicsResource
);

export const fetchVesselBasics: (
  params?: FetchFunctionParams<VesselBasicsInput>
) => Promise<VesselBasic[]> = fetchFunctions.fetchVesselBasics;

export const fetchVesselBasicsByVesselId: (
  params?: FetchFunctionParams<VesselBasicsByIdInput>
) => Promise<VesselBasic> = fetchFunctions.fetchVesselBasicsByVesselId;
