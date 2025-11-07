import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { terminalComboGroup } from "./terminalCombo.endpoints";
import type {
  TerminalComboInput,
  TerminalComboVerboseInput,
} from "./terminalCombo.input";
import type {
  TerminalCombo,
  TerminalComboVerbose,
} from "./terminalCombo.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  terminalComboGroup
);

export const fetchTerminalCombo: (
  params?: FetchFunctionParams<TerminalComboInput>
) => Promise<TerminalCombo> = fetchFunctions.fetchTerminalCombo;

export const fetchTerminalComboVerbose: (
  params?: FetchFunctionParams<TerminalComboVerboseInput>
) => Promise<TerminalComboVerbose[]> = fetchFunctions.fetchTerminalComboVerbose;
