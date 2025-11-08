import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotBridgeClearancesApi } from "@/apis/wsdot-bridge-clearances/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { bridgeClearancesGroup } from "./bridgeClearances.endpoints";
import * as fetchFunctions from "./bridgeClearances.fetch";
import type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances.input";
import type { BridgeClearance } from "./bridgeClearances.output";

const hooks = createHooks(
  wsdotBridgeClearancesApi,
  bridgeClearancesGroup,
  fetchFunctions
);

export const useBridgeClearances: (
  params?: FetchFunctionParams<BridgeClearancesInput>,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error> = hooks.useBridgeClearances;

export const useBridgeClearancesByRoute: (
  params?: FetchFunctionParams<BridgeClearancesByRouteInput>,
  options?: QueryHookOptions<BridgeClearance[]>
) => UseQueryResult<BridgeClearance[], Error> =
  hooks.useBridgeClearancesByRoute;
