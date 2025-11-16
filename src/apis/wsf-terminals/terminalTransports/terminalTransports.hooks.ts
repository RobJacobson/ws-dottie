import {
  fetchTerminalTransports,
  fetchTerminalTransportsByTerminalId,
} from "./terminalTransports.endpoints";

export const useTerminalTransports = fetchTerminalTransports.useQuery;
export const useTerminalTransportsByTerminalId =
  fetchTerminalTransportsByTerminalId.useQuery;
