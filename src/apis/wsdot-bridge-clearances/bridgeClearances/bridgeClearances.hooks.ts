import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotBridgeClearancesApi } from "../apiDefinition";
import { bridgeClearancesGroup } from "./bridgeClearances.endpoints";
import * as fetchFunctions from "./bridgeClearances.fetch";
import type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances.input";
import type { BridgeClearance } from "./bridgeClearances.output";

const hooks = createEndpointGroupHooks(
  wsdotBridgeClearancesApi,
  bridgeClearancesGroup,
  fetchFunctions
);

export const useBridgeClearances = hooks.useBridgeClearances as (
  params?: BridgeClearancesInput,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error>;

export const useBridgeClearancesByRoute = hooks.useBridgeClearancesByRoute as (
  params?: BridgeClearancesByRouteInput,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error>;
