import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Schema for alerts response from WSF Schedule API.
 * This operation provides alert information tailored for routes, bulletins, service disruptions, etc.
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const alertsResponseSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().int().describe("Unique identifier for the alert."),
  /** A flag that, when true, indicates the alert includes text tailored as a bulletin. */
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
  /** A flag that, when true, indicates the alert includes text tailored as a communications announcement. */
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
  /** A flag that, when true, indicates the alert includes text tailored as a route announcement. */
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
  PublishDate: zWsdotDate()
    .nullable()
    .describe("The date the alert was published."),
  /** If present, indicates service disruption text associated with the alert. */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /** A flag that, when true, indicates that the alert affects all routes. */
  AllRoutesFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates that the alert affects all routes."
    ),
  /** A preferred sort order (sort-ascending with respect to other alerts). */
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other alerts)."
    ),
  /** Unique identifier for the type or category that the alert belongs to. */
  AlertTypeID: z
    .number()
    .int()
    .describe(
      "Unique identifier for the type or category that the alert belongs to."
    ),
  /** A type / category that the alert belongs to (eg. "General Information"). */
  AlertType: z
    .string()
    .describe(
      'A type / category that the alert belongs to (eg. "General Information").'
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().describe("The title of the alert."),
  /** An array of integers that represent the unique identifiers of routes affected by the alert. */
  AffectedRouteIDs: z
    .array(z.number().int())
    .describe(
      "An array of integers that represent the unique identifiers of routes affected by the alert."
    ),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type AlertsResponse = z.infer<typeof alertsResponseSchema>;

/**
 * Array of alerts responses.
 */
export const alertsResponsesArraySchema = z
  .array(alertsResponseSchema)
  .describe(
    "Alert information tailored for routes, bulletins, service disruptions, etc."
  );

export type AlertsResponsesArray = z.infer<typeof alertsResponsesArraySchema>;
