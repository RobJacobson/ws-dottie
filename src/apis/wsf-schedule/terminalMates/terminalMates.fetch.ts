import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { wsfScheduleApi } from "@/apis/wsf-schedule/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleTerminalMatesResource
);

export const fetchTerminalMatesSchedule: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalMatesSchedule;
