import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getAlerts
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/alerts";

export const getAlerts = async (
  params: GetAlertsParams = {}
): Promise<Alerts> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getAlertsParamsSchema,
      output: alertsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getAlertsParamsSchema
// GetAlertsParams
// ============================================================================

export const getAlertsParamsSchema = z.object({});

export type GetAlertsParams = z.infer<typeof getAlertsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// alertSchema
// alertsArraySchema
// Alert
// ============================================================================

export const alertSchema = z.object({
  BulletinID: z.number().int().positive(),
  BulletinFlag: z.boolean(),
  BulletinText: z.string(),
  CommunicationFlag: z.boolean(),
  CommunicationText: z.string().nullable(),
  RouteAlertFlag: z.boolean(),
  RouteAlertText: z.string(),
  HomepageAlertText: z.string(),
  PublishDate: zWsdotDate(),
  DisruptionDescription: z.string().nullable(),
  AllRoutesFlag: z.boolean(),
  SortSeq: z.number().int().min(0),
  AlertTypeID: z.number().int().positive(),
  AlertType: z.string(),
  AlertFullTitle: z.string(),
  AffectedRouteIDs: z.array(z.number().int().positive()),
  IVRText: z.string().nullable(),
});

export const alertsArraySchema = z.array(alertSchema);

export type Alert = z.infer<typeof alertSchema>;

/**
 * Alerts type - represents an array of alert objects
 */
export type Alerts = z.infer<typeof alertsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useAlerts
// ============================================================================

export const alertsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "schedule", "alerts", "getAlerts"],
    queryFn: () => getAlerts({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
