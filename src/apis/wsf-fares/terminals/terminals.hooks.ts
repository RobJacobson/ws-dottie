import type { UseQueryResult } from "@tanstack/react-query";
import type {
  TerminalMatesInput,
  TerminalsInput,
} from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { terminalsGroup } from "./terminals.endpoints";
import * as fetchFunctions from "./terminals.fetch";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  terminalsGroup,
  fetchFunctions
);

export const useTerminalsFares: (
  params?: TerminalsInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalFares;

export const useTerminalMatesFares: (
  params?: TerminalMatesInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalMatesFares;
