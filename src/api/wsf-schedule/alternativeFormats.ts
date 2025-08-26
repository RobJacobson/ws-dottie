import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getAlternativeFormats
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/alternativeformats/{subjectName}";

/**
 * API function for fetching alternative format data from WSF Schedule API
 *
 * Retrieves alternative format data for a given subject name. This endpoint
 * provides access to different data formats and representations that may be
 * useful for various applications and use cases.
 *
 * @param params - Object containing subjectName
 * @param params.subjectName - The subject name for which to retrieve alternative formats
 * @returns Promise resolving to an array of AlternativeFormat objects containing format information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const formats = await getAlternativeFormats({ subjectName: "Schedule" });
 * console.log(formats[0].AltTitle); // "PDF Schedule"
 * ```
 */
export const getAlternativeFormats = async (
  params: GetAlternativeFormatsParams
): Promise<AlternativeFormat[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getAlternativeFormatsParamsSchema,
      output: alternativeFormatsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getAlternativeFormatsParamsSchema
// GetAlternativeFormatsParams
// ============================================================================

export const getAlternativeFormatsParamsSchema = z
  .object({
    subjectName: z.string().describe(""),
  })
  .describe("");

export type GetAlternativeFormatsParams = z.infer<
  typeof getAlternativeFormatsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// alternativeFormatSchema
// alternativeFormatsArraySchema
// AlternativeFormat
// ============================================================================

export const alternativeFormatSchema = z
  .object({
    AltID: z.number().describe(""),
    SubjectID: z.number().describe(""),
    SubjectName: z.string().describe(""),
    AltTitle: z.string().describe(""),
    AltUrl: z.string().describe(""),
    AltDesc: z.string().describe(""),
    FileType: z.string().describe(""),
    Status: z.string().describe(""),
    SortSeq: z.number().describe(""),
    FromDate: zWsdotDate().nullable().describe(""),
    ThruDate: zWsdotDate().nullable().describe(""),
    ModifiedDate: zWsdotDate().nullable().describe(""),
    ModifiedBy: z.string().describe(""),
  })
  .describe("");

export const alternativeFormatsArraySchema = z.array(alternativeFormatSchema);

export type AlternativeFormat = z.infer<typeof alternativeFormatSchema>;

// ============================================================================
// TanStack Query Hook
//
// useAlternativeFormats
// ============================================================================

/**
 * React Query hook for fetching alternative format data from WSF Schedule API
 *
 * Retrieves alternative format data for a given subject name. This endpoint
 * provides access to different data formats and representations that may be
 * useful for various applications and use cases.
 *
 * @param params - Object containing subjectName
 * @param params.subjectName - The subject name for which to retrieve alternative formats
 * @param options - Optional React Query options
 * @returns React Query result object containing alternative format information
 *
 * @example
 * ```typescript
 * const { data: formats } = useAlternativeFormats({ subjectName: "Schedule" });
 * console.log(formats?.[0]?.AltTitle); // "PDF Schedule"
 * ```
 */
export const useAlternativeFormats = (
  params: GetAlternativeFormatsParams,
  options?: TanStackOptions<AlternativeFormat[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "alternativeFormats", JSON.stringify(params)],
    queryFn: () => getAlternativeFormats(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
