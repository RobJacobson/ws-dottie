import type { TerminalMatesInput } from "@/apis/shared/terminals.input";
import type { Terminal } from "@/apis/shared/terminals.output";
import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleTerminalMatesResource
);

export const fetchTerminalMates: (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]> = fetchFunctions.fetchTerminalMatesSchedule;
