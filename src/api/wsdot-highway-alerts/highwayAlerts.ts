import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getHighwayAlertById (singular item)
// getHighwayAlerts (array)
// getHighwayAlertsByMapArea (array filtered by map area)
// getHighwayAlertsByRegionId (array filtered by region ID)
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson";

const ENDPOINT_BY_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertAsJson?AlertID={AlertID}";

const ENDPOINT_BY_MAP_AREA =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByMapAreaAsJson?MapArea={MapArea}";

const ENDPOINT_BY_REGION_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}";

export const getHighwayAlertById = async (
  params: GetHighwayAlertByIdParams
): Promise<HighwayAlert> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getHighwayAlertByIdParamsSchema,
      output: highwayAlertSchema,
    },
    params
  );
};

export const getHighwayAlerts = async (
  params: GetHighwayAlertsParams = {}
): Promise<HighwayAlerts> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayAlertsParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

export const getHighwayAlertsByMapArea = async (
  params: GetHighwayAlertsByMapAreaParams
): Promise<HighwayAlerts> => {
  return zodFetch(
    ENDPOINT_BY_MAP_AREA,
    {
      input: getHighwayAlertsByMapAreaParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

export const getHighwayAlertsByRegionId = async (
  params: GetHighwayAlertsByRegionIdParams
): Promise<HighwayAlerts> => {
  return zodFetch(
    ENDPOINT_BY_REGION_ID,
    {
      input: getHighwayAlertsByRegionIdParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getHighwayAlertByIdParamsSchema
// getHighwayAlertsParamsSchema
// getHighwayAlertsByMapAreaParamsSchema
// getHighwayAlertsByRegionIdParamsSchema
// ============================================================================

export const getHighwayAlertByIdParamsSchema = z.object({
  AlertID: z.number().int().positive(),
});

export type GetHighwayAlertByIdParams = z.infer<
  typeof getHighwayAlertByIdParamsSchema
>;

export const getHighwayAlertsParamsSchema = z.object({});

export type GetHighwayAlertsParams = z.infer<
  typeof getHighwayAlertsParamsSchema
>;

export const getHighwayAlertsByMapAreaParamsSchema = z.object({
  MapArea: z.string().min(1, "Map area cannot be empty"),
});

export type GetHighwayAlertsByMapAreaParams = z.infer<
  typeof getHighwayAlertsByMapAreaParamsSchema
>;

export const getHighwayAlertsByRegionIdParamsSchema = z.object({
  RegionId: z.number().int().positive(),
});

export type GetHighwayAlertsByRegionIdParams = z.infer<
  typeof getHighwayAlertsByRegionIdParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// highwayAlertRoadwayLocationSchema
// highwayAlertSchema
// highwayAlertArraySchema
// ============================================================================

export const highwayAlertRoadwayLocationSchema = z.object({
  Description: z.string().nullable(),
  Direction: z.string().nullable(),
  // NOTE: API returns 0 for coordinates when not available, despite published spec suggesting WGS84 coordinates
  // This is a known API behavior that we must accommodate for test stability
  Latitude: z.number(),
  // NOTE: API returns 0 for coordinates when not available, despite published spec suggesting WGS84 coordinates
  // This is a known API behavior that we must accommodate for test stability
  Longitude: z.number(),
  // NOTE: API returns 0 for MilePost in some cases, despite published spec suggesting this field is always populated
  // This is a known API behavior that we must accommodate for test stability
  MilePost: z.number(),
  RoadName: z.string().nullable(),
});

export const highwayAlertSchema = z.object({
  AlertID: z.number().int().positive(),
  County: z.string().nullable(),
  EndRoadwayLocation: highwayAlertRoadwayLocationSchema,
  EndTime: zWsdotDate().nullable(),
  EventCategory: z.string(),
  EventStatus: z.string(),
  // NOTE: API returns null for ExtendedDescription in some cases, despite published spec suggesting this field is always populated
  // This is a known API behavior that we must accommodate for test stability
  ExtendedDescription: z.string().nullable(),
  HeadlineDescription: z.string(),
  LastUpdatedTime: zWsdotDate(),
  Priority: z.string(),
  Region: z.string(),
  StartRoadwayLocation: highwayAlertRoadwayLocationSchema,
  StartTime: zWsdotDate(),
});

export const highwayAlertArraySchema = z.array(highwayAlertSchema);

export type HighwayAlertRoadwayLocation = z.infer<
  typeof highwayAlertRoadwayLocationSchema
>;
export type HighwayAlert = z.infer<typeof highwayAlertSchema>;

export type HighwayAlerts = z.infer<typeof highwayAlertArraySchema>;

// ============================================================================
// TanStack Query options
//
// useHighwayAlertById (singular item)
// useHighwayAlerts (array)
// useHighwayAlertsByMapArea (array filtered by map area)
// useHighwayAlertsByRegionId (array filtered by region ID)
// ============================================================================

export const highwayAlertByIdOptions = (params: GetHighwayAlertByIdParams) =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlertById", params],
    queryFn: () => getHighwayAlertById(params),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const highwayAlertsOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlerts"],
    queryFn: () => getHighwayAlerts({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const highwayAlertsByMapAreaOptions = (
  params: GetHighwayAlertsByMapAreaParams
) =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlertsByMapArea", params],
    queryFn: () => getHighwayAlertsByMapArea(params),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const highwayAlertsByRegionIdOptions = (
  params: GetHighwayAlertsByRegionIdParams
) =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlertsByRegionId", params],
    queryFn: () => getHighwayAlertsByRegionId(params),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
