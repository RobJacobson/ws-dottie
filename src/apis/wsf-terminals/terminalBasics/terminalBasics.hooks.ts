import type { UseQueryResult } from "@tanstack/react-query";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { terminalBasicsResource } from "./terminalBasics.endpoints";
import * as fetchFunctions from "./terminalBasics.fetch";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalBasicsResource,
  fetchFunctions
);

export const useTerminalBasics: (
  params?: FetchFunctionParams<TerminalBasicsInput>,
  options?: QueryHookOptions<TerminalBasic[]>
) => UseQueryResult<TerminalBasic[], Error> = hooks.useTerminalBasics;

export const useTerminalBasicsByTerminalId: (
  params?: FetchFunctionParams<TerminalBasicsByIdInput>,
  options?: QueryHookOptions<TerminalBasic>
) => UseQueryResult<TerminalBasic, Error> = hooks.useTerminalBasicsByTerminalId;
