import { z } from "zod";

// Base schemas for common data types
const dateSchema = z.date();
const nullableDateSchema = z.date().nullable();
const nullableStringSchema = z.string().nullable();
const nullableNumberSchema = z.number().nullable();
const nullableBooleanSchema = z.boolean().nullable();

// Terminal Basics schema
export const terminalBasicsSchema = z.object({
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
});

// Terminal Bulletin Item schema
export const terminalBulletinItemSchema = z.object({
  BulletinTitle: z.string(),
  BulletinText: z.string(),
  BulletinSortSeq: z.number(),
  BulletinLastUpdated: dateSchema.optional(),
  BulletinLastUpdatedSortable: z.string().optional(),
});

// Terminal Bulletin schema
export const terminalBulletinSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  Bulletins: z.array(terminalBulletinItemSchema),
});

// Terminal Location schema
export const terminalLocationSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  AddressLineOne: z.string(),
  AddressLineTwo: nullableStringSchema,
  City: z.string(),
  State: z.string(),
  ZipCode: z.string(),
  Country: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  Directions: nullableStringSchema,
  DispGISZoomLoc: z.array(
    z.object({
      Latitude: z.number(),
      Longitude: z.number(),
      ZoomLevel: z.number(), // Can be 0
    })
  ),
  MapLink: nullableStringSchema,
});

// Terminal Arrival Space schema
export const terminalArrivalSpaceSchema = z.object({
  TerminalID: z.number(),
  TerminalName: z.string(),
  VesselID: z.number(),
  VesselName: z.string(),
  DisplayReservableSpace: z.boolean(),
  ReservableSpaceCount: nullableNumberSchema,
  ReservableSpaceHexColor: nullableStringSchema,
  DisplayDriveUpSpace: z.boolean(),
  DriveUpSpaceCount: z.number(), // Can be negative to indicate overflow
  DriveUpSpaceHexColor: z.string(),
  MaxSpaceCount: z.number(),
  ArrivalTerminalIDs: z.array(z.number()),
});

// Terminal Departing Space schema
export const terminalDepartingSpaceSchema = z.object({
  Departure: dateSchema,
  IsCancelled: z.boolean(),
  VesselID: z.number(),
  VesselName: z.string(),
  MaxSpaceCount: z.number(),
  SpaceForArrivalTerminals: z.array(terminalArrivalSpaceSchema),
});

// Terminal Sailing Space schema
export const terminalSailingSpaceSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  DepartingSpaces: z.array(terminalDepartingSpaceSchema),
  IsNoFareCollected: nullableBooleanSchema,
  NoFareCollectedMsg: nullableStringSchema,
});

// Terminal Transit Link schema
export const terminalTransitLinkSchema = z.object({
  LinkName: z.string(),
  LinkURL: z.string(),
  SortSeq: nullableNumberSchema,
});

// Terminal Transport schema
export const terminalTransportSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  ParkingInfo: z.string(),
  ParkingShuttleInfo: nullableStringSchema,
  AirportInfo: nullableStringSchema, // Can be null in actual API responses
  AirportShuttleInfo: nullableStringSchema, // Can be null in actual API responses
  MotorcycleInfo: z.string(),
  TruckInfo: z.string(),
  BikeInfo: nullableStringSchema, // Can be null in actual API responses
  TrainInfo: nullableStringSchema,
  TaxiInfo: nullableStringSchema,
  HovInfo: nullableStringSchema,
  TransitLinks: z.array(terminalTransitLinkSchema),
});

// Terminal Wait Time schema
export const terminalWaitTimeSchema = z.object({
  RouteID: nullableNumberSchema,
  RouteName: nullableStringSchema,
  WaitTimeIVRNotes: nullableStringSchema,
  WaitTimeLastUpdated: dateSchema,
  WaitTimeNotes: nullableStringSchema,
});

// Terminal Wait Times schema
export const terminalWaitTimesSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  WaitTimes: z.array(terminalWaitTimeSchema),
});

// Terminal Verbose schema
export const terminalVerboseSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  AddressLineOne: z.string(),
  AddressLineTwo: nullableStringSchema,
  City: z.string(),
  State: z.string(),
  ZipCode: z.string(),
  Country: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
  Directions: nullableStringSchema,
  DispGISZoomLoc: z.array(
    z.object({
      Latitude: z.number(),
      Longitude: z.number(),
      ZoomLevel: z.number(),
    })
  ),
  MapLink: nullableStringSchema,
  Elevator: z.boolean(),
  WaitingRoom: z.boolean(),
  FoodService: z.boolean(),
  Restroom: z.boolean(),
  OverheadPassengerLoading: z.boolean(),
  IsNoFareCollected: nullableBooleanSchema,
  NoFareCollectedMsg: nullableStringSchema,
  AdaInfo: nullableStringSchema,
  AdditionalInfo: nullableStringSchema,
  AirportInfo: nullableStringSchema,
  AirportShuttleInfo: nullableStringSchema,
  BikeInfo: nullableStringSchema,
  ChamberOfCommerce: terminalTransitLinkSchema.nullable(), // Actually an object, not a string
  ConstructionInfo: nullableStringSchema,
  FacInfo: nullableStringSchema,
  FareDiscountInfo: nullableStringSchema,
  FoodServiceInfo: nullableStringSchema,
  HovInfo: nullableStringSchema,
  LostAndFoundInfo: nullableStringSchema,
  MotorcycleInfo: nullableStringSchema,
  ParkingInfo: nullableStringSchema,
  ParkingShuttleInfo: nullableStringSchema,
  REALTIME_SHUTOFF_FLAG: z.boolean(), // API returns this exact field name
  REALTIME_SHUTOFF_MESSAGE: nullableStringSchema, // API returns this exact field name
  RealtimeIntroMsg: nullableStringSchema,
  ResourceStatus: nullableStringSchema,
  SecurityInfo: nullableStringSchema,
  TallySystemInfo: nullableStringSchema,
  TaxiInfo: nullableStringSchema,
  TrainInfo: nullableStringSchema,
  TruckInfo: nullableStringSchema,
  TypeDesc: nullableStringSchema,
  VisitorLinks: z.array(z.any()).nullable(), // Actually an array, not a string
  Bulletins: z.array(terminalBulletinItemSchema),
  TransitLinks: z.array(terminalTransitLinkSchema),
  WaitTimes: z.array(terminalWaitTimeSchema),
});

// Terminal Cache Flush Date schema
export const terminalCacheFlushDateSchema = nullableDateSchema;

// Array schemas for API responses
export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);
export const terminalBulletinArraySchema = z.array(terminalBulletinSchema);
export const terminalLocationArraySchema = z.array(terminalLocationSchema);
export const terminalSailingSpaceArraySchema = z.array(
  terminalSailingSpaceSchema
);
export const terminalTransportArraySchema = z.array(terminalTransportSchema);
export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);
export const terminalVerboseArraySchema = z.array(terminalVerboseSchema);
