import { z } from "zod";

/**
 * CacheFlushDate input schema
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = z
  .object({})
  .strict()
  .describe(
    "Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service."
  );

export type VesselsCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;

/**
 * VesselBasics input schema
 *
 * This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselBasicsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselBasicsInput = z.infer<typeof vesselBasicsSchema>;

/**
 * VesselBasicsById input schema
 */
export const vesselBasicsByIdSchema = z
  .object({
    /** Unique identifier for a vessel. */
    VesselID: z.number().int().describe("Unique identifier for a vessel."),
  })
  .describe(
    "This operation retrieves the most basic / brief information pertaining to vessels. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

export type VesselBasicsByIdInput = z.infer<typeof vesselBasicsByIdSchema>;

/**
 * VesselAccommodations input schema
 *
 * This operation provides details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselAccommodationsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves details regarding vessel accommodations (bathrooms, galley, elevator, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

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
 *
 * This operation provides details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselStatsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves details regarding vessel specifications (engine count, length of vessel, year built, etc). A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

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
 *
 * This operation provides vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.
 */
export const vesselLocationsSchema = z
  .object({})
  .strict()
  .describe(
    "This operation retrieves vessel locations and associated ETA data. A VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel."
  );

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
 *
 * This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don't mind receiving a larger payload of data. The results include and expand on what's already available through the following operations: /vesselbasics, /vesselaccommodations, /vesselstats.
 */
export const vesselVerboseSchema = z
  .object({})
  .strict()
  .describe(
    'This operation retrieves highly detailed information pertaining to vessels. It should be used if you need to reduce the "chattiness" of your application and don\'t mind receiving a larger payload of data. VesselID, or unique vessel identifier, may be optionally passed to retrieve a specific vessel.'
  );

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
  .describe("Input parameters for vessel history endpoint with parameters.");

export type GetVesselHistoryInput = z.infer<typeof getVesselHistorySchema>;

export const getAllVesselHistorySchema = z
  .object({})
  .describe("Input parameters for vessel history endpoint without parameters.");

export type GetAllVesselHistoryInput = z.infer<
  typeof getAllVesselHistorySchema
>;

/**
 * GetAllVessels input schema
 */
export const getAllVesselsSchema = z.object({}).strict();

export type GetAllVesselsInput = z.infer<typeof getAllVesselsSchema>;
