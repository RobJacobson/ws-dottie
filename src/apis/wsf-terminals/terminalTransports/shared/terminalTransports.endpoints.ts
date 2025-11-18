import type { EndpointGroupMeta } from "@/apis/types";
import { terminalTransportsMeta } from "../terminalTransports";
import { terminalTransportsByTerminalIdMeta } from "../terminalTransportsByTerminalId";

/**
 * Endpoint group metadata for terminal transports endpoints
 */
export const terminalTransportsGroup: EndpointGroupMeta = {
  name: "terminal-transports",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Transportation options and parking information for terminals.",
    description:
      "Commuter information for Washington State Ferry terminals including parking details, vehicle-specific tips (motorcycle, truck, bike), airport information, transit links, and HOV/carpool information. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display parking information and rates for terminal planning.",
      "Provide vehicle-specific tips for motorcycles, trucks, and bicycles.",
      "Show transit links and airport connection information.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the terminal transports group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const terminalTransportsEndpoints = {
  terminalTransports: terminalTransportsMeta,
  terminalTransportsByTerminalId: terminalTransportsByTerminalIdMeta,
} as const;
