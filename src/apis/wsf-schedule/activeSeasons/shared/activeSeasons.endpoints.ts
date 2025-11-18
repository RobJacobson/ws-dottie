import type { EndpointGroupMeta } from "@/apis/types";
import { activeSeasonsMeta } from "../activeSeasons";

/**
 * Endpoint group metadata for active seasons endpoints
 */
export const activeSeasonsGroup: EndpointGroupMeta = {
  name: "active-seasons",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Active schedule seasons for WSF routes.",
    description:
      "Scheduling periods defining when specific ferry schedules are active, including season dates, names, and PDF URLs.",
    useCases: [
      "Identify which schedule seasons are currently active.",
      "Determine valid date ranges for schedule queries.",
      "Access printable schedule PDF documents.",
    ],
    updateFrequency: "daily",
  },
};

/**
 * Aggregated endpoint metadata for the active seasons group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const activeSeasonsEndpoints = {
  activeSeasons: activeSeasonsMeta,
} as const;
