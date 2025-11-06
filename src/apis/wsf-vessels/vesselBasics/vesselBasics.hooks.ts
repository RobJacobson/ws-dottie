import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useVesselBasics = hooks.useVesselBasics as (
  params?: VesselBasicsInput,
  options?: QueryHookOptions<VesselBasic[]>
) => UseQueryResult<VesselBasic[], Error>;

export const useVesselBasicsByVesselId = hooks.useVesselBasicsByVesselId as (
  params?: VesselBasicsByIdInput,
  options?: QueryHookOptions<VesselBasic>
) => UseQueryResult<VesselBasic, Error>;
