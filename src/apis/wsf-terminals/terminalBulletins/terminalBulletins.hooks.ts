import {
  fetchTerminalBulletins,
  fetchTerminalBulletinsByTerminalId,
} from "./terminalBulletins.endpoints";

export const useTerminalBulletins = fetchTerminalBulletins.useQuery;
export const useTerminalBulletinsByTerminalId =
  fetchTerminalBulletinsByTerminalId.useQuery;
