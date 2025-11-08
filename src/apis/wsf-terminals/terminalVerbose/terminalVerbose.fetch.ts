import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { terminalVerboseResource } from "./terminalVerbose.endpoints";
import type {
  TerminalVerboseByTerminalIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose.input";
import type { TerminalVerbose } from "./terminalVerbose.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalVerboseResource
);

export const fetchTerminalVerbose: (
  params?: FetchFunctionParams<TerminalVerboseInput>
) => Promise<TerminalVerbose[]> = fetchFunctions.fetchTerminalVerbose;

export const fetchTerminalVerboseByTerminalId: (
  params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>
) => Promise<TerminalVerbose> = fetchFunctions.fetchTerminalVerboseByTerminalId;
