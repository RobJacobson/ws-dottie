import { z } from "zod";

import { zWsdotDate } from "@/shared/validation";

/**
 * WSF Terminals API Output Schemas
 *
 * This file contains all output/response schemas for the Washington State Ferries
 * Terminals API. These schemas validate and transform API responses, ensuring
 * type safety and providing rich descriptions for MCP discoverability.
 */

// ============================================================================
// BASE SCHEMAS
// ============================================================================

export const terminalBasicsSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "Indicates whether the terminal supports overhead passenger loading. True if passengers can board from an elevated platform."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicates whether the terminal has elevator access. True if passengers with mobility needs can access the terminal via elevator."
      ),
    WaitingRoom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has a waiting room. True if passengers can wait indoors before boarding."
      ),
    FoodService: z
      .boolean()
      .describe(
        "Indicates whether the terminal offers food service. True if food and beverages are available for purchase."
      ),
    Restroom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has restroom facilities. True if public restrooms are available for passengers."
      ),
  })
  .describe(
    "Basic terminal information including core details like name, location, and basic amenities. Used for quick terminal identification and basic facility information."
  );

export const terminalBulletinItemSchema = z
  .object({
    BulletinTitle: z
      .string()
      .min(1)
      .describe(
        "Title of the bulletin or announcement. Provides a brief, descriptive heading for the bulletin content."
      ),
    BulletinText: z
      .string()
      .describe(
        "Full text content of the bulletin or announcement. Contains the complete message or information being communicated to passengers."
      ),
    BulletinSortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence for the bulletin. Used to determine the display order of multiple bulletins at a terminal."
      ),
    BulletinLastUpdated: zWsdotDate()
      .optional()
      .describe(
        "Timestamp when the bulletin was last updated. Indicates when the information was most recently modified."
      ),
    BulletinLastUpdatedSortable: z
      .string()
      .optional()
      .describe(
        "Sortable string representation of the last update timestamp. Used for chronological sorting of bulletins."
      ),
  })
  .describe(
    "Individual bulletin or announcement item displayed at a terminal. Contains important information, alerts, or notices for passengers."
  );

export const terminalBulletinSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    Bulletins: z
      .array(terminalBulletinItemSchema)
      .describe(
        "Array of bulletins and announcements for this terminal. Contains important information, alerts, and notices for passengers."
      ),
  })
  .describe(
    "Terminal information with associated bulletins and announcements. Provides both basic terminal details and current information for passengers."
  );

export const terminalLocationSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    AddressLineOne: z
      .string()
      .min(1)
      .describe(
        "Primary address line for the terminal. Contains the street address and building information."
      ),
    AddressLineTwo: z
      .string()
      .nullable()
      .describe(
        "Secondary address line for the terminal. Contains additional address information such as suite numbers or building details."
      ),
    City: z
      .string()
      .min(1)
      .describe(
        "City where the terminal is located. Provides the municipality or city name for the terminal address."
      ),
    State: z
      .string()
      .min(1)
      .describe(
        "State where the terminal is located. Provides the state or province name for the terminal address."
      ),
    ZipCode: z
      .string()
      .min(1)
      .describe(
        "ZIP or postal code for the terminal address. Used for mail delivery and geographic identification."
      ),
    Country: z
      .string()
      .min(1)
      .describe(
        "Country where the terminal is located. Provides the country name for the terminal address."
      ),
    Latitude: z
      .number()
      .describe(
        "Geographic latitude coordinate of the terminal. Used for mapping and location services."
      ),
    Longitude: z
      .number()
      .describe(
        "Geographic longitude coordinate of the terminal. Used for mapping and location services."
      ),
    Directions: z
      .string()
      .nullable()
      .describe(
        "Text directions to the terminal. Provides step-by-step instructions for reaching the terminal by various transportation methods."
      ),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z
              .number()
              .describe(
                "Latitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            Longitude: z
              .number()
              .describe(
                "Longitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            ZoomLevel: z
              .number()
              .int()
              .min(0)
              .describe(
                "Recommended zoom level for displaying this location on a map. Ensures optimal visibility of the terminal."
              ),
          })
          .describe(
            "GIS display location with recommended zoom level. Used for mapping applications to show terminal locations optimally."
          )
      )
      .describe(
        "Array of GIS display locations for the terminal. Contains coordinates and zoom levels for optimal map display."
      ),
    MapLink: z
      .string()
      .nullable()
      .describe(
        "URL link to an online map showing the terminal location. Provides direct access to mapping services for the terminal."
      ),
  })
  .describe(
    "Complete location information for a terminal including address, coordinates, directions, and mapping resources. Used for navigation and location services."
  );

export const terminalArrivalSpaceSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    VesselID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the vessel. Used to identify specific ferries in the WSF fleet."
      ),
    VesselName: z
      .string()
      .min(1)
      .describe(
        "Name of the vessel. Provides the human-readable name for the ferry."
      ),
    DisplayReservableSpace: z
      .boolean()
      .describe(
        "Indicates whether reservable space information should be displayed. True if reservations are available for this route."
      ),
    ReservableSpaceCount: z
      .number()
      .int()
      .min(0)
      .nullable()
      .describe(
        "Number of reservable spaces available. Indicates how many vehicles can make reservations for this sailing."
      ),
    ReservableSpaceHexColor: z
      .string()
      .nullable()
      .describe(
        "Hex color code for displaying reservable space status. Used for visual indicators of space availability."
      ),
    DisplayDriveUpSpace: z
      .boolean()
      .describe(
        "Indicates whether drive-up space information should be displayed. True if drive-up spaces are available."
      ),
    DriveUpSpaceCount: z
      .number()
      .int()
      .min(0)
      .describe(
        "Number of drive-up spaces available. Indicates how many vehicles can board without reservations."
      ),
    DriveUpSpaceHexColor: z
      .string()
      .describe(
        "Hex color code for displaying drive-up space status. Used for visual indicators of space availability."
      ),
    MaxSpaceCount: z
      .number()
      .int()
      .positive()
      .describe(
        "Maximum number of vehicle spaces on the vessel. Indicates the total capacity for vehicles on this sailing."
      ),
    ArrivalTerminalIDs: z
      .array(z.number().int().positive())
      .describe(
        "Array of terminal IDs where this vessel will arrive. Used to track the vessel's route and destinations."
      ),
  })
  .describe(
    "Space availability information for a specific vessel arriving at a terminal. Contains details about reservable and drive-up spaces."
  );

export const terminalDepartingSpaceSchema = z
  .object({
    Departure: zWsdotDate().describe(
      "Scheduled departure time for the sailing. Indicates when the vessel is scheduled to leave the terminal."
    ),
    IsCancelled: z
      .boolean()
      .describe(
        "Indicates whether the sailing has been cancelled. True if the scheduled sailing will not operate."
      ),
    VesselID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the vessel. Used to identify specific ferries in the WSF fleet."
      ),
    VesselName: z
      .string()
      .min(1)
      .describe(
        "Name of the vessel. Provides the human-readable name for the ferry."
      ),
    MaxSpaceCount: z
      .number()
      .int()
      .positive()
      .describe(
        "Maximum number of vehicle spaces on the vessel. Indicates the total capacity for vehicles on this sailing."
      ),
    SpaceForArrivalTerminals: z
      .array(terminalArrivalSpaceSchema)
      .describe(
        "Space availability information for each arrival terminal. Contains details about reservable and drive-up spaces for each destination."
      ),
  })
  .describe(
    "Departing sailing information with space availability details. Contains departure time, vessel information, and space availability for all destinations."
  );

export const terminalSailingSpaceSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    DepartingSpaces: z
      .array(terminalDepartingSpaceSchema)
      .describe(
        "Array of departing sailings with space availability information. Contains all scheduled departures and their space details."
      ),
    IsNoFareCollected: z
      .boolean()
      .nullable()
      .describe(
        "Indicates whether fares are collected at this terminal. True if no fare collection occurs at this location."
      ),
    NoFareCollectedMsg: z
      .string()
      .nullable()
      .describe(
        "Message explaining why no fare is collected. Provides information about fare collection policies at this terminal."
      ),
  })
  .describe(
    "Complete sailing space information for a terminal including all departing sailings and their space availability details."
  );

export const terminalTransitLinkSchema = z
  .object({
    LinkName: z
      .string()
      .describe(
        "Name of the transit link. Provides a descriptive title for the transportation option."
      ),
    LinkURL: z
      .string()
      .describe(
        "URL for the transit link. Provides direct access to information about the transportation option."
      ),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "Sort sequence for the transit link. Used to determine the display order of multiple transit options."
      ),
  })
  .describe(
    "Transit link information providing access to transportation options. Contains links to bus, train, and other transit services."
  );

export const terminalTransportSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    ParkingInfo: z
      .string()
      .describe(
        "Information about parking facilities at the terminal. Contains details about parking availability, rates, and restrictions."
      ),
    ParkingShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about parking shuttle services. Contains details about shuttle schedules and routes to parking areas."
      ),
    AirportInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport connections. Contains details about airport shuttle services and transportation options."
      ),
    AirportShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport shuttle services. Contains details about shuttle schedules and routes to airports."
      ),
    MotorcycleInfo: z
      .string()
      .describe(
        "Information about motorcycle access and parking. Contains details about motorcycle-specific facilities and policies."
      ),
    TruckInfo: z
      .string()
      .describe(
        "Information about truck access and parking. Contains details about truck-specific facilities and policies."
      ),
    BikeInfo: z
      .string()
      .nullable()
      .describe(
        "Information about bicycle access and parking. Contains details about bike racks and bicycle-friendly facilities."
      ),
    TrainInfo: z
      .string()
      .nullable()
      .describe(
        "Information about train connections. Contains details about nearby train stations and rail services."
      ),
    TaxiInfo: z
      .string()
      .nullable()
      .describe(
        "Information about taxi services. Contains details about taxi availability and pickup locations."
      ),
    HovInfo: z
      .string()
      .nullable()
      .describe(
        "Information about High Occupancy Vehicle (HOV) access. Contains details about HOV lanes and carpooling options."
      ),
    TransitLinks: z
      .array(terminalTransitLinkSchema)
      .describe(
        "Array of transit links providing access to various transportation options. Contains links to bus, train, and other transit services."
      ),
  })
  .describe(
    "Complete transportation information for a terminal including parking, shuttle services, and transit connections. Used for planning access to terminals."
  );

export const terminalWaitTimeSchema = z
  .object({
    RouteID: z
      .number()
      .int()
      .positive()
      .nullable()
      .describe(
        "Unique identifier for the route. Used to identify specific ferry routes in the WSF system."
      ),
    RouteName: z
      .string()
      .nullable()
      .describe(
        "Name of the route. Provides the human-readable name for the ferry route."
      ),
    WaitTimeIVRNotes: z
      .string()
      .nullable()
      .describe(
        "Interactive Voice Response notes for wait times. Contains automated phone system information about current wait times."
      ),
    WaitTimeLastUpdated: zWsdotDate().describe(
      "Timestamp when the wait time information was last updated. Indicates the freshness of the wait time data."
    ),
    WaitTimeNotes: z
      .string()
      .nullable()
      .describe(
        "Additional notes about wait times. Contains supplementary information about current wait time conditions."
      ),
  })
  .describe(
    "Wait time information for a specific route at a terminal. Contains current wait times and related notes for passengers."
  );

export const terminalWaitTimesSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    WaitTimes: z
      .array(terminalWaitTimeSchema)
      .describe(
        "Array of wait time information for all routes at this terminal. Contains current wait times for each route serving this terminal."
      ),
  })
  .describe(
    "Complete wait time information for a terminal including all routes and their current wait times. Used for planning travel and managing expectations."
  );

export const terminalVerboseSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .positive()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .positive()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .min(1)
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .min(1)
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    AddressLineOne: z
      .string()
      .min(1)
      .describe(
        "Primary address line for the terminal. Contains the street address and building information."
      ),
    AddressLineTwo: z
      .string()
      .nullable()
      .describe(
        "Secondary address line for the terminal. Contains additional address information such as suite numbers or building details."
      ),
    City: z
      .string()
      .min(1)
      .describe(
        "City where the terminal is located. Provides the municipality or city name for the terminal address."
      ),
    State: z
      .string()
      .min(1)
      .describe(
        "State where the terminal is located. Provides the state or province name for the terminal address."
      ),
    ZipCode: z
      .string()
      .min(1)
      .describe(
        "ZIP or postal code for the terminal address. Used for mail delivery and geographic identification."
      ),
    Country: z
      .string()
      .min(1)
      .describe(
        "Country where the terminal is located. Provides the country name for the terminal address."
      ),
    Latitude: z
      .number()
      .describe(
        "Geographic latitude coordinate of the terminal. Used for mapping and location services."
      ),
    Longitude: z
      .number()
      .describe(
        "Geographic longitude coordinate of the terminal. Used for mapping and location services."
      ),
    Directions: z
      .string()
      .nullable()
      .describe(
        "Text directions to the terminal. Provides step-by-step instructions for reaching the terminal by various transportation methods."
      ),
    DispGISZoomLoc: z
      .array(
        z
          .object({
            Latitude: z
              .number()
              .describe(
                "Latitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            Longitude: z
              .number()
              .describe(
                "Longitude coordinate for GIS display. Used for mapping applications and location services."
              ),
            ZoomLevel: z
              .number()
              .int()
              .min(0)
              .describe(
                "Recommended zoom level for displaying this location on a map. Ensures optimal visibility of the terminal."
              ),
          })
          .describe(
            "GIS display location with recommended zoom level. Used for mapping applications to show terminal locations optimally."
          )
      )
      .describe(
        "Array of GIS display locations for the terminal. Contains coordinates and zoom levels for optimal map display."
      ),
    MapLink: z
      .string()
      .nullable()
      .describe(
        "URL link to an online map showing the terminal location. Provides direct access to mapping services for the terminal."
      ),
    Elevator: z
      .boolean()
      .describe(
        "Indicates whether the terminal has elevator access. True if passengers with mobility needs can access the terminal via elevator."
      ),
    WaitingRoom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has a waiting room. True if passengers can wait indoors before boarding."
      ),
    FoodService: z
      .boolean()
      .describe(
        "Indicates whether the terminal offers food service. True if food and beverages are available for purchase."
      ),
    Restroom: z
      .boolean()
      .describe(
        "Indicates whether the terminal has restroom facilities. True if public restrooms are available for passengers."
      ),
    OverheadPassengerLoading: z
      .boolean()
      .describe(
        "Indicates whether the terminal supports overhead passenger loading. True if passengers can board from an elevated platform."
      ),
    IsNoFareCollected: z
      .boolean()
      .nullable()
      .describe(
        "Indicates whether fares are collected at this terminal. True if no fare collection occurs at this location."
      ),
    NoFareCollectedMsg: z
      .string()
      .nullable()
      .describe(
        "Message explaining why no fare is collected. Provides information about fare collection policies at this terminal."
      ),
    AdaInfo: z
      .string()
      .nullable()
      .describe(
        "Americans with Disabilities Act information. Contains details about accessibility features and accommodations."
      ),
    AdditionalInfo: z
      .string()
      .nullable()
      .describe(
        "Additional information about the terminal. Contains miscellaneous details and special instructions for passengers."
      ),
    AirportInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport connections. Contains details about airport shuttle services and transportation options."
      ),
    AirportShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport shuttle services. Contains details about shuttle schedules and routes to airports."
      ),
    BikeInfo: z
      .string()
      .nullable()
      .describe(
        "Information about bicycle access and parking. Contains details about bike racks and bicycle-friendly facilities."
      ),
    ChamberOfCommerce: terminalTransitLinkSchema
      .nullable()
      .describe(
        "Chamber of Commerce information and contact details. Provides local business and tourism information."
      ),
    ConstructionInfo: z
      .string()
      .nullable()
      .describe(
        "Information about construction activities at the terminal. Contains details about ongoing work and potential impacts."
      ),
    FacInfo: z
      .string()
      .nullable()
      .describe(
        "Facility information. Contains details about terminal facilities and amenities."
      ),
    FareDiscountInfo: z
      .string()
      .nullable()
      .describe(
        "Information about fare discounts and special rates. Contains details about reduced fares and eligibility requirements."
      ),
    FoodServiceInfo: z
      .string()
      .nullable()
      .describe(
        "Detailed information about food service options. Contains details about restaurants, cafes, and dining facilities."
      ),
    HovInfo: z
      .string()
      .nullable()
      .describe(
        "Information about High Occupancy Vehicle (HOV) access. Contains details about HOV lanes and carpooling options."
      ),
    LostAndFoundInfo: z
      .string()
      .nullable()
      .describe(
        "Information about lost and found services. Contains details about how to report lost items and retrieve found items."
      ),
    MotorcycleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about motorcycle access and parking. Contains details about motorcycle-specific facilities and policies."
      ),
    ParkingInfo: z
      .string()
      .nullable()
      .describe(
        "Information about parking facilities at the terminal. Contains details about parking availability, rates, and restrictions."
      ),
    ParkingShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about parking shuttle services. Contains details about shuttle schedules and routes to parking areas."
      ),
    REALTIME_SHUTOFF_FLAG: z
      .boolean()
      .describe(
        "Flag indicating whether real-time information is available. True if real-time data is being provided for this terminal."
      ),
    REALTIME_SHUTOFF_MESSAGE: z
      .string()
      .nullable()
      .describe(
        "Message explaining real-time information status. Contains details about why real-time data may not be available."
      ),
    RealtimeIntroMsg: z
      .string()
      .nullable()
      .describe(
        "Introduction message for real-time information. Contains welcome text and instructions for using real-time data."
      ),
    ResourceStatus: z
      .string()
      .nullable()
      .describe(
        "Current status of terminal resources. Contains information about facility availability and operational status."
      ),
    SecurityInfo: z
      .string()
      .nullable()
      .describe(
        "Information about security measures and procedures. Contains details about security policies and safety information."
      ),
    TallySystemInfo: z
      .string()
      .nullable()
      .describe(
        "Information about the tally system. Contains details about how vehicle counts are managed and displayed."
      ),
    TaxiInfo: z
      .string()
      .nullable()
      .describe(
        "Information about taxi services. Contains details about taxi availability and pickup locations."
      ),
    TrainInfo: z
      .string()
      .nullable()
      .describe(
        "Information about train connections. Contains details about nearby train stations and rail services."
      ),
    TruckInfo: z
      .string()
      .nullable()
      .describe(
        "Information about truck access and parking. Contains details about truck-specific facilities and policies."
      ),
    TypeDesc: z
      .string()
      .nullable()
      .describe(
        "Type description for the terminal. Contains classification information about the terminal's role and function."
      ),
    VisitorLinks: z
      .array(z.any())
      .nullable()
      .describe(
        "Array of visitor information links. Contains links to tourism, attractions, and local information."
      ),
    Bulletins: z
      .array(terminalBulletinItemSchema)
      .describe(
        "Array of bulletins and announcements for this terminal. Contains important information, alerts, and notices for passengers."
      ),
    TransitLinks: z
      .array(terminalTransitLinkSchema)
      .describe(
        "Array of transit links providing access to various transportation options. Contains links to bus, train, and other transit services."
      ),
    WaitTimes: z
      .array(terminalWaitTimeSchema)
      .describe(
        "Array of wait time information for all routes at this terminal. Contains current wait times for each route serving this terminal."
      ),
  })
  .describe(
    "Complete verbose terminal information including all details about facilities, services, transportation options, and current status. Provides comprehensive information for passengers and planning purposes."
  );

// ============================================================================
// ARRAY SCHEMAS
// ============================================================================

export const terminalBasicsArraySchema = z
  .array(terminalBasicsSchema)
  .describe(
    "Array of basic terminal information. Contains core details for multiple terminals including names, locations, and basic amenities."
  );

export const terminalBulletinArraySchema = z
  .array(terminalBulletinSchema)
  .describe(
    "Array of terminal bulletin information. Contains basic terminal details and associated bulletins for multiple terminals."
  );

export const terminalLocationArraySchema = z
  .array(terminalLocationSchema)
  .describe(
    "Array of terminal location information. Contains complete address and mapping details for multiple terminals."
  );

export const terminalSailingSpaceArraySchema = z
  .array(terminalSailingSpaceSchema)
  .describe(
    "Array of terminal sailing space information. Contains complete sailing schedules and space availability for multiple terminals."
  );

export const terminalTransportArraySchema = z
  .array(terminalTransportSchema)
  .describe(
    "Array of terminal transportation information. Contains complete transportation options and access details for multiple terminals."
  );

export const terminalWaitTimesArraySchema = z
  .array(terminalWaitTimesSchema)
  .describe(
    "Array of terminal wait time information. Contains current wait times for all routes at multiple terminals."
  );

export const terminalVerboseArraySchema = z
  .array(terminalVerboseSchema)
  .describe(
    "Array of verbose terminal information. Contains comprehensive details about facilities, services, and current status for multiple terminals."
  );

// ============================================================================
// CACHE SCHEMAS
// ============================================================================

export const terminalCacheFlushDateSchema = zWsdotDate()
  .nullable()
  .describe(
    "Cache flush date for terminals data. Indicates when the terminals data was last updated and can be used to coordinate caching strategies."
  );

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Export all response types for use in API functions and queries
export type TerminalBasics = z.infer<typeof terminalBasicsSchema>;
export type TerminalBulletinItem = z.infer<typeof terminalBulletinItemSchema>;
export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;
export type TerminalLocation = z.infer<typeof terminalLocationSchema>;
export type TerminalArrivalSpace = z.infer<typeof terminalArrivalSpaceSchema>;
export type TerminalDepartingSpace = z.infer<
  typeof terminalDepartingSpaceSchema
>;
export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;
export type TerminalTransport = z.infer<typeof terminalTransportSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;
export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
export type TerminalVerbose = z.infer<typeof terminalVerboseSchema>;
