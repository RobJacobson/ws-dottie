import { z } from "zod";

const zNullableString = () => z.string().nullable();
const zNullableNumber = () => z.number().nullable();
const zNullableBoolean = () => z.boolean().nullable();
const zDate = () => z.date();

export const terminalBasicsSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    OverheadPassengerLoading: z.boolean(),
    Elevator: z.boolean(),
    WaitingRoom: z.boolean(),
    FoodService: z.boolean(),
    Restroom: z.boolean(),
  })
  .catchall(z.unknown());

export const terminalBulletinItemSchema = z
  .object({
    BulletinTitle: z.string(),
    BulletinText: z.string(),
    BulletinSortSeq: z.number(),
    BulletinLastUpdated: zDate().optional(),
    BulletinLastUpdatedSortable: z.string().optional(),
  })
  .catchall(z.unknown());

export const terminalBulletinSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    Bulletins: z.array(terminalBulletinItemSchema),
  })
  .catchall(z.unknown());

export const terminalLocationSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    AddressLineOne: z.string(),
    AddressLineTwo: zNullableString(),
    City: z.string(),
    State: z.string(),
    ZipCode: z.string(),
    Country: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    Directions: zNullableString(),
    DispGISZoomLoc: z.array(
      z
        .object({
          Latitude: z.number(),
          Longitude: z.number(),
          ZoomLevel: z.number(),
        })
        .catchall(z.unknown())
    ),
    MapLink: zNullableString(),
  })
  .catchall(z.unknown());

export const terminalArrivalSpaceSchema = z
  .object({
    TerminalID: z.number(),
    TerminalName: z.string(),
    VesselID: z.number(),
    VesselName: z.string(),
    DisplayReservableSpace: z.boolean(),
    ReservableSpaceCount: zNullableNumber(),
    ReservableSpaceHexColor: zNullableString(),
    DisplayDriveUpSpace: z.boolean(),
    DriveUpSpaceCount: z.number(),
    DriveUpSpaceHexColor: z.string(),
    MaxSpaceCount: z.number(),
    ArrivalTerminalIDs: z.array(z.number()),
  })
  .catchall(z.unknown());

export const terminalDepartingSpaceSchema = z
  .object({
    Departure: zDate(),
    IsCancelled: z.boolean(),
    VesselID: z.number(),
    VesselName: z.string(),
    MaxSpaceCount: z.number(),
    SpaceForArrivalTerminals: z.array(terminalArrivalSpaceSchema),
  })
  .catchall(z.unknown());

export const terminalSailingSpaceSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    DepartingSpaces: z.array(terminalDepartingSpaceSchema),
    IsNoFareCollected: zNullableBoolean(),
    NoFareCollectedMsg: zNullableString(),
  })
  .catchall(z.unknown());

export const terminalTransitLinkSchema = z
  .object({
    LinkName: z.string(),
    LinkURL: z.string(),
    SortSeq: zNullableNumber(),
  })
  .catchall(z.unknown());

export const terminalTransportSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    ParkingInfo: z.string(),
    ParkingShuttleInfo: zNullableString(),
    AirportInfo: zNullableString(),
    AirportShuttleInfo: zNullableString(),
    MotorcycleInfo: z.string(),
    TruckInfo: z.string(),
    BikeInfo: zNullableString(),
    TrainInfo: zNullableString(),
    TaxiInfo: zNullableString(),
    HovInfo: zNullableString(),
    TransitLinks: z.array(terminalTransitLinkSchema),
  })
  .catchall(z.unknown());

export const terminalWaitTimeSchema = z
  .object({
    RouteID: zNullableNumber(),
    RouteName: zNullableString(),
    WaitTimeIVRNotes: zNullableString(),
    WaitTimeLastUpdated: zDate(),
    WaitTimeNotes: zNullableString(),
  })
  .catchall(z.unknown());

export const terminalWaitTimesSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    WaitTimes: z.array(terminalWaitTimeSchema),
  })
  .catchall(z.unknown());

export const terminalVerboseSchema = z
  .object({
    TerminalID: z.number(),
    TerminalSubjectID: z.number(),
    RegionID: z.number(),
    TerminalName: z.string(),
    TerminalAbbrev: z.string(),
    SortSeq: z.number(),
    AddressLineOne: z.string(),
    AddressLineTwo: zNullableString(),
    City: z.string(),
    State: z.string(),
    ZipCode: z.string(),
    Country: z.string(),
    Latitude: z.number(),
    Longitude: z.number(),
    Directions: zNullableString(),
    DispGISZoomLoc: z.array(
      z
        .object({
          Latitude: z.number(),
          Longitude: z.number(),
          ZoomLevel: z.number(),
        })
        .catchall(z.unknown())
    ),
    MapLink: zNullableString(),
    Elevator: z.boolean(),
    WaitingRoom: z.boolean(),
    FoodService: z.boolean(),
    Restroom: z.boolean(),
    OverheadPassengerLoading: z.boolean(),
    IsNoFareCollected: zNullableBoolean(),
    NoFareCollectedMsg: zNullableString(),
    AdaInfo: zNullableString(),
    AdditionalInfo: zNullableString(),
    AirportInfo: zNullableString(),
    AirportShuttleInfo: zNullableString(),
    BikeInfo: zNullableString(),
    ChamberOfCommerce: terminalTransitLinkSchema.nullable(),
    ConstructionInfo: zNullableString(),
    FacInfo: zNullableString(),
    FareDiscountInfo: zNullableString(),
    FoodServiceInfo: zNullableString(),
    HovInfo: zNullableString(),
    LostAndFoundInfo: zNullableString(),
    MotorcycleInfo: zNullableString(),
    ParkingInfo: zNullableString(),
    ParkingShuttleInfo: zNullableString(),
    REALTIME_SHUTOFF_FLAG: z.boolean(),
    REALTIME_SHUTOFF_MESSAGE: zNullableString(),
    RealtimeIntroMsg: zNullableString(),
    ResourceStatus: zNullableString(),
    SecurityInfo: zNullableString(),
    TallySystemInfo: zNullableString(),
    TaxiInfo: zNullableString(),
    TrainInfo: zNullableString(),
    TruckInfo: zNullableString(),
    TypeDesc: zNullableString(),
    VisitorLinks: z.array(z.any()).nullable(),
    Bulletins: z.array(terminalBulletinItemSchema),
    TransitLinks: z.array(terminalTransitLinkSchema),
    WaitTimes: z.array(terminalWaitTimeSchema),
  })
  .catchall(z.unknown());

export const terminalCacheFlushDateSchema = zDate().nullable();

// Arrays
export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);
export const terminalBulletinArraySchema = z.array(terminalBulletinSchema);
export const terminalLocationArraySchema = z.array(terminalLocationSchema);
export const terminalSailingSpaceArraySchema = z.array(
  terminalSailingSpaceSchema
);
export const terminalTransportArraySchema = z.array(terminalTransportSchema);
export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);
export const terminalVerboseArraySchema = z.array(terminalVerboseSchema);

// Types
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
