import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalWaitTimesResource } from "./terminalWaitTimes.endpoints";
import * as fetchFunctions from "./terminalWaitTimes.fetch";
import type {
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./terminalWaitTimes.input";
import type { TerminalWaitTime } from "./terminalWaitTimes.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalWaitTimesResource,
  fetchFunctions
);

export const useTerminalWaitTimes: (
  params?: TerminalWaitTimesInput,
  options?: QueryHookOptions<TerminalWaitTime[]>
) => UseQueryResult<TerminalWaitTime[], Error> = hooks.useTerminalWaitTimes;

export const useTerminalWaitTimesByTerminalId: (
  params?: TerminalWaitTimesByIdInput,
  options?: QueryHookOptions<TerminalWaitTime>
) => UseQueryResult<TerminalWaitTime, Error> = hooks.useTerminalWaitTimesByTerminalId;
