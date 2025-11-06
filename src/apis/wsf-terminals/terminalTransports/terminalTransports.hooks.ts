import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalTransportsResource } from "./terminalTransports.endpoints";
import * as fetchFunctions from "./terminalTransports.fetch";
import type {
  TerminalTransportsByTerminalIdInput,
  TerminalTransportsInput,
} from "./terminalTransports.input";
import type { TerminalTransport } from "./terminalTransports.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalTransportsResource,
  fetchFunctions
);

export const useTerminalTransports = hooks.useTerminalTransports as (
  params?: TerminalTransportsInput,
  options?: QueryHookOptions<TerminalTransport[]>
) => UseQueryResult<TerminalTransport[], Error>;

export const useTerminalTransportsByTerminalId =
  hooks.useTerminalTransportsByTerminalId as (
    params?: TerminalTransportsByTerminalIdInput,
    options?: QueryHookOptions<TerminalTransport>
  ) => UseQueryResult<TerminalTransport, Error>;
