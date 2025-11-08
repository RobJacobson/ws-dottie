import type { UseQueryResult } from "@tanstack/react-query";
import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";
import * as fetchFunctions from "./terminalMates.fetch";

const hooks = createHooks(
  wsfScheduleApi,
  scheduleTerminalMatesResource,
  fetchFunctions
);

export const useTerminalMatesSchedule: (
  params?: FetchFunctionParams<TerminalMatesInput>,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalMatesSchedule;
