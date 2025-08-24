import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

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
    subjectName: z
      .string()
      .describe(
        "Name of the subject for which to retrieve alternative format information."
      ),
  })
  .describe(
    "Parameters for retrieving alternative format information for a specific subject."
  );

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
    AltID: z
      .number()
      .describe(
        "Unique identifier for the alternative format. Primary key for format identification and used to reference specific format versions."
      ),
    SubjectID: z
      .number()
      .describe(
        "Unique identifier for the subject. Links to the main content or topic that this alternative format represents."
      ),
    SubjectName: z
      .string()
      .describe(
        "Name of the subject. Human-readable identifier for the content or topic (e.g., 'Schedule', 'Fares', 'Terminals')."
      ),
    AltTitle: z
      .string()
      .describe(
        "Title of the alternative format. Human-readable identifier for the format version (e.g., 'PDF Schedule', 'Excel Fares', 'CSV Terminals')."
      ),
    AltUrl: z
      .string()
      .describe(
        "URL to access the alternative format. Provides direct access to the content in the specified format for download or viewing."
      ),
    AltDesc: z
      .string()
      .describe(
        "Description of the alternative format. Explains the format characteristics, content, and intended use for passengers and developers."
      ),
    FileType: z
      .string()
      .describe(
        "File type of the alternative format. Indicates the format extension or MIME type (e.g., 'PDF', 'XLSX', 'CSV', 'JSON')."
      ),
    Status: z
      .string()
      .describe(
        "Status of the alternative format. Indicates availability and access status (e.g., 'Active', 'Inactive', 'Maintenance')."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures formats are displayed in the correct order across different systems and interfaces."
      ),
    FromDate: zWsdotDate()
      .nullable()
      .describe(
        "Start date for the alternative format availability. Null when always available, specific date when format becomes accessible."
      ),
    ThruDate: zWsdotDate()
      .nullable()
      .describe(
        "End date for the alternative format availability. Null when always available, specific date when format expires or becomes inaccessible."
      ),
    ModifiedDate: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp when this alternative format was last modified. Indicates the freshness of the content and helps determine when information was last updated."
      ),
    ModifiedBy: z
      .string()
      .describe(
        "Identifier for who modified this alternative format. Tracks content ownership, responsibility, and modification history."
      ),
  })
  .describe(
    "Alternative format information for accessing schedule data in different formats, such as PDFs, spreadsheets, or other file types. This schema provides access to schedule information in formats suitable for different use cases and applications."
  );

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
