import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfVesselsApi } from "../apiDefinition";
import { vesselBasicsResource } from "./vesselBasics.endpoints";
import * as fetchFunctions from "./vesselBasics.fetch";
import type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics.input";
import type { VesselBasic } from "./vesselBasics.output";

const hooks = createEndpointGroupHooks(
  wsfVesselsApi,
  vesselBasicsResource,
  fetchFunctions
);

export const useVesselBasics: (
  params?: VesselBasicsInput,
  options?: QueryHookOptions<VesselBasic[]>
) => UseQueryResult<VesselBasic[], Error> = hooks.useVesselBasics;

export const useVesselBasicsByVesselId: (
  params?: VesselBasicsByIdInput,
  options?: QueryHookOptions<VesselBasic>
) => UseQueryResult<VesselBasic, Error> = hooks.useVesselBasicsByVesselId;
