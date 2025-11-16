import {
  fetchTerminalWaitTimes,
  fetchTerminalWaitTimesByTerminalId,
} from "./terminalWaitTimes.endpoints";

export const useTerminalWaitTimes = fetchTerminalWaitTimes.useQuery;
export const useTerminalWaitTimesByTerminalId =
  fetchTerminalWaitTimesByTerminalId.useQuery;
