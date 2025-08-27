/**
 * WSF Fares API - Terminal Combinations
 *
 * Provides access to Washington State Ferries terminal combination information,
 * including route details and fare availability for specific terminal pairs.
 * This API enables applications to discover valid route combinations and
 * understand the structure of fare data across different terminal connections.
 *
 * The terminal combo endpoints return information about valid terminal
 * combinations for fare queries, including route descriptions and fare
 * availability. This information is essential for building route selection
 * interfaces and understanding the fare structure across the WSF network.
 *
 * API Functions:
 * - getTerminalCombo: Returns terminal combination information for specific route and date
 * - getTerminalComboVerbose: Returns detailed terminal combination data for all routes on a date
 *
 * Input/Output Overview:
 * - getTerminalCombo: Input: { tripDate: Date, departingTerminalID: number, arrivingTerminalID: number }, Output: TerminalCombo
 * - getTerminalComboVerbose: Input: { tripDate: Date }, Output: TerminalComboVerbose[]
 *
 * Base Types: TerminalCombo, TerminalComboVerbose
 *
 * interface TerminalCombo {
 *   DepartingDescription: string;
 *   ArrivingDescription: string;
 *   CollectionDescription: string;
 * }
 *
 * interface TerminalComboVerbose {
 *   DepartingTerminalID: number;
 *   DepartingDescription: string;
 *   ArrivingTerminalID: number;
 *   ArrivingDescription: string;
 *   CollectionDescription: string;
 * }
 *
 * Example Usage:
 *
 * # Get terminal combo for specific route
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/terminalcombo/2025-08-26/7/3?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * # Get all terminal combos for a date
 * curl -s "https://www.wsdot.wa.gov/ferries/api/fares/rest/terminalcomboverbose/2025-08-26?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from the terminal combo endpoint:
 *
 * ```json
 * {
 *   "DepartingDescription": "Seattle",
 *   "ArrivingDescription": "Bainbridge Island",
 *   "CollectionDescription": "Passenger and vehicle/driver fares are collected at Seattle, while vehicle/driver only fares are collected at Bainbridge Island."
 * }
 * ```
 *
 * Note: The terminal combo endpoints provide route information that complements
 * the fare line items endpoints, allowing applications to understand both the
 * available routes and their associated pricing structures.
 */
import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminalCombo (singular item)
// getTerminalComboVerbose (array)
// ============================================================================

const ENDPOINT_SINGULAR =
  "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalID}/{arrivingTerminalID}";
const ENDPOINT_ARRAY =
  "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}";

export const getTerminalCombo = async (
  params: GetTerminalComboParams
): Promise<TerminalCombo> => {
  return zodFetch(
    ENDPOINT_SINGULAR,
    {
      input: getTerminalComboParamsSchema,
      output: terminalComboSchema,
    },
    params
  );
};

export const getTerminalComboVerbose = async (
  params: GetTerminalComboVerboseParams
): Promise<TerminalComboVerbose[]> => {
  return zodFetch(
    ENDPOINT_ARRAY,
    {
      input: getTerminalComboVerboseParamsSchema,
      output: terminalComboVerboseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalComboParamsSchema
// getTerminalComboVerboseParamsSchema
// GetTerminalComboParams
// GetTerminalComboVerboseParams
// ============================================================================

export const getTerminalComboParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
  })
  .describe("");

export const getTerminalComboVerboseParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetTerminalComboParams = z.infer<
  typeof getTerminalComboParamsSchema
>;

export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalComboSchema
// terminalComboVerboseSchema
// terminalComboVerboseArraySchema
// TerminalCombo
// TerminalComboVerbose
// ============================================================================

export const terminalComboSchema = z
  .object({
    DepartingDescription: z.string().describe(""),
    ArrivingDescription: z.string().describe(""),
    CollectionDescription: z.string().describe(""),
  })
  
  .describe("");

export const terminalComboVerboseSchema = z
  .object({
    DepartingTerminalID: z.number().int().positive().describe(""),
    DepartingDescription: z.string().describe(""),
    ArrivingTerminalID: z.number().int().positive().describe(""),
    ArrivingDescription: z.string().describe(""),
    CollectionDescription: z.string().describe(""),
  })
  
  .describe("");

export const terminalComboVerboseArraySchema = z
  .array(terminalComboVerboseSchema)
  .describe("");

export type TerminalCombo = z.infer<typeof terminalComboSchema>;
export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalCombo (singular item)
// useTerminalComboVerbose (array)
// ============================================================================

export const useTerminalCombo = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
  },
  options?: Omit<UseQueryOptions<TerminalCombo, Error>, "queryKey" | "queryFn">
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "terminalCombo",
      params.tripDate.toISOString(),
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalComboVerbose = (
  params: {
    tripDate: Date;
  },
  options?: Omit<
    UseQueryOptions<TerminalComboVerbose[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "terminalComboVerbose",
      params.tripDate.toISOString(),
    ],
    queryFn: () =>
      getTerminalComboVerbose({
        tripDate: params.tripDate,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
