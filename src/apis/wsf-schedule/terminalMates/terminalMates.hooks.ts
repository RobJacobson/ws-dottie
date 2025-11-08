import type { UseQueryResult } from "@tanstack/react-query";
import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";
import * as fetchFunctions from "./terminalMates.fetch";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleTerminalMatesResource,
  fetchFunctions
);

export const useTerminalMatesSchedule: (
  params?: TerminalMatesInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalMatesSchedule;
