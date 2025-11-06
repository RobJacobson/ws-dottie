import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";
import * as fetchFunctions from "./terminalMates.fetch";
import type { TerminalMatesInput } from "./terminalMates.input";
import type { Terminal } from "./terminalMates.output";

const hooks = createEndpointGroupHooks(
  wsfScheduleApi,
  scheduleTerminalMatesResource,
  fetchFunctions
);

export const useTerminalMates = hooks.useTerminalMates as (
  params?: TerminalMatesInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error>;
