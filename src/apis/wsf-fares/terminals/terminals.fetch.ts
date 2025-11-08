import type {
  TerminalMatesInput,
  TerminalsInput,
} from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { terminalsGroup } from "./terminals.endpoints";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  terminalsGroup
);

export const fetchTerminalFares: (
  params?: FetchFunctionParams<TerminalsInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalFares;

export const fetchTerminalMatesFares: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalMatesFares;
