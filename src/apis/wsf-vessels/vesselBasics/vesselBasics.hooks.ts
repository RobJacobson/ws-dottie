import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfVesselsApi } from "@/apis/wsf-vessels/apiDefinition";
import { vesselBasicsResource } from "./vesselBasics.endpoints";
import * as fetchFunctions from "./vesselBasics.fetch";
import type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics.input";
import type { VesselBasic } from "./vesselBasics.output";

const hooks = createHooks(wsfVesselsApi, vesselBasicsResource, fetchFunctions);

export const useVesselBasics: (
  params?: FetchFunctionParams<VesselBasicsInput>,
  options?: QueryHookOptions<VesselBasic[]>
) => UseQueryResult<VesselBasic[], Error> = hooks.useVesselBasics;

export const useVesselBasicsByVesselId: (
  params?: FetchFunctionParams<VesselBasicsByIdInput>,
  options?: QueryHookOptions<VesselBasic>
) => UseQueryResult<VesselBasic, Error> = hooks.useVesselBasicsByVesselId;
