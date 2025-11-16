import {
  fetchTerminals,
  fetchTerminalsAndMates,
  fetchTerminalsAndMatesByRoute,
} from "./terminals.endpoints";

export const useTerminals = fetchTerminals.useQuery;

export const useTerminalsAndMates = fetchTerminalsAndMates.useQuery;

export const useTerminalsAndMatesByRoute =
  fetchTerminalsAndMatesByRoute.useQuery;
