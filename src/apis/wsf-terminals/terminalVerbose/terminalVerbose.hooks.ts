import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalVerboseResource } from "./terminalVerbose.endpoints";
import * as fetchFunctions from "./terminalVerbose.fetch";
import type {
  TerminalVerboseByTerminalIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose.input";
import type { TerminalVerbose } from "./terminalVerbose.output";

const hooks = createHooks(
  wsfTerminalsApi,
  terminalVerboseResource,
  fetchFunctions
);

export const useTerminalVerbose: (
  params?: FetchFunctionParams<TerminalVerboseInput>,
  options?: QueryHookOptions<TerminalVerbose[]>
) => UseQueryResult<TerminalVerbose[], Error> = hooks.useTerminalVerbose;

export const useTerminalVerboseByTerminalId: (
  params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>,
  options?: QueryHookOptions<TerminalVerbose>
) => UseQueryResult<TerminalVerbose, Error> =
  hooks.useTerminalVerboseByTerminalId;
