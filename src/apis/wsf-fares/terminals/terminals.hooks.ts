import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { terminalsGroup } from "./terminals.endpoints";
import * as fetchFunctions from "./terminals.fetch";
import type {
  FaresTerminalsInput,
  TerminalMatesInput,
} from "./terminals.input";
import type { Terminal } from "./terminals.output";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  terminalsGroup,
  fetchFunctions
);

export const useFaresTerminals: (
  params?: FaresTerminalsInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useFaresTerminals;

export const useTerminalMates: (
  params?: TerminalMatesInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error> = hooks.useTerminalMates;
