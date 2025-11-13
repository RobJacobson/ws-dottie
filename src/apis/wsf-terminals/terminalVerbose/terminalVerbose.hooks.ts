import {
  fetchTerminalVerbose,
  fetchTerminalVerboseByTerminalId,
} from "./terminalVerbose.endpoints";

export const useTerminalVerbose = fetchTerminalVerbose.useQuery;
export const useTerminalVerboseByTerminalId =
  fetchTerminalVerboseByTerminalId.useQuery;
