import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";

const fetchFunctions = createFetchFunctions(
  wsfScheduleApi,
  scheduleTerminalMatesResource
);

export const fetchTerminalMates: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalMatesSchedule;
