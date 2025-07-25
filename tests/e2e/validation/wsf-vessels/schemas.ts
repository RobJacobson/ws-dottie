import { z } from "zod";

// Base schemas for common data types
const dateSchema = z.date();
const nullableDateSchema = z.date().nullable();
const nullableStringSchema = z.string().nullable();
const nullableNumberSchema = z.number().nullable();

// Vessel Class schema
export const vesselClassSchema = z.object({
  ClassID: z.number(),
  ClassSubjectID: z.number(),
  ClassName: z.string(),
  SortSeq: z.number(),
  DrawingImg: z.string(),
  SilhouetteImg: z.string(),
  PublicDisplayName: z.string(),
});

// Vessel Basic schema
export const vesselBasicSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: vesselClassSchema,
  Status: z.number(),
  OwnedByWSF: z.boolean(),
});

// Vessel Accommodation schema
export const vesselAccommodationSchema = z.object({
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
  AdditionalInfo: nullableStringSchema,
});

// Vessel Stats schema
export const vesselStatsSchema = z.object({
  VesselID: z.number(),
  VesselSubjectID: z.number(),
  VesselName: z.string(),
  VesselAbbrev: z.string(),
  Class: vesselClassSchema,
  VesselNameDesc: z.string(),
  VesselHistory: nullableStringSchema,
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
  YearRebuilt: nullableNumberSchema,
  VesselDrawingImg: nullableStringSchema,
  SolasCertified: z.boolean(),
  MaxPassengerCountForInternational: nullableNumberSchema,
});

// Vessel History schema
export const vesselHistorySchema = z.object({
  VesselId: z.number(),
  Vessel: z.string(),
  Departing: nullableStringSchema,
  Arriving: nullableStringSchema,
  ScheduledDepart: nullableDateSchema,
  ActualDepart: nullableDateSchema,
  EstArrival: nullableDateSchema,
  Date: nullableDateSchema,
});

// Vessel Location schema
export const vesselLocationSchema = z.object({
  VesselID: z.number(),
  VesselName: z.string(),
  Mmsi: z.number(),
  DepartingTerminalID: z.number(),
  DepartingTerminalName: z.string(),
  DepartingTerminalAbbrev: z.string(),
  ArrivingTerminalID: nullableNumberSchema,
  ArrivingTerminalName: nullableStringSchema,
  ArrivingTerminalAbbrev: nullableStringSchema,
  Latitude: z.number(),
  Longitude: z.number(),
  Speed: z.number(),
  Heading: z.number(),
  InService: z.boolean(),
  AtDock: z.boolean(),
  LeftDock: nullableDateSchema,
  Eta: nullableDateSchema,
  EtaBasis: nullableStringSchema,
  ScheduledDeparture: nullableDateSchema,
  OpRouteAbbrev: z.array(z.string()),
  VesselPositionNum: nullableNumberSchema,
  SortSeq: z.number(),
  ManagedBy: z.number(),
  TimeStamp: dateSchema,
});

// Vessel Verbose schema
export const vesselVerboseSchema = z.object({
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
  VesselHistory: nullableStringSchema,
  CityBuilt: z.string(),
  YearRebuilt: nullableNumberSchema,
});

// Vessels Cache Flush Date schema
export const vesselsCacheFlushDateSchema = dateSchema;

// Array schemas for API responses
export const vesselBasicArraySchema = z.array(vesselBasicSchema);
export const vesselAccommodationArraySchema = z.array(
  vesselAccommodationSchema
);
export const vesselStatsArraySchema = z.array(vesselStatsSchema);
export const vesselHistoryArraySchema = z.array(vesselHistorySchema);
export const vesselLocationArraySchema = z.array(vesselLocationSchema);
export const vesselVerboseArraySchema = z.array(vesselVerboseSchema);
