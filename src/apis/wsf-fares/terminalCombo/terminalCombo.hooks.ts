import {
  fetchTerminalComboFares,
  fetchTerminalComboFaresVerbose,
} from "./terminalCombo.endpoints";

export const useTerminalComboFares = fetchTerminalComboFares.useQuery;

export const useTerminalComboFaresVerbose =
  fetchTerminalComboFaresVerbose.useQuery;
