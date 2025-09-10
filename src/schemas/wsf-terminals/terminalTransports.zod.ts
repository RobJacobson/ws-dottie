import { z } from "zod";
import { terminalSchema } from "./terminal.zod";
import { transitLinkSchema } from "./transitLink.zod";

/**
 * Terminal transports schema for WSF Terminals API
 *
 * This operation provides helpful information for terminal commuters (including parking
 * notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may
 * be optionally passed to retrieve a specific terminal. A valid API Access Code from
 * the WSDOT Traveler API must be passed as part of the URL string.
 */
export const terminalTransportsSchema = terminalSchema.extend({
  /** Parking information for this terminal. */
  ParkingInfo: z
    .string()
    .nullable()
    .describe("Parking information for this terminal."),

  /** Information about parking-related shuttles that service this terminal. */
  ParkingShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking-related shuttles that service this terminal."
    ),

  /** Tips for commuting to this terminal from the airport. */
  AirportInfo: z
    .string()
    .nullable()
    .describe("Tips for commuting to this terminal from the airport."),

  /** Information about parking shuttles that go between the airport and this terminal. */
  AirportShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking shuttles that go between the airport and this terminal."
    ),

  /** Information for travelers who plan on taking a motorcycle to this terminal. */
  MotorcycleInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a motorcycle to this terminal."
    ),

  /** Information for travelers who plan on taking a truck to this terminal. */
  TruckInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a truck to this terminal."
    ),

  /** Information for travelers who plan on taking their bicycle to this terminal. */
  BikeInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking their bicycle to this terminal."
    ),

  /** Information about trains that service this terminal. */
  TrainInfo: z
    .string()
    .nullable()
    .describe("Information about trains that service this terminal."),

  /** Information about taxis that service this terminal. */
  TaxiInfo: z
    .string()
    .nullable()
    .describe("Information about taxis that service this terminal."),

  /** Tips for carpool/vanpools commuting to this terminal. */
  HovInfo: z
    .string()
    .nullable()
    .describe("Tips for carpool/vanpools commuting to this terminal."),

  /** Links to transit agencies that service this terminal. */
  TransitLinks: z
    .array(transitLinkSchema)
    .nullable()
    .describe("Links to transit agencies that service this terminal."),
});

export type TerminalTransports = z.infer<typeof terminalTransportsSchema>;

export const terminalTransportsArraySchema = z.array(terminalTransportsSchema);
export type TerminalTransportsArray = z.infer<
  typeof terminalTransportsArraySchema
>;
