import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfTerminalsApi } from "@/apis/wsf-terminals/apiDefinition";
import { terminalSailingSpaceResource } from "./terminalSailingSpace.endpoints";
import type {
  TerminalSailingSpaceByTerminalIdInput,
  TerminalSailingSpaceInput,
} from "./terminalSailingSpace.input";
import type { TerminalSailingSpace } from "./terminalSailingSpace.output";

const fetchFunctions = createFetchFunctions(
  wsfTerminalsApi,
  terminalSailingSpaceResource
);

export const fetchTerminalSailingSpace: (
  params?: FetchFunctionParams<TerminalSailingSpaceInput>
) => Promise<TerminalSailingSpace[]> = fetchFunctions.fetchTerminalSailingSpace;

export const fetchTerminalSailingSpaceByTerminalId: (
  params?: FetchFunctionParams<TerminalSailingSpaceByTerminalIdInput>
) => Promise<TerminalSailingSpace> =
  fetchFunctions.fetchTerminalSailingSpaceByTerminalId;
