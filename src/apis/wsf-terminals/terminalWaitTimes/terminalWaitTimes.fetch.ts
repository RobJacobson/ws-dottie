import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalWaitTimesResource } from "./terminalWaitTimes.endpoints";
import type {
  TerminalWaitTimesByIdInput,
  TerminalWaitTimesInput,
} from "./terminalWaitTimes.input";
import type { TerminalWaitTime } from "./terminalWaitTimes.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalWaitTimesResource
);

export const fetchTerminalWaitTimes = fetchFunctions.fetchTerminalWaitTimes as (
  params?: FetchFunctionParams<TerminalWaitTimesInput>
) => Promise<TerminalWaitTime[]>;

export const fetchTerminalWaitTimesByTerminalId =
  fetchFunctions.fetchTerminalWaitTimesByTerminalId as (
    params?: FetchFunctionParams<TerminalWaitTimesByIdInput>
  ) => Promise<TerminalWaitTime>;
