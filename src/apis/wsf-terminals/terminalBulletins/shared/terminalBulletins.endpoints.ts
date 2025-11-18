import type { EndpointGroupMeta } from "@/apis/types";
import { terminalBulletinsMeta } from "../terminalBulletins";
import { terminalBulletinsByTerminalIdMeta } from "../terminalBulletinsByTerminalId";

/**
 * Endpoint group metadata for terminal bulletins endpoints
 */
export const terminalBulletinsGroup: EndpointGroupMeta = {
  name: "terminal-bulletins",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Service alerts and notifications for ferry terminals.",
    description:
      "Important notices and alerts associated with Washington State Ferry terminals including service updates, travel advisories, and critical announcements. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display terminal alerts and service notices in rider apps.",
      "Show travel advisories and critical announcements.",
      "Monitor terminal-specific and system-wide notifications.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the terminal bulletins group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const terminalBulletinsEndpoints = {
  terminalBulletins: terminalBulletinsMeta,
  terminalBulletinsByTerminalId: terminalBulletinsByTerminalIdMeta,
} as const;

