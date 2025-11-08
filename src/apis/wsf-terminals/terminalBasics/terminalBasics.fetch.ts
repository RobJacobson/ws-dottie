import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { terminalBasicsResource } from "./terminalBasics.endpoints";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalBasicsResource
);

export const fetchTerminalBasics: (
  params?: FetchFunctionParams<TerminalBasicsInput>
) => Promise<TerminalBasic[]> = fetchFunctions.fetchTerminalBasics;

export const fetchTerminalBasicsByTerminalId: (
  params?: FetchFunctionParams<TerminalBasicsByIdInput>
) => Promise<TerminalBasic> = fetchFunctions.fetchTerminalBasicsByTerminalId;
