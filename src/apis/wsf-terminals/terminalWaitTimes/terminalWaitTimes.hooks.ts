import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { terminalWaitTimesResource } from "./terminalWaitTimes.endpoints";
import * as fetchFunctions from "./terminalWaitTimes.fetch";
import type {
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./terminalWaitTimes.input";
import type { TerminalWaitTime } from "./terminalWaitTimes.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalWaitTimesResource,
  fetchFunctions
);

export const useTerminalWaitTimes: (
  params?: FetchFunctionParams<TerminalWaitTimesInput>,
  options?: QueryHookOptions<TerminalWaitTime[]>
) => UseQueryResult<TerminalWaitTime[], Error> = hooks.useTerminalWaitTimes;

export const useTerminalWaitTimesByTerminalId: (
  params?: FetchFunctionParams<TerminalWaitTimesByIdInput>,
  options?: QueryHookOptions<TerminalWaitTime>
) => UseQueryResult<TerminalWaitTime, Error> =
  hooks.useTerminalWaitTimesByTerminalId;
