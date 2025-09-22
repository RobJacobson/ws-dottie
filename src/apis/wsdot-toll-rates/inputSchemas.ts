/**
 * @fileoverview WSDOT Toll Rates API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSDOT
 * Toll Rates API endpoints.
 */

import { z } from "zod";

/**
 * Input schema for GetTollRates endpoint (void input - only AccessCode)
 */
export const getTollRatesInputSchema = z.object({});

export type GetTollRatesInput = z.infer<typeof getTollRatesInputSchema>;

/**
 * Input schema for GetTollTripInfo endpoint (void input - only AccessCode)
 */
export const getTollTripInfoInputSchema = z.object({});

export type GetTollTripInfoInput = z.infer<typeof getTollTripInfoInputSchema>;

/**
 * Input schema for GetTollTripRates endpoint (void input - only AccessCode)
 */
export const getTollTripRatesInputSchema = z.object({});

export type GetTollTripRatesInput = z.infer<typeof getTollTripRatesInputSchema>;

/**
 * Input schema for GetTollTripVersion endpoint (void input - only AccessCode)
 */
export const getTollTripVersionInputSchema = z.object({});

export type GetTollTripVersionInput = z.infer<
  typeof getTollTripVersionInputSchema
>;

/**
 * Input schema for GetTripRatesByDate endpoint
 */
export const getTripRatesByDateInputSchema = z.object({
  fromDate: z.string().describe("Start date for the trip rates query."),
  toDate: z.string().describe("End date for the trip rates query."),
});

export type GetTripRatesByDateInput = z.infer<
  typeof getTripRatesByDateInputSchema
>;

/**
 * Input schema for GetTripRatesByVersion endpoint
 */
export const getTripRatesByVersionInputSchema = z.object({
  version: z.number().describe("Version number for the trip rates query."),
});

export type GetTripRatesByVersionInput = z.infer<
  typeof getTripRatesByVersionInputSchema
>;
