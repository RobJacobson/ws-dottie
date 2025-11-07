import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotBridgeClearancesApi } from "../apiDefinition";
import { bridgeClearancesGroup } from "./bridgeClearances.endpoints";
import type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances.input";
import type { BridgeClearance } from "./bridgeClearances.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotBridgeClearancesApi,
  bridgeClearancesGroup
);

export const fetchBridgeClearances: (
  params?: FetchFunctionParams<BridgeClearancesInput>
) => Promise<BridgeClearance[]> = fetchFunctions.fetchBridgeClearances;

export const fetchBridgeClearancesByRoute: (
  params?: FetchFunctionParams<BridgeClearancesByRouteInput>
) => Promise<BridgeClearance[]> = fetchFunctions.fetchBridgeClearancesByRoute;
