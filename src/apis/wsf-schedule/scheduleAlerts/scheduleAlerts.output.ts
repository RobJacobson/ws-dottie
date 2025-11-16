/**
 * @fileoverview WSF Schedule API Output Schemas for Schedule Alerts
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API schedule alert operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for AlertDetail - represents detailed alert information
 */
export const alertDetailSchema = z
  .object({
    BulletinID: z.number().describe("Numeric ID of the alert bulletin."),
    BulletinFlag: z
      .boolean()
      .describe(
        "True if alert includes bulletin-formatted text; otherwise false."
      ),
    BulletinText: z
      .string()
      .nullable()
      .describe("HTML-formatted alert text for bulletin display."),
    CommunicationFlag: z
      .boolean()
      .describe(
        "True if alert includes communications announcement text; otherwise false."
      ),
    CommunicationText: z
      .string()
      .nullable()
      .describe("Alert text formatted for internal communications."),
    RouteAlertFlag: z
      .boolean()
      .describe(
        "True if alert includes route announcement text; otherwise false."
      ),
    RouteAlertText: z
      .string()
      .nullable()
      .describe("Compact route-specific alert text for route displays."),
    HomepageAlertText: z
      .string()
      .nullable()
      .describe("HTML-formatted alert text for homepage display."),
    PublishDate: zDotnetDate()
      .nullable()
      .describe("UTC datetime when the alert was published."),
    DisruptionDescription: z
      .string()
      .nullable()
      .describe("Service disruption description associated with alert."),
    AllRoutesFlag: z
      .boolean()
      .describe(
        "True if alert affects all routes system-wide; otherwise false."
      ),
    SortSeq: z
      .number()
      .describe("Display sort order; lower values appear first in lists."),
    AlertTypeID: z.number().describe("Numeric ID of the alert type category."),
    AlertType: z.string().describe("Display name of the alert type category."),
    AlertFullTitle: z.string().describe("Full title of the alert for display."),
    AffectedRouteIDs: z
      .array(z.number())
      .describe(
        "Array of route IDs affected by this alert; empty if all routes."
      ),
    IVRText: z
      .string()
      .nullable()
      .describe("Alert text formatted for Interactive Voice Response systems."),
  })
  .describe(
    "Detailed alert information with multiple text formats, publish date, alert type, and affected routes."
  );

export type AlertDetail = z.infer<typeof alertDetailSchema>;

/**
 * Alert Details List Schema - represents an list of detailed alerts
 */
export const alertDetailsListSchema = z
  .array(alertDetailSchema)
  .describe("Array of detailed alert information.");

export type AlertDetailList = z.infer<typeof alertDetailsListSchema>;
