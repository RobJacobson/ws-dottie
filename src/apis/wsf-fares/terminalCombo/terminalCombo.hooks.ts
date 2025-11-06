import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { terminalComboGroup } from "./terminalCombo.endpoints";
import * as fetchFunctions from "./terminalCombo.fetch";
import type {
  TerminalComboInput,
  TerminalComboVerboseInput,
} from "./terminalCombo.input";
import type {
  TerminalCombo,
  TerminalComboVerbose,
} from "./terminalCombo.output";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  terminalComboGroup,
  fetchFunctions
);

export const useTerminalCombo = hooks.useTerminalCombo as (
  params?: TerminalComboInput,
  options?: QueryHookOptions<TerminalCombo>
) => UseQueryResult<TerminalCombo, Error>;

export const useTerminalComboVerbose = hooks.useTerminalComboVerbose as (
  params?: TerminalComboVerboseInput,
  options?: QueryHookOptions<TerminalComboVerbose[]>
) => UseQueryResult<TerminalComboVerbose[], Error>;
