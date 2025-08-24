import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import { zWsdotDate } from "@/shared/validation";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// OUTPUT SCHEMA & TYPES (Base schemas for route details)
// ============================================================================

export const serviceDisruptionSchema = z
  .record(z.string(), z.unknown())
  .describe(
    "Service disruption information stored as key-value pairs. Contains dynamic disruption data that varies by route and time, including alerts, delays, cancellations, and other operational issues affecting ferry service."
  );

export const annotationSchema = z
  .object({
    AnnotationID: z
      .number()
      .describe(
        "Unique identifier for the annotation. Used to reference specific annotation details and maintain consistency across API responses."
      ),
    AnnotationText: z
      .string()
      .describe(
        "Human-readable text describing the annotation. Provides context about schedule changes, special conditions, or important notices that affect ferry operations."
      ),
    AnnotationIVRText: z
      .string()
      .describe(
        "Text version of the annotation optimized for Interactive Voice Response systems. Used for phone-based schedule inquiries and automated announcements."
      ),
    AdjustedCrossingTime: z
      .number()
      .nullable()
      .describe(
        "Adjusted crossing time in minutes, if applicable. Null when no time adjustment is needed. Positive values indicate delays, negative values indicate early departures."
      ),
    AnnotationImg: z
      .string()
      .describe(
        "URL or identifier for an image associated with the annotation. May contain visual information about the annotation, such as route maps or service notices."
      ),
    TypeDescription: z
      .string()
      .describe(
        "Human-readable description of the annotation type. Categorizes the nature of the annotation (e.g., 'Delay', 'Cancellation', 'Special Service')."
      ),
    SortSeq: z
      .number()
      .describe(
        "Sorting sequence number for display ordering. Ensures annotations are displayed in the correct order across different systems and interfaces."
      ),
  })
  .describe(
    "Annotation information for schedule changes, special conditions, or important notices. Provides additional context about ferry operations and helps passengers understand service modifications."
  );

export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zWsdotDate().describe(
      "Start date for the contingency adjustment period. Indicates when the adjustment becomes effective and begins affecting ferry schedules."
    ),
    DateThru: zWsdotDate().describe(
      "End date for the contingency adjustment period. Indicates when the adjustment expires and normal scheduling resumes."
    ),
    EventID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for the event causing the contingency adjustment. Null when no specific event is associated with the adjustment."
      ),
    EventDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the event causing the contingency adjustment. Provides context about why the schedule modification is necessary (e.g., 'Maintenance', 'Weather', 'Special Event')."
      ),
    AdjType: z
      .number()
      .describe(
        "Type of adjustment being applied. Numeric code indicating the nature of the contingency change (e.g., 1=Delay, 2=Cancellation, 3=Route Change)."
      ),
    ReplacedBySchedRouteID: z
      .number()
      .nullable()
      .describe(
        "ID of the scheduled route that replaces the affected route during the contingency period. Null when no replacement route is provided or when the adjustment doesn't involve route substitution."
      ),
  })
  .describe(
    "Contingency adjustment information for schedule changes due to special events, maintenance, weather conditions, or other operational requirements. These adjustments modify normal ferry schedules to accommodate exceptional circumstances."
  );

export const routeDetailsSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Primary key for route identification and used consistently across all WSF systems and APIs."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays, schedules, and references (e.g., 'SEA-BI' for Seattle to Bainbridge Island)."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose, terminals served, and operational characteristics."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the route. Groups routes by geographic area and helps organize ferry operations by service region."
      ),
    CrossingTime: z
      .string()
      .nullable()
      .describe(
        "Typical crossing time in minutes for this route as a string. Null when crossing time is not available. Represents the scheduled duration from departure to arrival."
      ),
    ReservationFlag: z
      .boolean()
      .describe(
        "Indicates whether reservations are required for this route. True when advance booking is necessary, false when first-come-first-served boarding is available."
      ),
    PassengerOnlyFlag: z
      .boolean()
      .describe(
        "Indicates whether this route is passenger-only (no vehicles). True when only passengers are allowed, false when vehicles can be transported."
      ),
    InternationalFlag: z
      .boolean()
      .describe(
        "Indicates whether this route crosses international boundaries. True for routes to Canada (e.g., Anacortes to Sidney BC), false for domestic routes."
      ),
    VesselWatchID: z
      .number()
      .describe(
        "Identifier for vessel monitoring on this route. Used for tracking vessel locations, status, and operational information specific to this route."
      ),
    GeneralRouteNotes: z
      .string()
      .describe(
        "General notes about the route. Contains important information for travelers, operational details, and general route characteristics."
      ),
    SeasonalRouteNotes: z
      .string()
      .nullable()
      .describe(
        "Seasonal notes about the route. Contains information about route availability during different seasons, including summer schedules and winter modifications. Null when no seasonal notes are available."
      ),
    AdaNotes: z
      .string()
      .nullable()
      .describe(
        "Americans with Disabilities Act notes for this route. Contains accessibility information, requirements, and accommodations available for passengers with disabilities."
      ),
    ServiceDisruptions: z
      .array(serviceDisruptionSchema)
      .describe(
        "Array of service disruption information for this route. Contains current disruption status, delays, cancellations, or other operational issues affecting this specific route."
      ),
  })
  .describe(
    "Detailed route information including operational characteristics, accessibility notes, seasonal variations, and current alert status. This schema provides comprehensive route details for passenger information and operational management."
  );

export const routeDetailsArraySchema = z.array(routeDetailsSchema);

export type RouteDetails = z.infer<typeof routeDetailsSchema>;

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getRouteDetailsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve schedule information. This date determines which schedule data is returned."
      ),
  })
  .describe(
    "Parameters for retrieving detailed route information for a given trip date."
  );

export type GetRouteDetailsParams = z.infer<typeof getRouteDetailsParamsSchema>;

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/routedetails/{tripDate}";

/**
 * API function for fetching route details from WSF Schedule API
 *
 * Retrieves detailed route information for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of RouteDetails objects containing detailed route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routeDetails = await getRouteDetails({ tripDate: new Date('2024-01-15') });
 * console.log(routeDetails[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRouteDetails = async (
  params: GetRouteDetailsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRouteDetailsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching route details from WSF Schedule API
 *
 * Retrieves detailed route information for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information
 *
 * @example
 * ```typescript
 * const { data: routeDetails } = useRouteDetails({ tripDate: new Date('2024-01-15') });
 * console.log(routeDetails?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRouteDetails = (
  params: GetRouteDetailsParams,
  options?: TanStackOptions<RouteDetails[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "routeDetails", JSON.stringify(params)],
    queryFn: () => getRouteDetails(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
