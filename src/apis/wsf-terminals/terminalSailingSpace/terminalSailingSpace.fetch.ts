import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfTerminalsApi } from "../apiDefinition";
import { terminalSailingSpaceResource } from "./terminalSailingSpace.endpoints";
import type {
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpaceInput,
} from "./terminalSailingSpace.input";
import type { TerminalSailingSpace } from "./terminalSailingSpace.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfTerminalsApi,
  terminalSailingSpaceResource
);

export const fetchTerminalSailingSpace: (
  params?: FetchFunctionParams<TerminalSailingSpaceInput>
) => Promise<TerminalSailingSpace[]> = fetchFunctions.fetchTerminalSailingSpace;

export const fetchTerminalSailingSpaceByTerminalId: (
  params?: FetchFunctionParams<TerminalSailingSpaceByTerminalIdInput>
) => Promise<TerminalSailingSpace> = fetchFunctions.fetchTerminalSailingSpaceByTerminalId;
