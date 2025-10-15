/**
 * @fileoverview WSF Schedule API Output Schemas for Schedule Alerts
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API schedule alert operations.
 */

import { z } from "zod";

import { zDotnetDate } from "../shared/zDotnetDateSchema";

/**
 * Schema for AlertDetail - represents detailed alert information
 */
export const alertDetailSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().describe("Unique identifier for the alert."),
  /**
   * A flag that, when true, indicates the alert includes text tailored as a bulletin.
   */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a bulletin."
    ),
  /** The alert text, tailored as a bulletin. */
  BulletinText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a bulletin."),
  /**
   * A flag that, when true, indicates the alert includes text tailored as a communications announcement.
   */
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a communications announcement."
    ),
  /** The alert text, tailored as a communications announcement. */
  CommunicationText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a communications announcement."),
  /**
   * A flag that, when true, indicates the alert includes text tailored as a route announcement.
   */
  RouteAlertFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert includes text tailored as a route announcement."
    ),
  /** The alert text, tailored as a route announcement. */
  RouteAlertText: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a route announcement."),
  /** The alert text, tailored for a landing page. */
  HomepageAlertText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for a landing page."),
  /** The date the alert was published. */
  PublishDate: zDotnetDate()
    .nullable()
    .describe("The date the alert was published."),
  /**
   * If present, indicates service disruption text associated with the alert.
   */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /**
   * A flag that, when true, indicates that the alert affects all routes.
   */
  AllRoutesFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the alert affects all routes."
    ),
  /**
   * A preferred sort order (sort-ascending with respect to other alerts).
   */
  SortSeq: z
    .number()
    .describe(
      "A preferred sort order (sort-ascending with respect to other alerts)."
    ),
  /**
   * Unique identifier for the type or category that the alert belongs to.
   */
  AlertTypeID: z
    .number()
    .describe(
      "Unique identifier for the type or category that the alert belongs to."
    ),
  /**
   * A type / category that the alert belongs to (eg. "General Information").
   */
  AlertType: z
    .string()
    .describe(
      'A type / category that the alert belongs to (eg. "General Information").'
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().describe("The title of the alert."),
  /**
   * An list of integers that represent the unique identifiers of routes affected by the alert.
   */
  AffectedRouteIDs: z
    .array(z.number())
    .describe(
      "An list of integers that represent the unique identifiers of routes affected by the alert."
    ),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

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
