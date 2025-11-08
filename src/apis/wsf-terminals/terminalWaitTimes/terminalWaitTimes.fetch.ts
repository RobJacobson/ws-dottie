import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { terminalWaitTimesResource } from "./terminalWaitTimes.endpoints";
import type {
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./terminalWaitTimes.input";
import type { TerminalWaitTime } from "./terminalWaitTimes.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalWaitTimesResource
);

export const fetchTerminalWaitTimes: (
  params?: FetchFunctionParams<TerminalWaitTimesInput>
) => Promise<TerminalWaitTime[]> = fetchFunctions.fetchTerminalWaitTimes;

export const fetchTerminalWaitTimesByTerminalId: (
  params?: FetchFunctionParams<TerminalWaitTimesByIdInput>
) => Promise<TerminalWaitTime> =
  fetchFunctions.fetchTerminalWaitTimesByTerminalId;
