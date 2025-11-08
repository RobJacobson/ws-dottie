import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  terminalComboGroup,
  fetchFunctions
);

export const useTerminalComboFares: (
  params?: TerminalComboInput,
  options?: QueryHookOptions<TerminalComboFares>
) => UseQueryResult<TerminalComboFares, Error> = hooks.useTerminalComboFares;

export const useTerminalComboFaresVerbose: (
  params?: TerminalComboFaresVerboseInput,
  options?: QueryHookOptions<TerminalComboFaresVerbose[]>
) => UseQueryResult<TerminalComboFaresVerbose[], Error> =
  hooks.useTerminalComboFaresVerbose;
