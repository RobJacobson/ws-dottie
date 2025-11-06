import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
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

export const fetchTerminalSailingSpace =
  fetchFunctions.fetchTerminalSailingSpace as (
    params?: FetchFunctionParams<TerminalSailingSpaceInput>
  ) => Promise<TerminalSailingSpace[]>;

export const fetchTerminalSailingSpaceByTerminalId =
  fetchFunctions.fetchTerminalSailingSpaceByTerminalId as (
    params?: FetchFunctionParams<TerminalSailingSpaceByTerminalIdInput>
  ) => Promise<TerminalSailingSpace>;
