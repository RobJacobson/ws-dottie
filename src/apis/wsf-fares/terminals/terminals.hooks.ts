import type { UseQueryResult } from "@tanstack/react-query";
import type {
  TerminalMatesInput,
  TerminalsInput,
} from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { terminalsGroup } from "./terminals.endpoints";
import * as fetchFunctions from "./terminals.fetch";

const hooks = createHooks(wsfFaresApi, terminalsGroup, fetchFunctions);

export const useTerminalsFares: (
  params?: FetchFunctionParams<TerminalsInput>,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalFares;

export const useTerminalMatesFares: (
  params?: FetchFunctionParams<TerminalMatesInput>,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalMatesFares;
