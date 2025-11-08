import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
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

export const useTerminalSailingSpace: (
  params?: TerminalSailingSpaceInput,
  options?: QueryHookOptions<TerminalSailingSpace[]>
) => UseQueryResult<TerminalSailingSpace[], Error> =
  hooks.useTerminalSailingSpace;

export const useTerminalSailingSpaceByTerminalId: (
  params?: TerminalSailingSpaceByTerminalIdInput,
  options?: QueryHookOptions<TerminalSailingSpace>
) => UseQueryResult<TerminalSailingSpace, Error> =
  hooks.useTerminalSailingSpaceByTerminalId;
