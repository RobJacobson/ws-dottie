import type { EndpointGroupMeta } from "@/apis/types";

/**
 * Endpoint group metadata for terminal verbose endpoints
 */
export const terminalVerboseGroup: EndpointGroupMeta = {
  name: "terminal-verbose",
  cacheStrategy: "STATIC",
  documentation: {
    summary:
      "Comprehensive terminal information combining all terminal data types.",
    description:
      "Complete terminal information combining data from terminalBasics, terminalBulletins, terminalLocations, terminalTransports, and terminalWaitTimes endpoints. Includes identification, amenities, bulletins, locations, transportation info, sailing space, wait times, and additional details. Use when you need to reduce API calls and don't mind larger payloads. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Retrieve all terminal information in a single API call.",
      "Reduce application chattiness when comprehensive data is needed.",
      "Build integrated terminal information displays.",
    ],
  },
};
