/**
 * @fileoverview WSF Schedule API Output Schemas for Schedule Alerts
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API schedule alert operations.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for AlertDetail - represents detailed alert information
 */
export const alertDetailSchema = z
  .object({
    BulletinID: z
      .number()
      .describe(
        "Unique bulletin/alert identifier, as an integer ID. E.g., '110583' for Fauntleroy/Vashon/Southworth mechanical alert, '110577' for vessel replacement alert. Used as primary key for alert identification."
      ),
    BulletinFlag: z
      .boolean()
      .describe(
        "Indicator whether alert includes text tailored as bulletin, as a boolean. E.g., true when alert has bulletin text format, false when alert does not include bulletin text. Used to determine if bulletin text is available."
      ),
    BulletinText: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored as bulletin, as HTML-formatted bulletin text. E.g., '<p>Due to unplanned mechanical issues with the M/V Cathlamet...</p>' for mechanical alert, null when bulletin text is unavailable. HTML-formatted text for bulletin display."
      ),
    CommunicationFlag: z
      .boolean()
      .describe(
        "Indicator whether alert includes text tailored as communications announcement, as a boolean. E.g., false when alert does not include communications text. Used to determine if communications text is available."
      ),
    CommunicationText: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored as communications announcement, as a communications description. E.g., null when communications text is unavailable. Used for internal communications and announcements."
      ),
    RouteAlertFlag: z
      .boolean()
      .describe(
        "Indicator whether alert includes text tailored as route announcement, as a boolean. E.g., true when alert has route alert text format. Used to determine if route alert text is available."
      ),
    RouteAlertText: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored as route announcement, as a route alert description. E.g., 'Faunt/VA/SW-Fauntleroy/VA/Southworth on 1-Boat Service--Mechanical' for mechanical alert, null when route alert text is unavailable. Compact format for route-specific displays."
      ),
    HomepageAlertText: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored for homepage/landing page, as HTML-formatted homepage text. E.g., '<p>Due to unplanned mechanical issues...</p>' for homepage display, null when homepage text is unavailable. HTML-formatted text for main page display."
      ),
    PublishDate: zDotnetDate()
      .nullable()
      .describe(
        "Date when alert was published, as a UTC datetime. E.g., '2025-11-02T17:00:42.023Z' for alert published at 5:00 PM on November 2, 2025, null when publish date is unavailable. Indicates when alert information was made public."
      ),
    DisruptionDescription: z
      .string()
      .nullable()
      .describe(
        "Service disruption text associated with alert, as a disruption description. E.g., null when alert is not disruption-specific, disruption text when alert relates to service disruption. Used for identifying disruption-related alerts."
      ),
    AllRoutesFlag: z
      .boolean()
      .describe(
        "Indicator whether alert affects all routes, as a boolean. E.g., false when alert affects specific routes only, true when alert applies to all routes system-wide. Used to determine alert scope."
      ),
    SortSeq: z
      .number()
      .describe(
        "Preferred sort order for alert display, as an integer. E.g., '1' for first alert priority. Lower values appear first when sorting alerts in ascending order. Used for alert display ordering."
      ),
    AlertTypeID: z
      .number()
      .describe(
        "Unique identifier for alert type or category, as an integer ID. E.g., '5' for 'All Alerts' category. Used to identify alert category for filtering and organization."
      ),
    AlertType: z
      .string()
      .describe(
        "Type or category that alert belongs to, as an alert type name. E.g., 'All Alerts' for general alert category, 'General Information' for informational alerts. Used for alert categorization and filtering."
      ),
    AlertFullTitle: z
      .string()
      .describe(
        "Full title of alert, as an alert title. E.g., 'Faunt/VA/SW-Fauntleroy/VA/Southworth on 1-Boat Service--Mechanical' for mechanical alert, 'Faunt/Va/SW-Chimacum to replace Issaquah this Sunday, Nov.2' for vessel replacement alert. Provides alert identification for display."
      ),
    AffectedRouteIDs: z
      .array(z.number())
      .describe(
        "Array of route IDs affected by alert, as route ID integers. E.g., array containing routes 13, 14, 15, 29 for Fauntleroy/Vashon/Southworth routes, empty array when alert affects all routes. Used to identify which routes are impacted by alert."
      ),
    IVRText: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored for Interactive Voice Response systems, as IVR description. E.g., null when IVR text is unavailable. Used for telephone-based alert information systems and text-to-speech playback."
      ),
  })
  .describe(
    "Represents detailed alert information including bulletin ID, multiple text formats (bulletin, route alert, homepage, IVR), publish date, alert type, affected routes, and service disruption details. E.g., alert 110583 for Fauntleroy/Vashon/Southworth mechanical issue affecting routes 13, 14, 15, 29. Used for alert display, notification systems, and route-specific alert filtering."
  );

export type AlertDetail = z.infer<typeof alertDetailSchema>;

/**
 * Alert Details List Schema - represents an list of detailed alerts
 */
export const alertDetailsListSchema = z
  .array(alertDetailSchema)
  .describe(
    "This operation provides alert information tailored for routes, bulletins, service disruptions, etc."
  );

export type AlertDetailList = z.infer<typeof alertDetailsListSchema>;
