import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfTerminalsApi } from "../apiDefinition";
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
