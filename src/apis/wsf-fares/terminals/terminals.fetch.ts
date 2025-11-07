import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { terminalsGroup } from "./terminals.endpoints";
import type {
  FaresTerminalsInput,
  TerminalMatesInput,
} from "./terminals.input";
import type { Terminal } from "./terminals.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  terminalsGroup
);

export const fetchFaresTerminals: (
  params?: FetchFunctionParams<FaresTerminalsInput>
) => Promise<Terminal[]> = fetchFunctions.fetchFaresTerminals;

export const fetchTerminalMates: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalMates;
