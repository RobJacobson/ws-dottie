# Worked Example — WSF Vessels (Vessel Locations)

> Canonical reference in repo: `src/api/wsf-vessels/vesselLocations.ts`

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
 * - Coordinates, speed, heading, last update time
 *
 * @functions
 *   - getVesselLocations: Returns an array of VesselLocation objects for all vessels
 *   - getVesselLocationsByVesselId: Returns a single VesselLocation by vesselId
 *
 * @input
 *   - getVesselLocations: {} - No parameters required
 *   - getVesselLocationsByVesselId: { vesselId: number } - Unique vessel identifier
 *
 * @output
 *   - getVesselLocations: VesselLocation[] - Array of all active vessel locations
 *   - getVesselLocationsByVesselId: VesselLocation - Single vessel location
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
 *   "Longitude": -122.33
 * }
 *
 * @see https://www.wsdot.wa.gov/ferries/api/vessels/documentation/rest.html
 */

/** Input schema for the `getVesselLocationsByVesselId` request */
export const getVesselLocationsByVesselIdParamsSchema = z.object({
  vesselId: z.number().int().positive(),
})

/** Input schema for the `getVesselLocations` request (no parameters) */
export const getVesselLocationsParamsSchema = z.object({})

/** Response schema for a single `VesselLocation` */
export const vesselLocationSchema = z.object({
  VesselID: z.number().int().positive(),
  VesselName: z.string(),
  Latitude: z.number(),
  Longitude: z.number(),
})

/** Response schema for an array of `VesselLocation` */
export const vesselLocationArraySchema = z.array(vesselLocationSchema)

/** VesselLocation type - validated vessel location object */
export type VesselLocation = z.infer<typeof vesselLocationSchema>

/**
 * Fetches a single vessel location by `vesselId`.
 *
 * @param params - `{ vesselId: number }` unique vessel identifier
 * @returns `VesselLocation` - Validated vessel location object
 */
export const getVesselLocationsByVesselId = async (
  params: GetVesselLocationsByVesselIdParams
): Promise<VesselLocation> => {
  // ...
}

/**
 * Hook factory that returns a TanStack Query hook for an array of `VesselLocation`.
 */
export const useVesselLocations = createUseQueryWsf({
  queryFn: getVesselLocations,
  queryKeyPrefix: ["wsf", "vessels", "locations", "getVesselLocations"],
})