import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { terminalSailingSpaceResource } from "./terminalSailingSpace.endpoints";
import * as fetchFunctions from "./terminalSailingSpace.fetch";
import type {
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpaceInput,
} from "./terminalSailingSpace.input";
import type { TerminalSailingSpace } from "./terminalSailingSpace.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalSailingSpaceResource,
  fetchFunctions
);

export const useTerminalSailingSpace: (
  params?: FetchFunctionParams<TerminalSailingSpaceInput>,
  options?: QueryHookOptions<TerminalSailingSpace[]>
) => UseQueryResult<TerminalSailingSpace[], Error> =
  hooks.useTerminalSailingSpace;

export const useTerminalSailingSpaceByTerminalId: (
  params?: FetchFunctionParams<TerminalSailingSpaceByTerminalIdInput>,
  options?: QueryHookOptions<TerminalSailingSpace>
) => UseQueryResult<TerminalSailingSpace, Error> =
  hooks.useTerminalSailingSpaceByTerminalId;
