import { z } from "zod";

import { terminalBasicsSchema } from "./terminalBasics.zod";
import { terminalBulletinsSchema } from "./terminalBulletins.zod";
import { terminalLocationSchema } from "./terminalLocation.zod";
import { terminalTransportsSchema } from "./terminalTransports.zod";
import { terminalWaitTimesSchema } from "./terminalWaitTimes.zod";

/**
 * Terminal verbose schema for WSF Terminals API
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should
 * be used if you need to reduce the "chattiness" of your application and don't mind
 * receiving a larger payload of data. The results include and expand on what's already
 * available through the following operations:
 *
 * - `/terminalbasics`
 * - `/terminalbasics/{TerminalID}`
 * - `/terminalbulletins`
 * - `/terminalbulletins/{TerminalID}`
 * - `/terminallocations`
 * - `/terminallocations/{TerminalID}`
 * - `/terminaltransports`
 * - `/terminaltransports/{TerminalID}`
 * - `/terminalwaittimes`
 * - `/terminalwaittimes/{TerminalID}`
 *
 * TerminalID, or unique terminal identifier, may be optionally passed to retrieve a
 * specific terminal. A valid API Access Code from the WSDOT Traveler API must be passed
 * as part of the URL string.
 */
export const terminalVerboseSchema = terminalBasicsSchema.extend({
  ...terminalBulletinsSchema.shape,
  ...terminalLocationSchema.shape,
  ...terminalTransportsSchema.shape,
  ...terminalWaitTimesSchema.shape,
  /** Miscellaneous information about the terminal. */
  AdditionalInfo: z
    .string()
    .nullable()
    .describe("Miscellaneous information about the terminal."),

  /** Information about this terminal's lost and found department. */
  LostAndFoundInfo: z
    .string()
    .nullable()
    .describe("Information about this terminal's lost and found department."),

  /** Information about security plans that affect this terminal. */
  SecurityInfo: z
    .string()
    .nullable()
    .describe("Information about security plans that affect this terminal."),

  /** Information about relevant construction projects and how they might affect this terminal. */
  ConstructionInfo: z
    .string()
    .nullable()
    .describe(
      "Information about relevant construction projects and how they might affect this terminal."
    ),

  /** Details food service vendors that service this terminal. */
  FoodServiceInfo: z
    .string()
    .nullable()
    .describe("Details food service vendors that service this terminal."),

  /** Information about ADA accessibility features available at this terminal. */
  AdaInfo: z
    .string()
    .nullable()
    .describe(
      "Information about ADA accessibility features available at this terminal."
    ),

  /** Introduction to fares information and how to purchase tickets at this terminal. */
  FareDiscountInfo: z
    .string()
    .nullable()
    .describe(
      "Introduction to fares information and how to purchase tickets at this terminal."
    ),

  /** Information about the tally system and how it affects travelers waiting at this terminal. */
  TallySystemInfo: z
    .string()
    .nullable()
    .describe(
      "Information about the tally system and how it affects travelers waiting at this terminal."
    ),

  /** Link to the chamber of commerce associated with this terminal. */
  ChamberOfCommerce: z
    .object({
      /** The URL of the chamber of commerce link. */
      LinkURL: z
        .string()
        .nullable()
        .describe("The URL of the chamber of commerce link."),
      /** The name of the chamber of commerce. */
      LinkName: z
        .string()
        .nullable()
        .describe("The name of the chamber of commerce."),
      /** A preferred sort order (sort-ascending). */
      SortSeq: z
        .number()
        .int()
        .nullable()
        .describe("A preferred sort order (sort-ascending)."),
    })
    .nullable()
    .describe("Link to the chamber of commerce associated with this terminal."),

  /** Information about the Ferry Advisory Committee that services this terminal. */
  FacInfo: z
    .string()
    .nullable()
    .describe(
      "Information about the Ferry Advisory Committee that services this terminal."
    ),

  /** Indicates ownership status of this WSF resource (owned, leased, etc). */
  ResourceStatus: z
    .string()
    .nullable()
    .describe(
      "Indicates ownership status of this WSF resource (owned, leased, etc)."
    ),

  /** Indicates a categorization value for this terminal (eg. passenger and car, passenger only, etc). */
  TypeDesc: z
    .string()
    .nullable()
    .describe(
      "Indicates a categorization value for this terminal (eg. passenger and car, passenger only, etc)."
    ),

  /** Indicates whether or not terminal condition data should be displayed for this terminal (true indicates that it should be hidden). */
  REALTIME_SHUTOFF_FLAG: z
    .boolean()
    .describe(
      "Indicates whether or not terminal condition data should be displayed for this terminal (true indicates that it should be hidden)."
    ),

  /** If REALTIME_SHUTOFF_FLAG is true, this message can be used to explain why terminal condition data is not available. */
  REALTIME_SHUTOFF_MESSAGE: z
    .string()
    .nullable()
    .describe(
      "If REALTIME_SHUTOFF_FLAG is true, this message can be used to explain why terminal condition data is not available."
    ),

  /** Links designed to help travelers who are visiting this terminal. */
  VisitorLinks: z
    .array(
      z.object({
        /** The URL of the visitor link. */
        LinkURL: z.string().nullable().describe("The URL of the visitor link."),
        /** The name of the visitor link. */
        LinkName: z
          .string()
          .nullable()
          .describe("The name of the visitor link."),
        /** A preferred sort order (sort-ascending with respect to other visitor links in this array). */
        SortSeq: z
          .number()
          .int()
          .nullable()
          .describe(
            "A preferred sort order (sort-ascending with respect to other visitor links in this array)."
          ),
      })
    )
    .nullable()
    .describe(
      "Links designed to help travelers who are visiting this terminal."
    ),

  /** True if this terminal isn't capable of collecting fares. */
  IsNoFareCollected: z
    .boolean()
    .nullable()
    .describe("True if this terminal isn't capable of collecting fares."),

  /** An optional message detailing how inability to collect fares could affect terminal conditions data. */
  NoFareCollectedMsg: z
    .string()
    .nullable()
    .describe(
      "An optional message detailing how inability to collect fares could affect terminal conditions data."
    ),

  /** An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares. */
  RealtimeIntroMsg: z
    .string()
    .nullable()
    .describe(
      "An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares."
    ),
});

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;

/**
 * Array of terminal verbose.
 */
export const terminalVerbosesSchema = z
  .array(terminalVerboseSchema)
  .describe("Highly detailed information pertaining to terminals.");

export type TerminalVerboses = z.infer<typeof terminalVerbosesSchema>;
