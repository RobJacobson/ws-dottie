import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

export const useTerminalTransports: (
  params?: TerminalTransportsInput,
  options?: QueryHookOptions<TerminalTransport[]>
) => UseQueryResult<TerminalTransport[], Error> = hooks.useTerminalTransports;

export const useTerminalTransportsByTerminalId: (
  params?: TerminalTransportsByTerminalIdInput,
  options?: QueryHookOptions<TerminalTransport>
) => UseQueryResult<TerminalTransport, Error> =
  hooks.useTerminalTransportsByTerminalId;
