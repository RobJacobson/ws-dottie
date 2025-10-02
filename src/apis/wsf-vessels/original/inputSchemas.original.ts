import { z } from "zod";

/**
 * CacheFlushDate input schema
 */
export const cacheFlushDateSchema = z.object({});

export type VesselsCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;

/**
 * VesselBasics input schema
 */
export const vesselBasicsSchema = z.object({});

export type VesselBasicsInput = z.infer<typeof vesselBasicsSchema>;

/**
 * VesselBasicsById input schema
 */
export const vesselBasicsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdSchema>;

/**
 * VesselAccommodations input schema
 */
export const vesselAccommodationsSchema = z.object({});

export type VesselAccommodationsInput = z.infer<
  typeof vesselAccommodationsSchema
>;

/**
 * VesselAccommodationsById input schema
 */
export const vesselAccommodationsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselAccommodationsByIdInput = z.infer<
  typeof vesselAccommodationsByIdSchema
>;

/**
 * VesselStats input schema
 */
export const vesselStatsSchema = z.object({});

export type VesselStatsInput = z.infer<typeof vesselStatsSchema>;

/**
 * VesselStatsById input schema
 */
export const vesselStatsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselStatsByIdInput = z.infer<typeof vesselStatsByIdSchema>;

/**
 * VesselLocations input schema
 */
export const vesselLocationsSchema = z.object({});

export type VesselLocationsInput = z.infer<typeof vesselLocationsSchema>;

/**
 * VesselLocationsById input schema
 */
export const vesselLocationsByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselLocationsByIdInput = z.infer<
  typeof vesselLocationsByIdSchema
>;

/**
 * VesselVerbose input schema
 */
export const vesselVerboseSchema = z.object({});

export type VesselVerboseInput = z.infer<typeof vesselVerboseSchema>;

/**
 * VesselVerboseById input schema
 */
export const vesselVerboseByIdSchema = z.object({
  /** Unique identifier for a vessel. */
  VesselID: z.number().int().describe("Unique identifier for a vessel."),
});

export type VesselVerboseByIdInput = z.infer<typeof vesselVerboseByIdSchema>;

/**
 * GetVesselHistory input schema
 */
export const getVesselHistorySchema = z
  .object({
    /** The name of the vessel. */
    VesselName: z.string().describe("The name of the vessel."),
    /** The start date for the history query. */
    DateStart: z.string().describe("The start date for the history query."),
    /** The end date for the history query. */
    DateEnd: z.string().describe("The end date for the history query."),
  })
  .describe("Input parameters for vessel history endpoint.");

export type GetVesselHistoryInput = z.infer<typeof getVesselHistorySchema>;

/**
 * GetAllVessels input schema
 */
export const getAllVesselsSchema = z.object({});

export type GetAllVesselsInput = z.infer<typeof getAllVesselsSchema>;
