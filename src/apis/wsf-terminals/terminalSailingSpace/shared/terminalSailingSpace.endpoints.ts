import type { EndpointGroupMeta } from "@/apis/types";
import { terminalSailingSpaceMeta } from "../terminalSailingSpace";
import { terminalSailingSpaceByTerminalIdMeta } from "../terminalSailingSpaceByTerminalId";

/**
 * Endpoint group metadata for terminal sailing space endpoints
 */
export const terminalSailingSpaceGroup: EndpointGroupMeta = {
  name: "terminal-sailing-space",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Real-time sailing space availability for upcoming departures.",
    description:
      "Terminal condition data including drive-up and reservation spaces available for select departures, vessel information, and cancellation status. Data changes frequently (potentially every 5 seconds). Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group. Do not cache results for extended periods.",
    useCases: [
      "Display real-time space availability for upcoming sailings.",
      "Show drive-up and reservation space counts with color indicators.",
      "Monitor vessel assignments and departure cancellations.",
    ],
  },
  endpoints: [terminalSailingSpaceMeta, terminalSailingSpaceByTerminalIdMeta],
};
