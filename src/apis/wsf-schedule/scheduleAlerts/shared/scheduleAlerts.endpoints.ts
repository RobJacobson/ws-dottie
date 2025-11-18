import type { EndpointGroupMeta } from "@/apis/types";
import { scheduleAlertsMeta } from "../scheduleAlerts";

/**
 * Endpoint group metadata for schedule alerts endpoints
 */
export const scheduleAlertsGroup: EndpointGroupMeta = {
  name: "schedule-alerts",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Service alerts and notifications for ferry schedules.",
    description:
      "Important notifications about ferry service including delays, cancellations, terminal updates, and service-related announcements. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Display service alerts and notifications in rider apps.",
      "Monitor schedule changes and disruptions.",
      "Show route-specific and system-wide announcements.",
    ],
  },
};

/**
 * Aggregated endpoint metadata for the schedule alerts group
 *
 * This object provides a group-level view of all endpoints in this group,
 * useful for registry, documentation generation, and discovery.
 */
export const scheduleAlertsEndpoints = {
  scheduleAlerts: scheduleAlertsMeta,
} as const;
