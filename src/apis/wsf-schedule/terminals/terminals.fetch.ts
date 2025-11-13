import * as endpoints from "./terminals.endpoints";

export const fetchTerminals = endpoints.fetchTerminals.fetch;

export const fetchTerminalsAndMates = endpoints.fetchTerminalsAndMates.fetch;

export const fetchTerminalsAndMatesByRoute =
  endpoints.fetchTerminalsAndMatesByRoute.fetch;
