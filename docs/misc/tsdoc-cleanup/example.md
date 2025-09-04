# Worked Example — WSF Vessels (Vessel Locations)

> Example reference in repo: `src/api/wsf-vessels/vesselLocations.ts`

```typescript
/**
 * @module WSF Vessels — Vessel Locations API
 * @description Real-time vessel location data for Washington State Ferries.
 * 
 * Provides:
 * - Current positions and headings for active vessels
 * - Access to a single vessel's latest known location
 * 
 * Data includes:
 * - Vessel identifiers, names, route info
 * - Coordinates, speed, heading, last update time (JS Date)
 *
 * @functions
 *   - getVesselLocations: Returns all active vessel locations
 *   - getVesselLocationsByVesselId: Returns a single vessel location by ID
 *
 * @input
 *   - getVesselLocations: {}
 *   - getVesselLocationsByVesselId:
 *     - vesselId: Unique vessel ID
 *
 * @output
 *   - getVesselLocations: VesselLocation[]
 *   - getVesselLocationsByVesselId: VesselLocation
 *   - VesselLocation fields:
 *     - VesselID: Unique vessel ID
 *     - VesselName: Official vessel name
 *     - Latitude: Latitude in decimal degrees
 *     - Longitude: Longitude in decimal degrees
 *     - TimeStamp: Last update time (JS Date)
 *
 * @baseType
 *   - VesselLocation: Vessel metadata and current position information
 *
 * @cli
 *   - getVesselLocations: node dist/cli.mjs getVesselLocations
 *   - getVesselLocationsByVesselId: node dist/cli.mjs getVesselLocationsByVesselId '{"vesselId": 1}'
 *
 * @exampleResponse
 * {
 *   "VesselID": 1,
 *   "VesselName": "Example",
 *   "Latitude": 47.60,
 *   "Longitude": -122.33,
 *   "TimeStamp": "2025-09-01T12:34:56Z"
 * }
 *
 * @see https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html
 */

// Input schemas
/** Params schema for getVesselLocationsByVesselId */
export const getVesselLocationsByVesselIdParamsSchema = z.object({
  /** Unique vessel ID */
  vesselId: zPositiveInteger("vessel"),
});

/** Params schema for getVesselLocations (none) */
export const getVesselLocationsParamsSchema = z.object({});

// Output schemas
/** Vessel location item schema */
export const vesselLocationSchema = z.object({
  /** Unique vessel ID */
  VesselID: z.number().int().positive(),
  /** Official vessel name */
  VesselName: z.string().min(1),
  /** Latitude in decimal degrees */
  Latitude: z.number().min(-90).max(90),
  /** Longitude in decimal degrees */
  Longitude: z.number().min(-180).max(180),
  /** Last update time (JS Date) */
  TimeStamp: zWsdotDate(),
});

/** Vessel locations array schema */
export const vesselLocationArraySchema = z.array(vesselLocationSchema);

/** VesselLocation type */
export type VesselLocation = z.infer<typeof vesselLocationSchema>;

// API functions
/** Fetches a single vessel location by ID */
export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
): Promise<VesselLocation> => {
  // ...
};

/** Fetches all vessel locations */
export const getVesselLocations = async (
  params: GetVesselLocationsParams = {}
): Promise<VesselLocation[]> => {
  // ...
};

// Query Options
/** Returns options for a single vessel location by ID; polls every 5s */
export const vesselLocationsByVesselIdOptions = (
  params: GetVesselLocationsByVesselIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "vessels",
      "locations",
      "getVesselLocationsByVesselId",
      params,
    ],
    queryFn: () => getVesselLocationsByVesselId(params),
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

/** Returns options for all vessel locations; polls every 5s */
export const vesselLocationsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "vessels", "locations", "getVesselLocations"],
    queryFn: () => getVesselLocations({}),
    staleTime: FIVE_SECONDS,
    gcTime: ONE_HOUR,
    refetchInterval: FIVE_SECONDS,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });