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
export const GetTollRatesInputSchema = z.object({});

export type GetTollRatesInput = z.infer<typeof GetTollRatesInputSchema>;

/**
 * Input schema for GetTollTripInfo endpoint (void input - only AccessCode)
 */
export const GetTollTripInfoInputSchema = z.object({});

export type GetTollTripInfoInput = z.infer<typeof GetTollTripInfoInputSchema>;

/**
 * Input schema for GetTollTripRates endpoint (void input - only AccessCode)
 */
export const GetTollTripRatesInputSchema = z.object({});

export type GetTollTripRatesInput = z.infer<typeof GetTollTripRatesInputSchema>;

/**
 * Input schema for GetTollTripVersion endpoint (void input - only AccessCode)
 */
export const GetTollTripVersionInputSchema = z.object({});

export type GetTollTripVersionInput = z.infer<
  typeof GetTollTripVersionInputSchema
>;

/**
 * Input schema for GetTripRatesByDate endpoint
 */
export const GetTripRatesByDateInputSchema = z.object({
  fromDate: z.string().describe("Start date for the trip rates query."),
  toDate: z.string().describe("End date for the trip rates query."),
});

export type GetTripRatesByDateInput = z.infer<
  typeof GetTripRatesByDateInputSchema
>;

/**
 * Input schema for GetTripRatesByVersion endpoint
 */
export const GetTripRatesByVersionInputSchema = z.object({
  version: z.number().describe("Version number for the trip rates query."),
});

export type GetTripRatesByVersionInput = z.infer<
  typeof GetTripRatesByVersionInputSchema
>;
