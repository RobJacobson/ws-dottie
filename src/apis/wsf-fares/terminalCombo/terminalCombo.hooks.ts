import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfFaresApi } from "../apiDefinition";
import { terminalComboGroup } from "./terminalCombo.endpoints";
import * as fetchFunctions from "./terminalCombo.fetch";
import type {
  TerminalComboFaresVerboseInput,
  TerminalComboInput,
} from "./terminalCombo.input";
import type {
  TerminalComboFares,
  TerminalComboFaresVerbose,
} from "./terminalCombo.output";

const hooks = createHooks(wsfFaresApi, terminalComboGroup, fetchFunctions);

export const useTerminalComboFares: (
  params?: FetchFunctionParams<TerminalComboInput>,
  options?: QueryHookOptions<TerminalComboFares>
) => UseQueryResult<TerminalComboFares, Error> = hooks.useTerminalComboFares;

export const useTerminalComboFaresVerbose: (
  params?: FetchFunctionParams<TerminalComboFaresVerboseInput>,
  options?: QueryHookOptions<TerminalComboFaresVerbose[]>
) => UseQueryResult<TerminalComboFaresVerbose[], Error> =
  hooks.useTerminalComboFaresVerbose;
