import {
  fetchTerminalBasics,
  fetchTerminalBasicsByTerminalId,
} from "./terminalBasics.endpoints";

export const useTerminalBasics = fetchTerminalBasics.useQuery;
export const useTerminalBasicsByTerminalId =
  fetchTerminalBasicsByTerminalId.useQuery;
