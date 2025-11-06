import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalBasicsResource } from "./terminalBasics.endpoints";
import type {
  TerminalBasicsByIdInput,
  TerminalBasicsInput,
} from "./terminalBasics.input";
import type { TerminalBasic } from "./terminalBasics.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalBasicsResource
);

export const fetchTerminalBasics = fetchFunctions.fetchTerminalBasics as (
  params?: FetchFunctionParams<TerminalBasicsInput>
) => Promise<TerminalBasic[]>;

export const fetchTerminalBasicsByTerminalId =
  fetchFunctions.fetchTerminalBasicsByTerminalId as (
    params?: FetchFunctionParams<TerminalBasicsByIdInput>
  ) => Promise<TerminalBasic>;
