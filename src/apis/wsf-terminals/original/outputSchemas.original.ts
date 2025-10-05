/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * CacheFlushDate schema
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zWsdotDate().describe(
  "If present, notes the date that certain service data was last changed (see description)."
);

export type TerminalsCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;

/**
 * Base terminal schema containing common fields shared across all terminal schemas
 */
export const terminalBaseSchema = z.object({
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  /** Identifies this terminal as a unique WSF subject. */
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  /**
   * Identifies the geographical region where the terminal is located.
   */
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  /** The name of the terminal. */
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  /** The terminal's abbreviation. */
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  /**
   * A preferred sort order (sort-ascending with respect to other terminals).
   */
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
});

export type TerminalBase = z.infer<typeof terminalBaseSchema>;

/**
 * TerminalBasicDetail schema
 *
 * This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalBasicSchema = terminalBaseSchema.extend({
  /**
   * Indicates whether or not overhead passenger loading is available.
   */
  OverheadPassengerLoading: z
    .boolean()
    .describe(
      "Indicates whether or not overhead passenger loading is available."
    ),
  /**
   * Indicates whether or not the terminal has an elevator.
   */
  Elevator: z
    .boolean()
    .describe("Indicates whether or not the terminal has an elevator."),
  /**
   * Indicates whether or not the terminal has a waiting room.
   */
  WaitingRoom: z
    .boolean()
    .describe("Indicates whether or not the terminal has a waiting room."),
  /**
   * Indicates whether or not the terminal offers food service.
   */
  FoodService: z
    .boolean()
    .describe("Indicates whether or not the terminal offers food service."),
  /**
   * Indicates whether or not the terminal has one or more restrooms.
   */
  Restroom: z
    .boolean()
    .describe(
      "Indicates whether or not the terminal has one or more restrooms."
    ),
});

export type TerminalBasic = z.infer<typeof terminalBasicSchema>;

/**
 * GetAllTerminalBasicDetails schema
 *
 * Returns all terminal basic details.
 */
export const getAllTerminalBasicSchema = z
  .array(terminalBasicSchema)
  .describe(
    "This operation retrieves the most basic / brief information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalBasic = z.infer<typeof getAllTerminalBasicSchema>;

/**
 * GetSpecificTerminalBasicDetail schema
 *
 * Returns basic details for a specific terminal.
 */
export const getSpecificTerminalBasicSchema = terminalBasicSchema;

export type GetSpecificTerminalBasic = z.infer<
  typeof getSpecificTerminalBasicSchema
>;

/**
 * Bulletin schema
 *
 * This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const bulletinSchema = z.object({
  /** The title of the bulletin. */
  BulletinTitle: z.string().nullable().describe("The title of the bulletin."),
  /** The content of the bulletin. */
  BulletinText: z.string().nullable().describe("The content of the bulletin."),
  /**
   * A preferred sort order (sort-ascending with respect to other bulletins in this list).
   */
  BulletinSortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other bulletins in this list)."
    ),
  /** The date that this bulletin was last updated. */
  BulletinLastUpdated: zWsdotDate()
    .nullable()
    .describe("The date that this bulletin was last updated."),
  /**
   * Legacy string representation of BulletinLastUpdated.
   */
  BulletinLastUpdatedSortable: z
    .string()
    .nullable()
    .describe("Legacy string representation of BulletinLastUpdated."),
});

export type Bulletin = z.infer<typeof bulletinSchema>;

/**
 * TerminalBulletin schema
 *
 * Contains terminal information with associated bulletins.
 */
export const terminalBulletinSchema = terminalBaseSchema.extend({
  /**
   * The bulletins / alerts associated with this terminal.
   */
  Bulletins: z
    .array(bulletinSchema)
    .describe("The bulletins / alerts associated with this terminal."),
});

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;

/**
 * GetAllTerminalBulletins schema
 *
 * Returns all terminal bulletins.
 */
export const getAllTerminalBulletinsSchema = z
  .array(terminalBulletinSchema)
  .describe(
    "This operation retrieves alerts and bulletins associated with terminals. Each terminal may have zero or more bulletins assigned to it. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalBulletins = z.infer<
  typeof getAllTerminalBulletinsSchema
>;

/**
 * GetSpecificTerminalBulletin schema
 *
 * Returns bulletins for a specific terminal.
 */
export const getSpecificTerminalBulletinSchema = terminalBulletinSchema;

export type GetSpecificTerminalBulletin = z.infer<
  typeof getSpecificTerminalBulletinSchema
>;

/**
 * DispGISZoomLoc schema
 *
 * Contains GIS zoom level location information.
 */
export const dispGISZoomLocSchema = z.object({
  /** The GIS zoom level. */
  ZoomLevel: z.number().int().describe("The GIS zoom level."),
  /** The terminal's latitude for this GIS zoom level. */
  Latitude: z
    .number()
    .nullable()
    .describe("The terminal's latitude for this GIS zoom level."),
  /** The terminal's longitude for this GIS zoom level. */
  Longitude: z
    .number()
    .nullable()
    .describe("The terminal's longitude for this GIS zoom level."),
});

export type DispGISZoomLoc = z.infer<typeof dispGISZoomLocSchema>;

/**
 * TerminalLocation schema
 *
 * This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalLocationSchema = terminalBaseSchema.extend({
  /** The latitude of the terminal. */
  Latitude: z.number().nullable().describe("The latitude of the terminal."),
  /** The longitude of the terminal. */
  Longitude: z.number().nullable().describe("The longitude of the terminal."),
  /** The first line of the terminal's address. */
  AddressLineOne: z
    .string()
    .nullable()
    .describe("The first line of the terminal's address."),
  /** The second line of the terminal's address. */
  AddressLineTwo: z
    .string()
    .nullable()
    .describe("The second line of the terminal's address."),
  /** The city where the terminal is located. */
  City: z
    .string()
    .nullable()
    .describe("The city where the terminal is located."),
  /** The state where the terminal is located. */
  State: z
    .string()
    .nullable()
    .describe("The state where the terminal is located."),
  /** The terminal's zip code. */
  ZipCode: z.string().nullable().describe("The terminal's zip code."),
  /** The country where the terminal is located. */
  Country: z
    .string()
    .nullable()
    .describe("The country where the terminal is located."),
  /** A URL to a page that displays the terminal on a GIS map. */
  MapLink: z
    .string()
    .nullable()
    .describe("A URL to a page that displays the terminal on a GIS map."),
  /** Instructions detailing how to drive to the terminal. */
  Directions: z
    .string()
    .nullable()
    .describe("Instructions detailing how to drive to the terminal."),
  /**
   * Where this terminal should appear on a GIS map (at various zoom levels).
   */
  DispGISZoomLoc: z
    .array(dispGISZoomLocSchema)
    .nullable()
    .describe(
      "Where this terminal should appear on a GIS map (at various zoom levels)."
    ),
});

export type TerminalLocation = z.infer<typeof terminalLocationSchema>;

/**
 * GetAllTerminalLocations schema
 *
 * Returns all terminal locations.
 */
export const getAllTerminalLocationsSchema = z
  .array(terminalLocationSchema)
  .describe(
    "This operation retrieves detailed location information pertaining to terminals. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalLocations = z.infer<
  typeof getAllTerminalLocationsSchema
>;

/**
 * GetSpecificTerminalLocation schema
 *
 * Returns location information for a specific terminal.
 */
export const getSpecificTerminalLocationSchema = terminalLocationSchema;

export type GetSpecificTerminalLocation = z.infer<
  typeof getSpecificTerminalLocationSchema
>;

/**
 * SpaceForArrivalTerminal schema
 *
 * Contains space information for arrival terminals.
 */
export const spaceForArrivalTerminalSchema = z.object({
  /**
   * Unique identifier for the next closest arrival terminal.
   */
  TerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the next closest arrival terminal."),
  /** The name of the arrival terminal. */
  TerminalName: z
    .string()
    .nullable()
    .describe("The name of the arrival terminal."),
  /**
   * Unique identifier for the vessel that's planned to service this departure.
   */
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),
  /**
   * The name of the vessel making this departure.
   */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),
  /**
   * Indicates whether or not reservable space should be displayed.
   */
  DisplayReservableSpace: z
    .boolean()
    .describe("Indicates whether or not reservable space should be displayed."),
  /**
   * The remaining reservable space available on the vessel.
   */
  ReservableSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining reservable space available on the vessel."),
  /**
   * A Hex color representing the ReservableSpaceCount.
   */
  ReservableSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing the ReservableSpaceCount."),
  /**
   * Indicates whether or not drive-up space should be displayed.
   */
  DisplayDriveUpSpace: z
    .boolean()
    .describe("Indicates whether or not drive-up space should be displayed."),
  /**
   * The remaining drive-up space available on the vessel.
   */
  DriveUpSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining drive-up space available on the vessel."),
  /**
   * A Hex color representing DriveUpSpaceCount.
   */
  DriveUpSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing DriveUpSpaceCount."),
  /**
   * The maximum space available on the vessel making this departure.
   */
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),
  /**
   * An list of integers representing all arrival terminals associated with this set of counts.
   */
  ArrivalTerminalIDs: z
    .array(z.number().int())
    .nullable()
    .describe(
      "An list of integers representing all arrival terminals associated with this set of counts."
    ),
});

export type SpaceForArrivalTerminal = z.infer<
  typeof spaceForArrivalTerminalSchema
>;

/**
 * DepartingSpace schema
 *
 * Contains departing space information.
 */
export const departingSpaceSchema = z.object({
  /** The date and time of the departure. */
  Departure: zWsdotDate().describe("The date and time of the departure."),
  /**
   * Indicates whether or not the departure is cancelled.
   */
  IsCancelled: z
    .boolean()
    .describe("Indicates whether or not the departure is cancelled."),
  /**
   * Unique identifier for the vessel that's planned to service this departure.
   */
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),
  /**
   * The name of the vessel making this departure.
   */
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),
  /**
   * The maximum space available on the vessel making this departure.
   */
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),
  /**
   * The available space for one or more destinations.
   */
  SpaceForArrivalTerminals: z
    .array(spaceForArrivalTerminalSchema)
    .nullable()
    .describe("The available space for one or more destinations."),
});

export type DepartingSpace = z.infer<typeof departingSpaceSchema>;

/**
 * TerminalSailingSpace schema
 *
 * This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalSailingSpaceSchema = terminalBaseSchema.extend({
  /**
   * The most recent departures leaving this terminal.
   */
  DepartingSpaces: z
    .array(departingSpaceSchema)
    .nullable()
    .describe("The most recent departures leaving this terminal."),
  /**
   * True if this terminal isn't capable of collecting fares.
   */
  IsNoFareCollected: z
    .boolean()
    .nullable()
    .describe("True if this terminal isn't capable of collecting fares."),
  /**
   * An optional message detailing how inability to collect fares could affect terminal conditions data.
   */
  NoFareCollectedMsg: z
    .string()
    .nullable()
    .describe(
      "An optional message detailing how inability to collect fares could affect terminal conditions data."
    ),
});

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;

/**
 * GetAllTerminalSailingSpace schema
 *
 * Returns all terminal sailing space information.
 */
export const getAllTerminalSailingSpaceSchema = z
  .array(terminalSailingSpaceSchema)
  .describe(
    "This operation reflects terminal condition data (the number of drive-up and reservation spaces available for select departures). A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalSailingSpace = z.infer<
  typeof getAllTerminalSailingSpaceSchema
>;

/**
 * GetSpecificTerminalSailingSpace schema
 *
 * Returns sailing space information for a specific terminal.
 */
export const getSpecificTerminalSailingSpaceSchema = terminalSailingSpaceSchema;

export type GetSpecificTerminalSailingSpace = z.infer<
  typeof getSpecificTerminalSailingSpaceSchema
>;

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

/**
 * WaitTime schema
 *
 * Contains wait time information.
 */
export const waitTimeSchema = z.object({
  /**
   * Unique identifier for the route associated with this wait time.
   */
  RouteID: z
    .number()
    .int()
    .nullable()
    .describe(
      "Unique identifier for the route associated with this wait time."
    ),
  /** The name of the route associated with this wait time. */
  RouteName: z
    .string()
    .nullable()
    .describe("The name of the route associated with this wait time."),
  /**
   * Notes detailing wait time conditions along with tips for vehicles and passengers.
   */
  WaitTimeNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions along with tips for vehicles and passengers."
    ),
  /**
   * The date this wait time information was last updated.
   */
  WaitTimeLastUpdated: zWsdotDate()
    .nullable()
    .describe("The date this wait time information was last updated."),
  /**
   * Notes detailing wait time conditions (tailored for text to speech systems).
   */
  WaitTimeIVRNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions (tailored for text to speech systems)."
    ),
});

export type WaitTime = z.infer<typeof waitTimeSchema>;

/**
 * TerminalWaitTime schema
 *
 * This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalWaitTimeSchema = terminalBaseSchema.extend({
  /**
   * The wait times associated with this terminal.
   */
  WaitTimes: z
    .array(waitTimeSchema)
    .nullable()
    .describe("The wait times associated with this terminal."),
});

export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

/**
 * GetAllTerminalWaitTimes schema
 *
 * Returns all terminal wait times.
 */
export const getAllTerminalWaitTimesSchema = z
  .array(terminalWaitTimeSchema)
  .describe(
    "This operation retrieves tips and wait time conditions for both vehicles and walk-on passengers. A TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal."
  );

export type GetAllTerminalWaitTimes = z.infer<
  typeof getAllTerminalWaitTimesSchema
>;

/**
 * GetSpecificTerminalWaitTime schema
 *
 * Returns wait time information for a specific terminal.
 */
export const getSpecificTerminalWaitTimeSchema = terminalWaitTimeSchema;

export type GetSpecificTerminalWaitTime = z.infer<
  typeof getSpecificTerminalWaitTimeSchema
>;

/**
 * TerminalVerbose schema
 *
 * This operation retrieves highly detailed information pertaining to terminals. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. TerminalID, or unique terminal identifier, may be optionally passed to retrieve a specific terminal.
 */
export const terminalVerboseSchema = terminalBasicSchema
  .and(terminalBulletinSchema)
  .and(terminalLocationSchema)
  .and(terminalSailingSpaceSchema)
  .and(terminalTransportationOptionSchema)
  .and(terminalWaitTimeSchema)
  .and(
    z.object({
      /**
       * An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares.
       */
      RealtimeIntroMsg: z
        .string()
        .nullable()
        .describe(
          "An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares."
        ),
      /**
       * Additional information about the terminal.
       */
      AdditionalInfo: z
        .string()
        .nullable()
        .describe("Additional information about the terminal."),
      /**
       * Lost and found information for the terminal.
       */
      LostAndFoundInfo: z
        .string()
        .nullable()
        .describe("Lost and found information for the terminal."),
      /**
       * Security information for the terminal.
       */
      SecurityInfo: z
        .string()
        .nullable()
        .describe("Security information for the terminal."),
      /**
       * Construction information for the terminal.
       */
      ConstructionInfo: z
        .string()
        .nullable()
        .describe("Construction information for the terminal."),
      /**
       * Food service information for the terminal.
       */
      FoodServiceInfo: z
        .string()
        .nullable()
        .describe("Food service information for the terminal."),
      /**
       * ADA accessibility information for the terminal.
       */
      AdaInfo: z
        .string()
        .nullable()
        .describe("ADA accessibility information for the terminal."),
      /**
       * Fare discount information for the terminal.
       */
      FareDiscountInfo: z
        .string()
        .nullable()
        .describe("Fare discount information for the terminal."),
      /**
       * Tally system information for the terminal.
       */
      TallySystemInfo: z
        .string()
        .nullable()
        .describe("Tally system information for the terminal."),
      /**
       * Chamber of commerce information for the terminal.
       */
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
          /**
           * A preferred sort order.
           */
          SortSeq: z.number().int().describe("A preferred sort order."),
        })
        .nullable()
        .describe("Chamber of commerce information for the terminal."),
      /**
       * Facility information for the terminal.
       */
      FacInfo: z
        .string()
        .nullable()
        .describe("Facility information for the terminal."),
      /**
       * Resource status information for the terminal.
       */
      ResourceStatus: z
        .string()
        .nullable()
        .describe("Resource status information for the terminal."),
      /**
       * Type description for the terminal.
       */
      TypeDesc: z
        .string()
        .nullable()
        .describe("Type description for the terminal."),
      /**
       * Real-time shutoff flag for the terminal.
       */
      REALTIME_SHUTOFF_FLAG: z
        .boolean()
        .describe("Real-time shutoff flag for the terminal."),
      /**
       * Real-time shutoff message for the terminal.
       */
      REALTIME_SHUTOFF_MESSAGE: z
        .string()
        .nullable()
        .describe("Real-time shutoff message for the terminal."),
      /**
       * Visitor links for the terminal.
       */
      VisitorLinks: z
        .array(transitLinkSchema)
        .nullable()
        .describe("Visitor links for the terminal."),
    })
  );

export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;

/**
 * GetAllTerminalVerboseDetails schema
 *
 * Returns all terminal verbose details.
 */
export const getAllTerminalVerboseSchema = z
  .array(terminalVerboseSchema)
  .describe("Returns all terminal verbose details.");

export type GetAllTerminalVerbose = z.infer<typeof getAllTerminalVerboseSchema>;

/**
 * GetSpecificTerminalVerboseDetail schema
 *
 * Returns verbose details for a specific terminal.
 */
export const getSpecificTerminalVerboseSchema = terminalVerboseSchema;

export type GetSpecificTerminalVerbose = z.infer<
  typeof getSpecificTerminalVerboseSchema
>;
