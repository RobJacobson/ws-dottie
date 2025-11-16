/**
 * @fileoverview WSF Schedule API Input Schemas for Schedule Alerts
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to schedule alert operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for AllAlerts input parameters
 *
 * This operation provides alert information tailored for routes, bulletins, service disruptions, etc. */
export const scheduleAlertsInputSchema = z
  .object({})
  .describe("Input parameters for retrieving all schedule alerts.");

export type ScheduleAlertsInput = z.infer<typeof scheduleAlertsInputSchema>;
