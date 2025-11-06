import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalSailingSpaceResource } from "./terminalSailingSpace.endpoints";
import * as fetchFunctions from "./terminalSailingSpace.fetch";
import type {
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpaceInput,
} from "./terminalSailingSpace.input";
import type { TerminalSailingSpace } from "./terminalSailingSpace.output";

const hooks = createEndpointGroupHooks(
  wsfTerminalsApi,
  terminalSailingSpaceResource,
  fetchFunctions
);

export const useTerminalSailingSpace = hooks.useTerminalSailingSpace as (
  params?: TerminalSailingSpaceInput,
  options?: QueryHookOptions<TerminalSailingSpace[]>
) => UseQueryResult<TerminalSailingSpace[], Error>;

export const useTerminalSailingSpaceByTerminalId =
  hooks.useTerminalSailingSpaceByTerminalId as (
    params?: TerminalSailingSpaceByTerminalIdInput,
    options?: QueryHookOptions<TerminalSailingSpace>
  ) => UseQueryResult<TerminalSailingSpace, Error>;
