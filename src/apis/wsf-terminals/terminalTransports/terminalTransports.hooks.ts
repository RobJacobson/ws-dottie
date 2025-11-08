import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { terminalTransportsResource } from "./terminalTransports.endpoints";
import * as fetchFunctions from "./terminalTransports.fetch";
import type {
  TerminalTransportsByTerminalIdInput,
  TerminalTransportsInput,
} from "./terminalTransports.input";
import type { TerminalTransport } from "./terminalTransports.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalTransportsResource,
  fetchFunctions
);

export const useTerminalTransports: (
  params?: FetchFunctionParams<TerminalTransportsInput>,
  options?: QueryHookOptions<TerminalTransport[]>
) => UseQueryResult<TerminalTransport[], Error> = hooks.useTerminalTransports;

export const useTerminalTransportsByTerminalId: (
  params?: FetchFunctionParams<TerminalTransportsByTerminalIdInput>,
  options?: QueryHookOptions<TerminalTransport>
) => UseQueryResult<TerminalTransport, Error> =
  hooks.useTerminalTransportsByTerminalId;
