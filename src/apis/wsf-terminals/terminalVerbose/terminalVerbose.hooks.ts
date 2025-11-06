import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalVerboseResource } from "./terminalVerbose.endpoints";
import * as fetchFunctions from "./terminalVerbose.fetch";
import type {
  TerminalVerboseByTerminalIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose.input";
import type { TerminalVerbose } from "./terminalVerbose.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalVerboseResource,
  fetchFunctions
);

export const useTerminalVerbose = hooks.useTerminalVerbose as (
  params?: TerminalVerboseInput,
  options?: QueryHookOptions<TerminalVerbose[]>
) => UseQueryResult<TerminalVerbose[], Error>;

export const useTerminalVerboseByTerminalId =
  hooks.useTerminalVerboseByTerminalId as (
    params?: TerminalVerboseByTerminalIdInput,
    options?: QueryHookOptions<TerminalVerbose>
  ) => UseQueryResult<TerminalVerbose, Error>;
