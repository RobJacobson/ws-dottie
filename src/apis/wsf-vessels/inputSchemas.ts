import { z } from "zod";

/**
 * CacheFlushDate input schema
 */
export const cacheFlushDateInputSchema = z.object({});

export type CacheFlushDateInput = z.infer<typeof cacheFlushDateInputSchema>;

/**
 * VesselBasics input schema
 */
export const vesselBasicsInputSchema = z.object({});

export type VesselBasicsInput = z.infer<typeof vesselBasicsInputSchema>;

/**
 * VesselBasicsById input schema
 */
export const vesselBasicsByIdInputSchema = z.object({
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdInputSchema>;

/**
 * VesselAccommodations input schema
 */
export const vesselAccommodationsInputSchema = z.object({});

export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsInputSchema
>;

/**
 * VesselAccommodationsById input schema
 */
export const vesselAccommodationsByIdInputSchema = z.object({
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdInputSchema
>;

/**
 * VesselStats input schema
 */
export const vesselStatsInputSchema = z.object({});

export type VesselStatsInput = z.infer<typeof vesselStatsInputSchema>;

/**
 * VesselStatsById input schema
 */
export const vesselStatsByIdInputSchema = z.object({
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselStatsByIdInput = z.infer<typeof vesselStatsByIdInputSchema>;

/**
 * VesselLocations input schema
 */
export const vesselLocationsInputSchema = z.object({});

export type VesselLocationsInput = z.infer<typeof vesselLocationsInputSchema>;

/**
 * VesselLocationsById input schema
 */
export const vesselLocationsByIdInputSchema = z.object({
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselLocationsByIdInput = z.infer<
  typeof vesselLocationsByIdInputSchema
>;

/**
 * VesselVerbose input schema
 */
export const vesselVerboseInputSchema = z.object({});

export type VesselVerboseInput = z.infer<typeof vesselVerboseInputSchema>;

/**
 * VesselVerboseById input schema
 */
export const vesselVerboseByIdInputSchema = z.object({
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselVerboseByIdInput = z.infer<
  typeof vesselVerboseByIdInputSchema
>;

/**
 * GetVesselHistory input schema
 */
export const GetVesselHistoryInputSchema = z
  .object({
    VesselName: z.string().describe("The name of the vessel."),
    DateStart: z.string().describe("The start date for the history query."),
    DateEnd: z.string().describe("The end date for the history query."),
  })
  .describe("Input parameters for vessel history endpoint.");

export type GetVesselHistoryInput = z.infer<typeof GetVesselHistoryInputSchema>;

/**
 * GetAllVessels input schema
 */
export const GetAllVesselsInputSchema = z.object({});

export type GetAllVesselsInput = z.infer<typeof GetAllVesselsInputSchema>;
