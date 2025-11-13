import {
  fetchTerminalFares,
  fetchTerminalMatesFares,
} from "./terminals.endpoints";

export const useTerminalsFares = fetchTerminalFares.useQuery;

export const useTerminalMatesFares = fetchTerminalMatesFares.useQuery;
