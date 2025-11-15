/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../shared/terminalBaseSchema";

/**
 * TransitLink schema
 *
 * Contains transit link information.
 */
export const transitLinkSchema = z
  .object({
    LinkURL: z
      .string()
      .nullable()
      .describe(
        "URL to transit agency website or service page, as a transit URL. E.g., 'http://www.skagittransit.org/' for Skagit Transit, 'http://www.kitsaptransit.com/service/routed-buses' for Kitsap Transit, null when transit link is unavailable. Used for accessing transit agency information."
      ),
    LinkName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name of transit agency, as a transit agency name. E.g., 'Skagit Transit' for Skagit Transit agency, 'Kitsap Transit' for Kitsap Transit agency, null when transit name is unavailable. Provides transit agency identification for display."
      ),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "Preferred sort order for transit link display, as an integer. E.g., null when sort order is not specified. Lower values appear first when sorting transit links in ascending order. Used for transit link display ordering."
      ),
  })
  .describe(
    "Represents transit link information including transit agency URL, name, and sort order. E.g., Skagit Transit link (http://www.skagittransit.org/). Used for displaying transit agency connections and links."
  );

export type TransitLink = z.infer<typeof transitLinkSchema>;

/**
 * TerminalTransport schema
 *
 * This operation provides helpful information for terminal commuters (including parking notes, vehicle-specific tips, etc). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalTransportSchema = terminalBaseSchema
  .extend({
    ParkingInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted parking information for terminal, as parking details. E.g., 'Off-Peak rates effective October 1 through April 30, 2026...' for Anacortes parking rates, null when parking information is unavailable. HTML-formatted text for parking information display."
      ),
    ParkingShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information about parking-related shuttles servicing terminal, as shuttle information. E.g., null when no parking shuttles, shuttle details when available. Used for parking shuttle information display."
      ),
    AirportInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted tips for commuting to terminal from airport, as airport directions. E.g., 'From the Seattle-Tacoma International Airport, allow a minimum of 2 1/2 hours...' for Anacortes airport directions, null when airport information is unavailable. HTML-formatted text for airport commuter information."
      ),
    AirportShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information about airport shuttles servicing terminal, as shuttle information. E.g., 'When traveling from Sea-Tac Airport to Anacortes there is a shuttle...' for Anacortes airport shuttle, null when airport shuttle information is unavailable. HTML-formatted text for airport shuttle information."
      ),
    MotorcycleInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information for motorcycle travelers, as motorcycle tips. E.g., 'While motorcycles are not, by Washington Administrative Code...' for motorcycle staging and loading information, null when motorcycle information is unavailable. HTML-formatted text for motorcycle commuter information."
      ),
    TruckInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information for truck travelers, as truck tips. E.g., 'Expect heavy truck traffic on the first 3 sailings in the morning...' for truck travel information, null when truck information is unavailable. HTML-formatted text for truck commuter information."
      ),
    BikeInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information for bicycle travelers, as bicycle tips. E.g., 'Approaching the Anacortes Terminal, you will arrive at the vehicle tollbooths...' for bicycle staging information, null when bicycle information is unavailable. HTML-formatted text for bicycle commuter information."
      ),
    TrainInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information about trains servicing terminal, as train information. E.g., null when no train service, train details when available. Used for train commuter information display."
      ),
    TaxiInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted information about taxis servicing terminal, as taxi information. E.g., null when no taxi information, taxi details when available. Used for taxi commuter information display."
      ),
    HovInfo: z
      .string()
      .nullable()
      .describe(
        "HTML-formatted tips for carpool/vanpool commuters, as HOV information. E.g., 'Carpool/Vanpools must be ticketed and in line 10 minutes before...' for Bainbridge Island HOV information, null when HOV information is unavailable. HTML-formatted text for carpool/vanpool commuter information."
      ),
    TransitLinks: z
      .array(transitLinkSchema)
      .nullable()
      .describe(
        "Array of transit agency links servicing terminal, as transit link objects. E.g., array containing Skagit Transit link for Anacortes terminal, array containing Kitsap Transit link for Bainbridge Island terminal, null when transit links are unavailable. Used for displaying transit agency connections."
      ),
  })
  .describe(
    "Terminal transportation and commuter information including parking details, vehicle-specific tips, airport information, transit links, and HOV/carpool information."
  );

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;

/**
 * GetAllTerminalTransports schema
 *
 * Returns all terminal transportation options.
 */
export const getAllTerminalTransportsSchema = z
  .array(terminalTransportSchema)
  .describe("Array of transportation information for all terminals.");

export type GetAllTerminalTransports = z.infer<
  typeof getAllTerminalTransportsSchema
>;

/**
 * GetSpecificTerminalTransport schema
 *
 * Returns transportation options for a specific terminal.
 */
export const getSpecificTerminalTransportSchema = terminalTransportSchema;

export type GetSpecificTerminalTransport = z.infer<
  typeof getSpecificTerminalTransportSchema
>;
