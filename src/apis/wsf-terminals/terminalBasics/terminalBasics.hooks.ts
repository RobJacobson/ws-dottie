import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useTerminalBasics = hooks.useTerminalBasics as (
  params?: TerminalBasicsInput,
  options?: QueryHookOptions<TerminalBasic[]>
) => UseQueryResult<TerminalBasic[], Error>;

export const useTerminalBasicsByTerminalId =
  hooks.useTerminalBasicsByTerminalId as (
    params?: TerminalBasicsByIdInput,
    options?: QueryHookOptions<TerminalBasic>
  ) => UseQueryResult<TerminalBasic, Error>;
