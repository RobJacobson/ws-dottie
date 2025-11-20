import type { EndpointGroupMeta } from "@/apis/types";
import { terminalLocationsMeta } from "../terminalLocations";
import { terminalLocationsByTerminalIdMeta } from "../terminalLocationsByTerminalId";

/**
 * Endpoint group metadata for terminal locations endpoints
 */
export const terminalLocationsGroup: EndpointGroupMeta = {
  name: "terminal-locations",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Geographical location data for ferry terminals.",
    description:
      "Location information for Washington State Ferry terminals including coordinates, addresses, map links, driving directions, and GIS zoom-level coordinates. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal locations on maps and navigation systems.",
      "Provide driving directions and address information.",
      "Integrate with GIS mapping applications.",
    ],
  },
  endpoints: [terminalLocationsMeta, terminalLocationsByTerminalIdMeta],
};
