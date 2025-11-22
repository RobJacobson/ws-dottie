/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod";
import { terminalBaseSchema } from "../../shared/terminalBaseSchema";
import {
  type Bulletin,
  bulletinSchema,
} from "../../terminalBulletins/shared/terminalBulletins.output";
import {
  type DispGISZoomLoc,
  dispGISZoomLocSchema,
} from "../../terminalLocations/shared/terminalLocations.output";
import {
  type DepartingSpace,
  departingSpaceSchema,
  type SpaceForArrivalTerminal,
} from "../../terminalSailingSpace/shared/terminalSailingSpace.output";
import {
  type TransitLink,
  transitLinkSchema,
} from "../../terminalTransports/shared/terminalTransports.output";
import {
  type WaitTime,
  waitTimeSchema,
} from "../../terminalWaitTimes/shared/terminalWaitTimes.output";

// Re-export types for convenience
export type {
  Bulletin,
  DispGISZoomLoc,
  SpaceForArrivalTerminal,
  DepartingSpace,
  TransitLink,
  WaitTime,
};

/**
 * TerminalVerbose schema
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalVerboseSchema = terminalBaseSchema
  .extend({
    /**
     * Indicates whether or not overhead passenger loading is available.
     */
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "Indicator whether terminal supports overhead passenger loading from upper vehicle deck, as a boolean. E.g., true for terminals with overhead walkways like Anacortes and Bainbridge Island, false for terminals without overhead loading capability. Used to determine passenger boarding capabilities and accessibility features."
      ),
    /**
     * Indicates whether or not the terminal has an elevator.
     */
    Elevator: z
      .boolean()
      .describe(
        "Indicator whether terminal has elevator access for passengers, as a boolean. E.g., false for terminals like Anacortes and Bainbridge Island without elevators, true for terminals with elevator access. Used to determine ADA accessibility and passenger mobility accommodations."
      ),
    /**
     * Indicates whether or not the terminal has a waiting room.
     */
    WaitingRoom: z
      .boolean()
      .describe(
        "Indicator whether terminal has indoor waiting room facility, as a boolean. E.g., true for terminals like Anacortes and Bainbridge Island with waiting rooms, false for terminals without waiting facilities. Used to determine passenger comfort amenities and sheltered waiting areas."
      ),
    /**
     * Indicates whether or not the terminal offers food service.
     */
    FoodService: z
      .boolean()
      .describe(
        "Indicator whether terminal offers food service facilities, as a boolean. E.g., true for terminals like Anacortes and Bainbridge Island with galleys or cafes, false for terminals without food service. Used to determine available amenities for passengers during wait times."
      ),
    /**
     * Indicates whether or not the terminal has one or more restrooms.
     */
    Restroom: z
      .boolean()
      .describe(
        "Indicator whether terminal has restroom facilities, as a boolean. E.g., true for terminals like Anacortes and Bainbridge Island with restrooms, false for terminals without restroom access. Used to determine passenger comfort amenities and basic facility availability."
      ),
  })
  .and(
    z.object({
      /**
       * The bulletins / alerts associated with this terminal.
       */
      Bulletins: z
        .array(bulletinSchema)
        .describe(
          "Active bulletins and alerts associated with terminal, as an array of bulletin objects. E.g., array containing vehicle reservation notices for Anacortes terminal, empty array for terminals without active bulletins. Used to display important terminal information, service changes, and passenger notifications."
        ),
    })
  )
  .and(
    z.object({
      /** The latitude of the terminal. */
      Latitude: z
        .number()
        .nullable()
        .describe(
          "Terminal latitude coordinate, in decimal degrees. E.g., 48.507351 for Anacortes terminal, 47.622339 for Bainbridge Island terminal, null when coordinate data is unavailable. Used for mapping, distance calculations, and geographic display."
        ),
      /** The longitude of the terminal. */
      Longitude: z
        .number()
        .nullable()
        .describe(
          "Terminal longitude coordinate, in decimal degrees. E.g., -122.677 for Anacortes terminal, -122.509617 for Bainbridge Island terminal, null when coordinate data is unavailable. Used for mapping, distance calculations, and geographic display."
        ),
      /** The first line of the terminal's address. */
      AddressLineOne: z
        .string()
        .nullable()
        .describe(
          "Primary street address line for terminal location, as a street address. E.g., '2100 Ferry Terminal Road' for Anacortes terminal, '270 Olympic Drive SE' for Bainbridge Island terminal, null when address is unavailable. Used for navigation, mapping, and location identification."
        ),
      /** The second line of the terminal's address. */
      AddressLineTwo: z
        .string()
        .nullable()
        .describe(
          "Secondary address line for terminal location, as an address supplement. E.g., null for most terminals without suite or building numbers, present when additional address details are needed. Used for complete address formatting when available."
        ),
      /** The city where the terminal is located. */
      City: z
        .string()
        .nullable()
        .describe(
          "City name where terminal is located, as a city name. E.g., 'Anacortes' for Anacortes terminal, 'Bainbridge Island' for Bainbridge Island terminal, null when city is unavailable. Used for location identification and address formatting."
        ),
      /** The state where the terminal is located. */
      State: z
        .string()
        .nullable()
        .describe(
          "State abbreviation where terminal is located, as a state code. E.g., 'WA' for Washington state terminals, null when state is unavailable. Used for location identification and address formatting."
        ),
      /** The terminal's zip code. */
      ZipCode: z
        .string()
        .nullable()
        .describe(
          "Postal code for terminal location, as a zip code string. E.g., '98221' for Anacortes terminal, '98110' for Bainbridge Island terminal, null when zip code is unavailable. Used for location identification and address formatting."
        ),
      /** The country where the terminal is located. */
      Country: z
        .string()
        .nullable()
        .describe(
          "Country name where terminal is located, as a country code. E.g., 'USA' for United States terminals, null when country is unavailable. Used for location identification and international address formatting."
        ),
      /** A URL to a page that displays the terminal on a GIS map. */
      MapLink: z
        .string()
        .nullable()
        .describe(
          "URL link to external mapping service displaying terminal location, as a map URL. E.g., Google Maps link for Anacortes terminal, null when map link is unavailable. Used for providing direct navigation links to terminal location."
        ),
      /** Instructions detailing how to drive to the terminal. */
      Directions: z
        .string()
        .nullable()
        .describe(
          "Driving directions to terminal from major routes, as HTML-formatted text. E.g., directions from Interstate 5 to Anacortes terminal, null when directions are unavailable. Used for navigation assistance and route planning."
        ),
      /**
       * Where this terminal should appear on a GIS map (at various zoom levels).
       */
      DispGISZoomLoc: z
        .array(dispGISZoomLocSchema)
        .nullable()
        .describe(
          "GIS map display coordinates for terminal at various zoom levels, as an array of zoom-level coordinates. E.g., array with 18 zoom levels for Anacortes terminal, null when zoom-level data is unavailable. Used for optimized map rendering at different zoom levels."
        ),
    })
  )
  .and(
    z.object({
      /**
       * The most recent departures leaving this terminal.
       */
      DepartingSpaces: z
        .array(departingSpaceSchema)
        .nullable()
        .optional()
        .describe(
          "Most recent departure sailing space information from terminal, as an array of departing space objects. E.g., array containing vessel details, departure times, and space availability for recent sailings, null or empty when departure data is unavailable. Used for real-time sailing space tracking and capacity monitoring."
        ),
      /**
       * True if this terminal isn't capable of collecting fares.
       */
      IsNoFareCollected: z
        .boolean()
        .nullable()
        .describe(
          "Indicator whether terminal lacks fare collection capability, as a boolean. E.g., null for terminals like Anacortes and Bainbridge Island that collect fares, true for terminals without fare collection. Used to determine fare collection availability and terminal conditions data reliability."
        ),
      /**
       * An optional message detailing how inability to collect fares could affect terminal conditions data.
       */
      NoFareCollectedMsg: z
        .string()
        .nullable()
        .describe(
          "Message explaining how lack of fare collection affects terminal conditions data, as a notification message. E.g., null for terminals with fare collection, present when terminal cannot collect fares. Used to inform users about data limitations for terminals without fare collection."
        ),
    })
  )
  .and(
    z.object({
      /** Parking information for this terminal. */
      ParkingInfo: z
        .string()
        .nullable()
        .describe(
          "Parking availability, rates, and policies for terminal, as HTML-formatted text. E.g., parking rates and payment options for Anacortes terminal, null when parking information is unavailable. Used for parking planning and cost estimation."
        ),
      /**
       * Information about parking-related shuttles that service this terminal.
       */
      ParkingShuttleInfo: z
        .string()
        .nullable()
        .describe(
          "Information about shuttle services connecting parking areas to terminal, as HTML-formatted text. E.g., null for terminals without parking shuttles, present when parking shuttles are available. Used for planning parking and terminal access."
        ),
      /**
       * Tips for commuting to this terminal from the airport.
       */
      AirportInfo: z
        .string()
        .nullable()
        .describe(
          "Driving directions and travel time from airport to terminal, as HTML-formatted text. E.g., directions from Sea-Tac Airport to Anacortes terminal, null when airport information is unavailable. Used for airport-to-terminal route planning."
        ),
      /**
       * Information about parking shuttles that go between the airport and this terminal.
       */
      AirportShuttleInfo: z
        .string()
        .nullable()
        .describe(
          "Information about shuttle services connecting airport to terminal, as HTML-formatted text. E.g., Bellair Airporter service information for Anacortes terminal, null when airport shuttles are unavailable. Used for airport-to-terminal transportation planning."
        ),
      /**
       * Information for travelers who plan on taking a motorcycle to this terminal.
       */
      MotorcycleInfo: z
        .string()
        .nullable()
        .describe(
          "Motorcycle staging, loading, and fare information for terminal, as HTML-formatted text. E.g., motorcycle loading procedures and staging areas for Anacortes terminal, null when motorcycle information is unavailable. Used for motorcycle rider planning and terminal procedures."
        ),
      /**
       * Information for travelers who plan on taking a truck to this terminal.
       */
      TruckInfo: z
        .string()
        .nullable()
        .describe(
          "Truck requirements, oversized vehicle approval, and loading information for terminal, as HTML-formatted text. E.g., overweight vehicle travel approval requirements for Anacortes terminal, null when truck information is unavailable. Used for commercial vehicle planning and compliance."
        ),
      /**
       * Information for travelers who plan on taking their bicycle to this terminal.
       */
      BikeInfo: z
        .string()
        .nullable()
        .describe(
          "Bicycle staging, loading procedures, and fare information for terminal, as HTML-formatted text. E.g., bicycle loading procedures and rack availability for Anacortes terminal, null when bicycle information is unavailable. Used for bicycle rider planning and terminal procedures."
        ),
      /**
       * Information about trains that service this terminal.
       */
      TrainInfo: z
        .string()
        .nullable()
        .describe(
          "Train service information connecting to terminal, as HTML-formatted text. E.g., null for terminals without train service, present when train connections are available. Used for multimodal transportation planning."
        ),
      /**
       * Information about taxis that service this terminal.
       */
      TaxiInfo: z
        .string()
        .nullable()
        .describe(
          "Taxi service information for terminal, as HTML-formatted text. E.g., null for terminals without taxi information, present when taxi services are documented. Used for local transportation planning."
        ),
      /**
       * Tips for carpool/vanpools commuting to this terminal.
       */
      HovInfo: z
        .string()
        .nullable()
        .describe(
          "Carpool and vanpool information including preferential loading requirements, as HTML-formatted text. E.g., carpool registration and loading procedures for Bainbridge Island terminal, null when HOV information is unavailable. Used for rideshare planning and preferential loading coordination."
        ),
      /**
       * Links to transit agencies that service this terminal.
       */
      TransitLinks: z
        .array(transitLinkSchema)
        .nullable()
        .describe(
          "Links to transit agencies providing service to terminal, as an array of transit link objects. E.g., array containing Skagit Transit link for Anacortes terminal, Kitsap Transit link for Bainbridge Island terminal, null or empty when no transit links are available. Used for multimodal transportation planning and transit connection information."
        ),
    })
  )
  .and(
    z.object({
      /**
       * The wait times associated with this terminal.
       */
      WaitTimes: z
        .array(waitTimeSchema)
        .nullable()
        .describe(
          "Current wait time information and arrival recommendations for terminal, as an array of wait time objects. E.g., array containing vehicle reservation requirements and arrival time recommendations for Anacortes terminal, null when wait time data is unavailable. Used for trip planning and arrival time guidance."
        ),
    })
  )
  .and(
    z.object({
      /**
       * An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares.
       */
      RealtimeIntroMsg: z
        .string()
        .nullable()
        .describe(
          "Introductory message explaining real-time terminal conditions data display, as HTML-formatted text. E.g., message about approximate vehicle spaces available in holding area for Anacortes terminal, null when intro message is unavailable. Used to provide context for real-time conditions data."
        ),
      /**
       * Additional information about the terminal.
       */
      AdditionalInfo: z
        .string()
        .nullable()
        .describe(
          "Additional terminal information including hours, services, and general details, as HTML-formatted text. E.g., passenger booth hours and kiosk information for Anacortes terminal, null when additional information is unavailable. Used for comprehensive terminal information display."
        ),
      /**
       * Lost and found information for the terminal.
       */
      LostAndFoundInfo: z
        .string()
        .nullable()
        .describe(
          "Lost and found procedures, contact information, and retention policies for terminal, as HTML-formatted text. E.g., lost and found location and contact details for Anacortes terminal, null when lost and found information is unavailable. Used for lost item reporting and retrieval."
        ),
      /**
       * Security information for the terminal.
       */
      SecurityInfo: z
        .string()
        .nullable()
        .describe(
          "Security plan information and safety policies for terminal, as HTML-formatted text. E.g., U.S. Coast Guard approved security plan information, null when security information is unavailable. Used for security awareness and compliance information."
        ),
      /**
       * Construction information for the terminal.
       */
      ConstructionInfo: z
        .string()
        .nullable()
        .describe(
          "Ongoing or planned construction activities affecting terminal, as HTML-formatted text. E.g., null for terminals without active construction, present when construction impacts terminal operations. Used for construction impact awareness and trip planning."
        ),
      /**
       * Food service information for the terminal.
       */
      FoodServiceInfo: z
        .string()
        .nullable()
        .describe(
          "Food service hours, locations, and availability for terminal, as HTML-formatted text. E.g., galley hours and cafe information for Anacortes terminal, null when food service information is unavailable. Used for meal planning and food service availability."
        ),
      /**
       * ADA accessibility information for the terminal.
       */
      AdaInfo: z
        .string()
        .nullable()
        .describe(
          "ADA accessibility features, elevator access, and accommodation information for terminal, as HTML-formatted text. E.g., overhead passenger ramp and elevator access information for Anacortes terminal, null when ADA information is unavailable. Used for accessibility planning and accommodation requests."
        ),
      /**
       * Fare discount information for the terminal.
       */
      FareDiscountInfo: z
        .string()
        .nullable()
        .describe(
          "Fare discount programs, eligibility requirements, and purchase information for terminal, as HTML-formatted text. E.g., senior and youth fare information for Anacortes terminal, null when fare discount information is unavailable. Used for fare planning and discount eligibility."
        ),
      /**
       * Tally system information for the terminal.
       */
      TallySystemInfo: z
        .string()
        .nullable()
        .describe(
          "Tally system information for terminal operations, as HTML-formatted text. E.g., null for terminals without tally system documentation, present when tally system information is available. Used for operational information and system documentation."
        ),
      /**
       * Chamber of commerce information for the terminal.
       */
      ChamberOfCommerce: z
        .object({
          /** The URL of the chamber of commerce link. */
          LinkURL: z
            .string()
            .nullable()
            .describe(
              "URL link to local chamber of commerce website, as a web URL. E.g., 'http://www.anacortes.org' for Anacortes Chamber of Commerce, null when chamber link is unavailable. Used for local business and visitor information."
            ),
          /** The name of the chamber of commerce. */
          LinkName: z
            .string()
            .nullable()
            .describe(
              "Display name for local chamber of commerce, as a chamber name. E.g., 'Chamber of Commerce' for Anacortes, 'Bainbridge Island Chamber of Commerce' for Bainbridge Island, null when chamber name is unavailable. Used for display and identification."
            ),
          /**
           * A preferred sort order.
           */
          SortSeq: z
      .number()
      .int()
            .nullable()
            .describe(
              "Preferred display sort order for chamber of commerce link, as an integer sequence number. E.g., null for default sorting, numeric value when specific sort order is required. Used for controlling link display order."
            ),
        })
        .nullable()
        .describe(
          "Chamber of commerce information including link URL, name, and sort order for terminal, as a chamber object. E.g., object with Anacortes Chamber of Commerce link, null when chamber information is unavailable. Used for local business and visitor information."
        ),
      /**
       * Facility information for the terminal.
       */
      FacInfo: z
        .string()
        .nullable()
        .describe(
          "Facility advisory committee contact information for terminal, as HTML-formatted text. E.g., Ferry Advisory Committee contact information, null when facility information is unavailable. Used for community participation and feedback."
        ),
      /**
       * Resource status information for the terminal.
       */
      ResourceStatus: z
        .string()
        .nullable()
        .describe(
          "Resource status information for terminal operations, as a status string. E.g., null for terminals without resource status documentation, present when resource status information is available. Used for operational status tracking."
        ),
      /**
       * Type description for the terminal.
       */
      TypeDesc: z
        .string()
        .nullable()
        .describe(
          "Terminal type classification description, as a type string. E.g., 'Passenger and Car' for terminals like Anacortes and Bainbridge Island, null when type description is unavailable. Used for terminal classification and display."
        ),
      /**
       * Real-time shutoff flag for the terminal.
       */
      REALTIME_SHUTOFF_FLAG: z
        .boolean()
        .describe(
          "Indicator whether real-time conditions data is disabled for terminal, as a boolean. E.g., false for terminals with active real-time data, true when real-time data is shut off. Used to determine real-time data availability."
        ),
      /**
       * Real-time shutoff message for the terminal.
       */
      REALTIME_SHUTOFF_MESSAGE: z
        .string()
        .nullable()
        .describe(
          "Message explaining why real-time conditions data is unavailable, as a status message. E.g., 'The Real-Time Conditions are unavailable due to technical difficulties' for terminals with shutoff flag true, null when real-time data is available. Used to inform users about real-time data status."
        ),
      /**
       * Visitor links for the terminal.
       */
      VisitorLinks: z
        .array(transitLinkSchema)
        .nullable()
        .describe(
          "Links to visitor information and tourism resources for terminal area, as an array of visitor link objects. E.g., empty array for terminals without visitor links, array with tourism resources when available. Used for visitor information and local attractions."
        ),
    })
  )
  .describe(
    "Comprehensive terminal information combining data from terminalBasics, terminalBulletins, terminalLocations, terminalTransports, and terminalWaitTimes endpoints."
  );

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;

/**
 * GetAllTerminalVerboseDetails schema
 *
 * Returns all terminal verbose details.
 */
export const getAllTerminalVerboseSchema = z
  .array(terminalVerboseSchema)
  .describe("Array of comprehensive terminal information for all terminals.");

export type GetAllTerminalVerbose = z.infer<typeof getAllTerminalVerboseSchema>;
