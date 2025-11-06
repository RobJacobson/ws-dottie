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

export const fetchTerminalCombo = fetchFunctions.fetchTerminalCombo as (
  params?: FetchFunctionParams<TerminalComboInput>
) => Promise<TerminalCombo>;

export const fetchTerminalComboVerbose =
  fetchFunctions.fetchTerminalComboVerbose as (
    params?: FetchFunctionParams<TerminalComboVerboseInput>
  ) => Promise<TerminalComboVerbose[]>;
