import type { UseQueryResult } from "@tanstack/react-query";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { terminalVerboseResource } from "./terminalVerbose.endpoints";
import * as fetchFunctions from "./terminalVerbose.fetch";
import type {
  TerminalVerboseByTerminalIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose.input";
import type { TerminalVerbose } from "./terminalVerbose.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalVerboseResource,
  fetchFunctions
);

export const useTerminalVerbose: (
  params?: FetchFunctionParams<TerminalVerboseInput>,
  options?: QueryHookOptions<TerminalVerbose[]>
) => UseQueryResult<TerminalVerbose[], Error> = hooks.useTerminalVerbose;

export const useTerminalVerboseByTerminalId: (
  params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>,
  options?: QueryHookOptions<TerminalVerbose>
) => UseQueryResult<TerminalVerbose, Error> =
  hooks.useTerminalVerboseByTerminalId;
