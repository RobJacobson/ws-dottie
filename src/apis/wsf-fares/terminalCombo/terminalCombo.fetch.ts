import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { terminalComboGroup } from "./terminalCombo.endpoints";
import type {
  TerminalComboFaresVerboseInput,
  TerminalComboInput,
} from "./terminalCombo.input";
import type {
  TerminalComboFares,
  TerminalComboFaresVerbose,
} from "./terminalCombo.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  terminalComboGroup
);

export const fetchTerminalCombo: (
  params?: FetchFunctionParams<TerminalComboInput>
) => Promise<TerminalComboFares> = fetchFunctions.fetchTerminalComboFares;

export const fetchTerminalComboVerbose: (
  params?: FetchFunctionParams<TerminalComboFaresVerboseInput>
) => Promise<TerminalComboFaresVerbose[]> =
  fetchFunctions.fetchTerminalComboFaresVerbose;
