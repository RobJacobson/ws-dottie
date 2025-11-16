import {
  fetchTerminalSailingSpace,
  fetchTerminalSailingSpaceByTerminalId,
} from "./terminalSailingSpace.endpoints";

export const useTerminalSailingSpace = fetchTerminalSailingSpace.useQuery;
export const useTerminalSailingSpaceByTerminalId =
  fetchTerminalSailingSpaceByTerminalId.useQuery;
