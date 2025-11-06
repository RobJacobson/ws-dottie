import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfScheduleApi } from "../apiDefinition";
import { scheduleTerminalMatesResource } from "./terminalMates.endpoints";
import type { TerminalMatesInput } from "./terminalMates.input";
import type { Terminal } from "./terminalMates.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfScheduleApi,
  scheduleTerminalMatesResource
);

export const fetchTerminalMates = fetchFunctions.fetchTerminalMates as (
  params?: FetchFunctionParams<TerminalMatesInput>
) => Promise<Terminal[]>;
