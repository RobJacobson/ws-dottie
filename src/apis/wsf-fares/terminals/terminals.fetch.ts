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

export const fetchFaresTerminals = fetchFunctions.fetchFaresTerminals as (
  params?: FetchFunctionParams<FaresTerminalsInput>
) => Promise<Terminal[]>;

export const fetchTerminalMates = fetchFunctions.fetchTerminalMates as (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]>;
