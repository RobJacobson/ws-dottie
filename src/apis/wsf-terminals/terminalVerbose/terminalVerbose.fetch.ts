import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalVerboseResource } from "./terminalVerbose.endpoints";
import type {
  TerminalVerboseByTerminalIdInput,
  TerminalVerboseInput,
} from "./terminalVerbose.input";
import type { TerminalVerbose } from "./terminalVerbose.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalVerboseResource
);

export const fetchTerminalVerbose = fetchFunctions.fetchTerminalVerbose as (
  params?: FetchFunctionParams<TerminalVerboseInput>
) => Promise<TerminalVerbose[]>;

export const fetchTerminalVerboseByTerminalId =
  fetchFunctions.fetchTerminalVerboseByTerminalId as (
    params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>
  ) => Promise<TerminalVerbose>;
