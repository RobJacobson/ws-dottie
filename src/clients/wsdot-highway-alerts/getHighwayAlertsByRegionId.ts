import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { alertsSchema, type Alerts } from "@/schemas/wsdot-highway-alerts";

// ============================================================================
// Input Schemas & Types
// ============================================================================

/** Params schema for getHighwayAlertsByRegionId */
export const getHighwayAlertsByRegionIdParamsSchema = z.object({
  /** Region numeric identifier */
  RegionId: z.number().int().positive(),
});

export type GetHighwayAlertsByRegionIdParams = z.infer<
  typeof getHighwayAlertsByRegionIdParamsSchema
>;

// ============================================================================
// API Functions
// ============================================================================

const ENDPOINT_BY_REGION_ID =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsByRegionIDAsJson?RegionId={RegionId}";

/** Fetches highway alerts filtered by region ID */
export const getHighwayAlertsByRegionId = zodFetch<
  GetHighwayAlertsByRegionIdParams,
  Alerts
>(ENDPOINT_BY_REGION_ID, getHighwayAlertsByRegionIdParamsSchema, alertsSchema);

// ============================================================================
// TanStack Query options
// ============================================================================

/** Returns options for alerts by region ID; polls every 60s */
export const highwayAlertsByRegionIdOptions = createQueryOptions({
  apiFunction: getHighwayAlertsByRegionId,
  queryKey: ["wsdot", "highway-alerts", "getHighwayAlertsByRegionId"],
  cacheStrategy: "MINUTE_UPDATES",
});
