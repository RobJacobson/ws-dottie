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
 * Contains the cache flush date for terminal data.
 */
export const cacheFlushDateSchema = zWsdotDate().describe(
  "If present, notes the date that certain service data was last changed (see description)."
);

export type CacheFlushDate = z.infer<typeof cacheFlushDateSchema>;

/**
 * TerminalBasicDetail schema
 *
 * Contains basic terminal information.
 */
export const terminalBasicDetailSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
  OverheadPassengerLoading: z
    .boolean()
    .describe(
      "Indicates whether or not overhead passenger loading is available."
    ),
  Elevator: z
    .boolean()
    .describe("Indicates whether or not the terminal has an elevator."),
  WaitingRoom: z
    .boolean()
    .describe("Indicates whether or not the terminal has a waiting room."),
  FoodService: z
    .boolean()
    .describe("Indicates whether or not the terminal offers food service."),
  Restroom: z
    .boolean()
    .describe(
      "Indicates whether or not the terminal has one or more restrooms."
    ),
});

export type TerminalBasicDetail = z.infer<typeof terminalBasicDetailSchema>;

/**
 * GetAllTerminalBasicDetails schema
 *
 * Returns all terminal basic details.
 */
export const getAllTerminalBasicDetailsSchema = z
  .array(terminalBasicDetailSchema)
  .describe("Returns all terminal basic details.");

export type GetAllTerminalBasicDetails = z.infer<
  typeof getAllTerminalBasicDetailsSchema
>;

/**
 * GetSpecificTerminalBasicDetail schema
 *
 * Returns basic details for a specific terminal.
 */
export const getSpecificTerminalBasicDetailSchema = terminalBasicDetailSchema;

export type GetSpecificTerminalBasicDetail = z.infer<
  typeof getSpecificTerminalBasicDetailSchema
>;

/**
 * Bulletin schema
 *
 * Contains bulletin information for a terminal.
 */
export const bulletinSchema = z.object({
  BulletinTitle: z.string().nullable().describe("The title of the bulletin."),
  BulletinText: z.string().nullable().describe("The content of the bulletin."),
  BulletinSortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other bulletins in this array)."
    ),
  BulletinLastUpdated: zWsdotDate()
    .nullable()
    .describe("The date that this bulletin was last updated."),
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
export const terminalBulletinSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
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
  .describe("Returns all terminal bulletins.");

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
  ZoomLevel: z.number().int().describe("The GIS zoom level."),
  Latitude: z
    .number()
    .nullable()
    .describe("The terminal's latitude for this GIS zoom level."),
  Longitude: z
    .number()
    .nullable()
    .describe("The terminal's longitude for this GIS zoom level."),
});

export type DispGISZoomLoc = z.infer<typeof dispGISZoomLocSchema>;

/**
 * TerminalLocation schema
 *
 * Contains detailed location information for a terminal.
 */
export const terminalLocationSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
  Latitude: z.number().nullable().describe("The latitude of the terminal."),
  Longitude: z.number().nullable().describe("The longitude of the terminal."),
  AddressLineOne: z
    .string()
    .nullable()
    .describe("The first line of the terminal's address."),
  AddressLineTwo: z
    .string()
    .nullable()
    .describe("The second line of the terminal's address."),
  City: z
    .string()
    .nullable()
    .describe("The city where the terminal is located."),
  State: z
    .string()
    .nullable()
    .describe("The state where the terminal is located."),
  ZipCode: z.string().nullable().describe("The terminal's zip code."),
  Country: z
    .string()
    .nullable()
    .describe("The country where the terminal is located."),
  MapLink: z
    .string()
    .nullable()
    .describe("A URL to a page that displays the terminal on a GIS map."),
  Directions: z
    .string()
    .nullable()
    .describe("Instructions detailing how to drive to the terminal."),
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
  .describe("Returns all terminal locations.");

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
  TerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the next closest arrival terminal."),
  TerminalName: z
    .string()
    .nullable()
    .describe("The name of the arrival terminal."),
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),
  DisplayReservableSpace: z
    .boolean()
    .describe("Indicates whether or not reservable space should be displayed."),
  ReservableSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining reservable space available on the vessel."),
  ReservableSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing the ReservableSpaceCount."),
  DisplayDriveUpSpace: z
    .boolean()
    .describe("Indicates whether or not drive-up space should be displayed."),
  DriveUpSpaceCount: z
    .number()
    .int()
    .nullable()
    .describe("The remaining drive-up space available on the vessel."),
  DriveUpSpaceHexColor: z
    .string()
    .nullable()
    .describe("A Hex color representing DriveUpSpaceCount."),
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),
  ArrivalTerminalIDs: z
    .array(z.number().int())
    .nullable()
    .describe(
      "An array of integers representing all arrival terminals associated with this set of counts."
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
  Departure: zWsdotDate().describe("The date and time of the departure."),
  IsCancelled: z
    .boolean()
    .describe("Indicates whether or not the departure is cancelled."),
  VesselID: z
    .number()
    .int()
    .describe("Unique identifier for the vessel making this departure."),
  VesselName: z
    .string()
    .nullable()
    .describe("The name of the vessel making this departure."),
  MaxSpaceCount: z
    .number()
    .int()
    .describe(
      "The maximum space available on the vessel making this departure."
    ),
  SpaceForArrivalTerminals: z
    .array(spaceForArrivalTerminalSchema)
    .nullable()
    .describe("The available space for one or more destinations."),
});

export type DepartingSpace = z.infer<typeof departingSpaceSchema>;

/**
 * TerminalSailingSpace schema
 *
 * Contains terminal sailing space information.
 */
export const terminalSailingSpaceSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
  DepartingSpaces: z
    .array(departingSpaceSchema)
    .nullable()
    .describe("The most recent departures leaving this terminal."),
  IsNoFareCollected: z
    .boolean()
    .nullable()
    .describe("True if this terminal isn't capable of collecting fares."),
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
  .describe("Returns all terminal sailing space information.");

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
  LinkURL: z.string().nullable().describe("The URL of the transit link."),
  LinkName: z.string().nullable().describe("The name of the transit agency."),
  SortSeq: z
    .number()
    .int()
    .nullable()
    .describe(
      "A preferred sort order (sort-ascending with respect to other transit links in this array)."
    ),
});

export type TransitLink = z.infer<typeof transitLinkSchema>;

/**
 * TerminalTransportationOption schema
 *
 * Contains terminal transportation options.
 */
export const terminalTransportationOptionSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
  ParkingInfo: z
    .string()
    .nullable()
    .describe("Parking information for this terminal."),
  ParkingShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking-related shuttles that service this terminal."
    ),
  AirportInfo: z
    .string()
    .nullable()
    .describe("Tips for commuting to this terminal from the airport."),
  AirportShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking shuttles that go between the airport and this terminal."
    ),
  MotorcycleInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a motorcycle to this terminal."
    ),
  TruckInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a truck to this terminal."
    ),
  BikeInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking their bicycle to this terminal."
    ),
  TrainInfo: z
    .string()
    .nullable()
    .describe("Information about trains that service this terminal."),
  TaxiInfo: z
    .string()
    .nullable()
    .describe("Information about taxis that service this terminal."),
  HovInfo: z
    .string()
    .nullable()
    .describe("Tips for carpool/vanpools commuting to this terminal."),
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
  .describe("Returns all terminal transportation options.");

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
  RouteID: z
    .number()
    .int()
    .nullable()
    .describe(
      "Unique identifier for the route associated with this wait time."
    ),
  RouteName: z
    .string()
    .nullable()
    .describe("The name of the route associated with this wait time."),
  WaitTimeNotes: z
    .string()
    .nullable()
    .describe(
      "Notes detailing wait time conditions along with tips for vehicles and passengers."
    ),
  WaitTimeLastUpdated: zWsdotDate()
    .nullable()
    .describe("The date this wait time information was last updated."),
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
 * Contains terminal wait time information.
 */
export const terminalWaitTimeSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
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
  .describe("Returns all terminal wait times.");

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
 * TerminalVerboseDetail schema
 *
 * Contains comprehensive terminal information including all other terminal data.
 */
export const terminalVerboseDetailSchema = z.object({
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  TerminalSubjectID: z
    .number()
    .int()
    .describe("Identifies this terminal as a unique WSF subject."),
  RegionID: z
    .number()
    .int()
    .describe(
      "Identifies the geographical region where the terminal is located."
    ),
  TerminalName: z.string().nullable().describe("The name of the terminal."),
  TerminalAbbrev: z
    .string()
    .nullable()
    .describe("The terminal's abbreviation."),
  SortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other terminals)."
    ),
  OverheadPassengerLoading: z
    .boolean()
    .describe(
      "Indicates whether or not overhead passenger loading is available."
    ),
  Elevator: z
    .boolean()
    .describe("Indicates whether or not the terminal has an elevator."),
  WaitingRoom: z
    .boolean()
    .describe("Indicates whether or not the terminal has a waiting room."),
  FoodService: z
    .boolean()
    .describe("Indicates whether or not the terminal offers food service."),
  Restroom: z
    .boolean()
    .describe(
      "Indicates whether or not the terminal has one or more restrooms."
    ),
  Bulletins: z
    .array(bulletinSchema)
    .nullable()
    .describe("The bulletins / alerts associated with this terminal."),
  Latitude: z.number().nullable().describe("The latitude of the terminal."),
  Longitude: z.number().nullable().describe("The longitude of the terminal."),
  AddressLineOne: z
    .string()
    .nullable()
    .describe("The first line of the terminal's address."),
  AddressLineTwo: z
    .string()
    .nullable()
    .describe("The second line of the terminal's address."),
  City: z
    .string()
    .nullable()
    .describe("The city where the terminal is located."),
  State: z
    .string()
    .nullable()
    .describe("The state where the terminal is located."),
  ZipCode: z.string().nullable().describe("The terminal's zip code."),
  Country: z
    .string()
    .nullable()
    .describe("The country where the terminal is located."),
  MapLink: z
    .string()
    .nullable()
    .describe("A URL to a page that displays the terminal on a GIS map."),
  Directions: z
    .string()
    .nullable()
    .describe("Instructions detailing how to drive to the terminal."),
  DispGISZoomLoc: z
    .array(dispGISZoomLocSchema)
    .nullable()
    .describe(
      "Where this terminal should appear on a GIS map (at various zoom levels)."
    ),
  DepartingSpaces: z
    .array(departingSpaceSchema)
    .nullable()
    .describe("The most recent departures leaving this terminal."),
  IsNoFareCollected: z
    .boolean()
    .nullable()
    .describe("True if this terminal isn't capable of collecting fares."),
  NoFareCollectedMsg: z
    .string()
    .nullable()
    .describe(
      "An optional message detailing how inability to collect fares could affect terminal conditions data."
    ),
  ParkingInfo: z
    .string()
    .nullable()
    .describe("Parking information for this terminal."),
  ParkingShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking-related shuttles that service this terminal."
    ),
  AirportInfo: z
    .string()
    .nullable()
    .describe("Tips for commuting to this terminal from the airport."),
  AirportShuttleInfo: z
    .string()
    .nullable()
    .describe(
      "Information about parking shuttles that go between the airport and this terminal."
    ),
  MotorcycleInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a motorcycle to this terminal."
    ),
  TruckInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking a truck to this terminal."
    ),
  BikeInfo: z
    .string()
    .nullable()
    .describe(
      "Information for travelers who plan on taking their bicycle to this terminal."
    ),
  TrainInfo: z
    .string()
    .nullable()
    .describe("Information about trains that service this terminal."),
  TaxiInfo: z
    .string()
    .nullable()
    .describe("Information about taxis that service this terminal."),
  HovInfo: z
    .string()
    .nullable()
    .describe("Tips for carpool/vanpools commuting to this terminal."),
  TransitLinks: z
    .array(transitLinkSchema)
    .nullable()
    .describe("Links to transit agencies that service this terminal."),
  WaitTimes: z
    .array(waitTimeSchema)
    .nullable()
    .describe("The wait times associated with this terminal."),
  RealtimeIntroMsg: z
    .string()
    .nullable()
    .describe(
      "An optional intro message for terminal conditions data that pertains to terminals capable of collecting fares."
    ),
  AdditionalInfo: z
    .string()
    .nullable()
    .describe("Additional information about the terminal."),
  LostAndFoundInfo: z
    .string()
    .nullable()
    .describe("Lost and found information for the terminal."),
  SecurityInfo: z
    .string()
    .nullable()
    .describe("Security information for the terminal."),
  ConstructionInfo: z
    .string()
    .nullable()
    .describe("Construction information for the terminal."),
  FoodServiceInfo: z
    .string()
    .nullable()
    .describe("Food service information for the terminal."),
  AdaInfo: z
    .string()
    .nullable()
    .describe("ADA accessibility information for the terminal."),
  FareDiscountInfo: z
    .string()
    .nullable()
    .describe("Fare discount information for the terminal."),
  TallySystemInfo: z
    .string()
    .nullable()
    .describe("Tally system information for the terminal."),
  ChamberOfCommerce: z
    .object({
      LinkURL: z
        .string()
        .nullable()
        .describe("The URL of the chamber of commerce link."),
      LinkName: z
        .string()
        .nullable()
        .describe("The name of the chamber of commerce."),
      SortSeq: z.number().int().describe("A preferred sort order."),
    })
    .nullable()
    .describe("Chamber of commerce information for the terminal."),
  FacInfo: z
    .string()
    .nullable()
    .describe("Facility information for the terminal."),
  ResourceStatus: z
    .string()
    .nullable()
    .describe("Resource status information for the terminal."),
  TypeDesc: z
    .string()
    .nullable()
    .describe("Type description for the terminal."),
  REALTIME_SHUTOFF_FLAG: z
    .boolean()
    .describe("Real-time shutoff flag for the terminal."),
  REALTIME_SHUTOFF_MESSAGE: z
    .string()
    .nullable()
    .describe("Real-time shutoff message for the terminal."),
  VisitorLinks: z
    .array(transitLinkSchema)
    .nullable()
    .describe("Visitor links for the terminal."),
});

export type TerminalVerboseDetail = z.infer<typeof terminalVerboseDetailSchema>;

/**
 * GetAllTerminalVerboseDetails schema
 *
 * Returns all terminal verbose details.
 */
export const getAllTerminalVerboseDetailsSchema = z
  .array(terminalVerboseDetailSchema)
  .describe("Returns all terminal verbose details.");

export type GetAllTerminalVerboseDetails = z.infer<
  typeof getAllTerminalVerboseDetailsSchema
>;

/**
 * GetSpecificTerminalVerboseDetail schema
 *
 * Returns verbose details for a specific terminal.
 */
export const getSpecificTerminalVerboseDetailSchema =
  terminalVerboseDetailSchema;

export type GetSpecificTerminalVerboseDetail = z.infer<
  typeof getSpecificTerminalVerboseDetailSchema
>;
