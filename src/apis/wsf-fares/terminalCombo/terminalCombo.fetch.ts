import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import { terminalComboGroup } from "./terminalCombo.endpoints";
import type {
  TerminalComboFaresVerboseInput,
  TerminalComboInput,
} from "./terminalCombo.input";
import type {
  TerminalComboFares,
  TerminalComboFaresVerbose,
} from "./terminalCombo.output";

const fetchFunctions = createFetchFunctions(wsfFaresApi, terminalComboGroup);

export const fetchTerminalComboFares: (
  params?: FetchFunctionParams<TerminalComboInput>
) => Promise<TerminalComboFares> = fetchFunctions.fetchTerminalComboFares;

export const fetchTerminalComboFaresVerbose: (
  params?: FetchFunctionParams<TerminalComboFaresVerboseInput>
) => Promise<TerminalComboFaresVerbose[]> =
  fetchFunctions.fetchTerminalComboFaresVerbose;
