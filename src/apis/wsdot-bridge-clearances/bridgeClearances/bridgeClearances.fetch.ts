import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotBridgeClearancesApi } from "../apiDefinition";
import { bridgeClearancesGroup } from "./bridgeClearances.endpoints";
import type {
  BridgeClearancesByRouteInput,
  BridgeClearancesInput,
} from "./bridgeClearances.input";
import type { BridgeClearance } from "./bridgeClearances.output";

const fetchFunctions = createFetchFunctions(
  wsdotBridgeClearancesApi,
  bridgeClearancesGroup
);

export const fetchBridgeClearances: (
  params?: FetchFunctionParams<BridgeClearancesInput>
) => Promise<BridgeClearance[]> = fetchFunctions.fetchBridgeClearances;

export const fetchBridgeClearancesByRoute: (
  params?: FetchFunctionParams<BridgeClearancesByRouteInput>
) => Promise<BridgeClearance[]> = fetchFunctions.fetchBridgeClearancesByRoute;
