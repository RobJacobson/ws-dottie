/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * TransitLink schema
 *
 * Contains transit link information.
 */
export const transitLinkSchema = z.object({
  /** The URL of the transit link. */
  LinkURL: z.string().nullable().describe("The URL of the transit link."),
  /** The name of the transit agency. */
  LinkName: z.string().nullable().describe("The name of the transit agency."),
  /**
   * A preferred sort order (sort-ascending with respect to other transit links in this list).
   */
  SortSeq: z
    .number()
    .int()
    .nullable()
    .describe(
      "A preferred sort order (sort-ascending with respect to other transit links in this list)."
    ),
});

export type TransitLink = z.infer<typeof transitLinkSchema>;

/**
 * TerminalTransportationOption schema
 *
 * This operation provides helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalTransportationOptionSchema = terminalBaseSchema.extend({
  /** Parking information for this terminal. */
  ParkingInfo: z
    .string()
    .nullable()
    .describe("Parking information for this terminal."),
  /**
   * Information about parking-related shuttles that service this terminal.
   */
  ParkingShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking-related shuttles that service this terminal."
    ),
  /**
   * Tips for commuting to this terminal from the airport.
   */
  AirportInfo: z
    .string()
    .nullable()
    .describe("Tips for commuting to this terminal from the airport."),
  /**
   * Information about parking shuttles that go between the airport and this terminal.
   */
  AirportShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking shuttles that go between the airport and this terminal."
    ),
  /**
   * Information for travelers who plan on taking a motorcycle to this terminal.
   */
  MotorcycleInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a motorcycle to this terminal."
    ),
  /**
   * Information for travelers who plan on taking a truck to this terminal.
   */
  TruckInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a truck to this terminal."
    ),
  /**
   * Information for travelers who plan on taking their bicycle to this terminal.
   */
  BikeInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking their bicycle to this terminal."
    ),
  /**
   * Information about trains that service this terminal.
   */
  TrainInfo: z
    .string()
    .nullable()
    .describe("Information about trains that service this terminal."),
  /**
   * Information about taxis that service this terminal.
   */
  TaxiInfo: z
    .string()
    .nullable()
    .describe("Information about taxis that service this terminal."),
  /**
   * Tips for carpool/vanpools commuting to this terminal.
   */
  HovInfo: z
    .string()
    .nullable()
    .describe("Tips for carpool/vanpools commuting to this terminal."),
  /**
   * Links to transit agencies that service this terminal.
   */
  TransitLinks: z
    .array(transitLinkSchema)
    .nullable()
    .describe("Links to transit agencies that service this terminal."),
});

export type TerminalTransportationOption = z.infer<
  typeof terminalTransportationOptionSchema
>;

/**
 * GetAllTerminalTransportationOptions schema
 *
 * Returns all terminal transportation options.
 */
export const getAllTerminalTransportationOptionsSchema = z
  .array(terminalTransportationOptionSchema)
  .describe(
    "This operation provides helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalTransportationOptions = z.infer<
  typeof getAllTerminalTransportationOptionsSchema
>;

/**
 * GetSpecificTerminalTransportationOption schema
 *
 * Returns transportation options for a specific terminal.
 */
export const getSpecificTerminalTransportationOptionSchema =
  terminalTransportationOptionSchema;

export type GetSpecificTerminalTransportationOption = z.infer<
  typeof getSpecificTerminalTransportationOptionSchema
>;
