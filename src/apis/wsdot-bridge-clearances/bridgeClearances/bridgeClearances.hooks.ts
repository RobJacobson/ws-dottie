import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

export const useBridgeClearances: (
  params?: BridgeClearancesInput,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error> = hooks.useBridgeClearances;

export const useBridgeClearancesByRoute: (
  params?: BridgeClearancesByRouteInput,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error> = hooks.useBridgeClearancesByRoute;
