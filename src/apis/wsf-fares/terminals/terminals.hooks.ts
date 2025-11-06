import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
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

export const useFaresTerminals = hooks.useFaresTerminals as (
  params?: FaresTerminalsInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error>;

export const useTerminalMates = hooks.useTerminalMates as (
  params?: TerminalMatesInput,
  options?: QueryHookOptions<Terminal[]>
) => UseQueryResult<Terminal[], Error>;
