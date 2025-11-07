import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBasicsResource } from "./terminalBasics.endpoints";
import * as fetchFunctions from "./terminalBasics.fetch";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalBasicsResource,
  fetchFunctions
);

export const useTerminalBasics: (
  params?: TerminalBasicsInput,
  options?: QueryHookOptions<TerminalBasic[]>
) => UseQueryResult<TerminalBasic[], Error> = hooks.useTerminalBasics;

export const useTerminalBasicsByTerminalId: (
  params?: TerminalBasicsByIdInput,
  options?: QueryHookOptions<TerminalBasic>
) => UseQueryResult<TerminalBasic, Error> = hooks.useTerminalBasicsByTerminalId;
