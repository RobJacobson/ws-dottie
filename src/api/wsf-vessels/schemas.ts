import { z } from "zod";

const zDate = () => z.date();
const zNullableDate = () => z.date().nullable();
const zNullableString = () => z.string().nullable();
const zNullableNumber = () => z.number().nullable();

export const vesselClassSchema = z
  .object({
    ClassID: z.number(),
    ClassSubjectID: z.number(),
    ClassName: z.string(),
    SortSeq: z.number(),
    DrawingImg: z.string(),
    SilhouetteImg: z.string(),
    PublicDisplayName: z.string(),
  })
  .catchall(z.unknown());

export const vesselBasicSchema = z
  .object({
    VesselID: z.number(),
    VesselSubjectID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    Status: z.number(),
    OwnedByWSF: z.boolean(),
  })
  .catchall(z.unknown());

export const vesselAccommodationSchema = z
  .object({
    VesselID: z.number(),
    VesselSubjectID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    CarDeckRestroom: z.boolean(),
    CarDeckShelter: z.boolean(),
    Elevator: z.boolean(),
    ADAAccessible: z.boolean(),
    MainCabinGalley: z.boolean(),
    MainCabinRestroom: z.boolean(),
    PublicWifi: z.boolean(),
    ADAInfo: z.string(),
    AdditionalInfo: zNullableString(),
  })
  .catchall(z.unknown());

export const vesselStatsSchema = z
  .object({
    VesselID: z.number(),
    VesselSubjectID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    VesselNameDesc: z.string(),
    VesselHistory: zNullableString(),
    Beam: z.string(),
    CityBuilt: z.string(),
    SpeedInKnots: z.number(),
    Draft: z.string(),
    EngineCount: z.number(),
    Horsepower: z.number(),
    Length: z.string(),
    MaxPassengerCount: z.number(),
    PassengerOnly: z.boolean(),
    FastFerry: z.boolean(),
    PropulsionInfo: z.string(),
    TallDeckClearance: z.number(),
    RegDeckSpace: z.number(),
    TallDeckSpace: z.number(),
    Tonnage: z.number(),
    Displacement: z.number(),
    YearBuilt: z.number(),
    YearRebuilt: zNullableNumber(),
    VesselDrawingImg: zNullableString(),
    SolasCertified: z.boolean(),
    MaxPassengerCountForInternational: zNullableNumber(),
  })
  .catchall(z.unknown());

export const vesselHistorySchema = z
  .object({
    VesselId: z.number(),
    Vessel: z.string(),
    Departing: zNullableString(),
    Arriving: zNullableString(),
    ScheduledDepart: zNullableDate(),
    ActualDepart: zNullableDate(),
    EstArrival: zNullableDate(),
    Date: zNullableDate(),
  })
  .catchall(z.unknown());

export const vesselLocationSchema = z
  .object({
    VesselID: z.number(),
    VesselName: z.string(),
    Mmsi: z.number(),
    DepartingTerminalID: z.number(),
    DepartingTerminalName: z.string(),
    DepartingTerminalAbbrev: z.string(),
    ArrivingTerminalID: zNullableNumber(),
    ArrivingTerminalName: zNullableString(),
    ArrivingTerminalAbbrev: zNullableString(),
    Latitude: z.number(),
    Longitude: z.number(),
    Speed: z.number(),
    Heading: z.number(),
    InService: z.boolean(),
    AtDock: z.boolean(),
    LeftDock: zNullableDate(),
    Eta: zNullableDate(),
    EtaBasis: zNullableString(),
    ScheduledDeparture: zNullableDate(),
    OpRouteAbbrev: z.array(z.string()),
    VesselPositionNum: zNullableNumber(),
    SortSeq: z.number(),
    ManagedBy: z.number(),
    TimeStamp: zDate(),
  })
  .catchall(z.unknown());

export const vesselVerboseSchema = z
  .object({
    VesselID: z.number(),
    VesselName: z.string(),
    VesselAbbrev: z.string(),
    Class: vesselClassSchema,
    Status: z.number(),
    OwnedByWSF: z.boolean(),
    YearBuilt: z.number(),
    Displacement: z.number(),
    Length: z.string(),
    Beam: z.string(),
    Draft: z.string(),
    SpeedInKnots: z.number(),
    EngineCount: z.number(),
    Horsepower: z.number(),
    MaxPassengerCount: z.number(),
    RegDeckSpace: z.number(),
    TallDeckSpace: z.number(),
    Tonnage: z.number(),
    PropulsionInfo: z.string(),
    ADAAccessible: z.boolean(),
    Elevator: z.boolean(),
    CarDeckRestroom: z.boolean(),
    MainCabinGalley: z.boolean(),
    MainCabinRestroom: z.boolean(),
    PublicWifi: z.boolean(),
    ADAInfo: z.string(),
    VesselNameDesc: z.string(),
    VesselHistory: zNullableString(),
    CityBuilt: z.string(),
    YearRebuilt: zNullableNumber(),
  })
  .catchall(z.unknown());

export const vesselsCacheFlushDateSchema = zDate();

// Arrays
export const vesselBasicArraySchema = z.array(vesselBasicSchema);
export const vesselAccommodationArraySchema = z.array(
  vesselAccommodationSchema
);
export const vesselStatsArraySchema = z.array(vesselStatsSchema);
export const vesselHistoryArraySchema = z.array(vesselHistorySchema);
export const vesselLocationArraySchema = z.array(vesselLocationSchema);
export const vesselVerboseArraySchema = z.array(vesselVerboseSchema);

// Types
export type VesselClass = z.infer<typeof vesselClassSchema>;
export type VesselBasic = z.infer<typeof vesselBasicSchema>;
export type VesselAccommodation = z.infer<typeof vesselAccommodationSchema>;
export type VesselStats = z.infer<typeof vesselStatsSchema>;
export type VesselHistory = z.infer<typeof vesselHistorySchema>;
export type VesselLocation = z.infer<typeof vesselLocationSchema>;
export type VesselVerbose = z.infer<typeof vesselVerboseSchema>;
export type VesselsCacheFlushDate = z.infer<typeof vesselsCacheFlushDateSchema>;
