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

export const fetchTerminalVerbose: (
  params?: FetchFunctionParams<TerminalVerboseInput>
) => Promise<TerminalVerbose[]> = fetchFunctions.fetchTerminalVerbose;

export const fetchTerminalVerboseByTerminalId: (
  params?: FetchFunctionParams<TerminalVerboseByTerminalIdInput>
) => Promise<TerminalVerbose> = fetchFunctions.fetchTerminalVerboseByTerminalId;
