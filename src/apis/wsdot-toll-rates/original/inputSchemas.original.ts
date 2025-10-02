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
export const getTollRatesSchema = z.object({});

export type GetTollRatesInput = z.infer<typeof getTollRatesSchema>;

/**
 * Input schema for GetTollTripInfo endpoint (void input - only AccessCode)
 */
export const getTollTripInfoSchema = z.object({});

export type GetTollTripInfoInput = z.infer<typeof getTollTripInfoSchema>;

/**
 * Input schema for GetTollTripRates endpoint (void input - only AccessCode)
 */
export const getTollTripRatesSchema = z.object({});

export type GetTollTripRatesInput = z.infer<typeof getTollTripRatesSchema>;

/**
 * Input schema for GetTollTripVersion endpoint (void input - only AccessCode)
 */
export const getTollTripVersionSchema = z.object({});

export type GetTollTripVersionInput = z.infer<typeof getTollTripVersionSchema>;

/**
 * Input schema for GetTripRatesByDate endpoint
 */
export const getTripRatesByDateSchema = z.object({
  /** Start date for the trip rates query. */
  FromDate: z.string().describe("Start date for the trip rates query."),
  /** End date for the trip rates query. */
  ToDate: z.string().describe("End date for the trip rates query."),
});

export type GetTripRatesByDateInput = z.infer<typeof getTripRatesByDateSchema>;

/**
 * Input schema for GetTripRatesByVersion endpoint
 */
export const getTripRatesByVersionSchema = z.object({
  /** Version number for the trip rates query. */
  version: z.number().describe("Version number for the trip rates query."),
});

export type GetTripRatesByVersionInput = z.infer<
  typeof getTripRatesByVersionSchema
>;
