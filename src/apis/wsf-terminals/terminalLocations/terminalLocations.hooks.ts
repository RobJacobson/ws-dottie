import {
  fetchTerminalLocations,
  fetchTerminalLocationsByTerminalId,
} from "./terminalLocations.endpoints";

export const useTerminalLocations = fetchTerminalLocations.useQuery;
export const useTerminalLocationsByTerminalId =
  fetchTerminalLocationsByTerminalId.useQuery;
