import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";
import {
  zLatitude,
  zLongitude,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Get all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise containing all highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alerts = await getHighwayAlerts({});
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
 */
export const getHighwayAlerts = async (params: GetHighwayAlertsParams = {}) => {
  return zodFetch(
    ENDPOINT,
    {
      input: getHighwayAlertsParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getHighwayAlertsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all highway alerts. The API returns all active highway alerts across Washington State."
  );

export type GetHighwayAlertsParams = z.infer<
  typeof getHighwayAlertsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const highwayAlertRoadwayLocationSchema = z
  .object({
    Description: zNullableString().describe(
      "Human-readable description of the roadway location where the highway alert applies. May be null if no descriptive information is available. Examples include 'Northbound lanes', 'Bridge approach', 'Tunnel entrance', or 'Interchange with SR 520'."
    ),

    Direction: zNullableString().describe(
      "Direction of travel indicator for the roadway location. May be null if direction information is not applicable or not available. Examples include 'Northbound', 'Southbound', 'Eastbound', 'Westbound', 'Both Directions', or 'All Lanes'."
    ),

    Latitude: zLatitude().describe(
      "Latitude coordinate of the roadway location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the alert location. Essential for GPS navigation and geographic information systems."
    ),

    Longitude: zLongitude().describe(
      "Longitude coordinate of the roadway location in decimal degrees using WGS84 coordinate system. Used for mapping applications and geographic positioning of the alert location. Essential for GPS navigation and geographic information systems."
    ),

    MilePost: z
      .number()
      .describe(
        "Milepost marker indicating the distance along the highway or road where the alert is located. This is a standard highway reference point used by transportation departments for location identification and maintenance purposes."
      ),

    RoadName: z
      .string()
      .describe(
        "Name of the highway or road where the alert is located. Examples include 'I-5', 'SR 520', 'US-2', or 'I-90'. This field helps users identify which roadway the alert applies to."
      ),
  })
  .catchall(z.unknown())
  .describe(
    "Geographic and descriptive information about a roadway location where a highway alert applies. Contains coordinates, road information, and descriptive details that help identify and locate the specific alert point."
  );

export const highwayAlertSchema = z
  .object({
    AlertID: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier assigned to this highway alert by the WSDOT system. This ID serves as a permanent, unique reference for the alert across all WSDOT systems and can be used for tracking, reporting, and data correlation purposes."
      ),

    County: zNullableString().describe(
      "Name of the county where the highway alert is located. May be null if county information is not available or not applicable. Examples include 'King County', 'Pierce County', 'Spokane County', or 'Whatcom County'."
    ),

    EndRoadwayLocation: highwayAlertRoadwayLocationSchema.describe(
      "Geographic endpoint of the alert zone along the roadway. This object provides the ending location coordinates and descriptive information for the alert area, helping define the full scope of the affected roadway section."
    ),

    EndTime: zWsdotDate()
      .nullable()
      .describe(
        "Timestamp indicating when the highway alert is expected to end or when the traffic condition is expected to be resolved. May be null if the end time is not yet determined or if the alert is ongoing without a projected end time. All times are in Pacific Time Zone."
      ),

    EventCategory: z
      .string()
      .describe(
        "Category classification for the type of highway alert or traffic event. Examples include 'Collision', 'Construction', 'Weather', 'Special Event', 'Road Closure', 'Maintenance', or 'Other'. This field helps users understand the nature of the traffic disruption."
      ),

    EventStatus: z
      .string()
      .describe(
        "Current status of the highway alert or traffic event. Examples include 'Active', 'Cleared', 'Scheduled', 'In Progress', 'Resolved', or 'Cancelled'. This field indicates whether the alert is currently affecting traffic or has been resolved."
      ),

    ExtendedDescription: z
      .string()
      .describe(
        "Detailed description of the highway alert providing comprehensive information about the traffic condition, incident details, or road closure. This field contains the full narrative description that explains what is happening, why it's happening, and what drivers should expect."
      ),

    HeadlineDescription: z
      .string()
      .describe(
        "Brief, concise description of the highway alert designed for quick reading and immediate understanding. This field provides a summary of the traffic condition in a few words, such as 'Collision on I-5', 'Construction on SR 520', or 'Weather delay on I-90'."
      ),

    LastUpdatedTime: zWsdotDate().describe(
      "Timestamp indicating when this highway alert was last updated in the WSDOT system. This field shows the currency of the alert information and helps users determine if they should check for more recent updates. All times are in Pacific Time Zone."
    ),

    Priority: z
      .string()
      .describe(
        "Priority level assigned to the highway alert indicating its importance and urgency. Examples include 'High', 'Medium', 'Low', 'Critical', or 'Normal'. This field helps users and traffic management systems prioritize which alerts require immediate attention."
      ),

    Region: z
      .string()
      .describe(
        "Geographic region of Washington State where the highway alert is located. Examples include 'Northwest', 'Northeast', 'Southwest', 'Southeast', 'Central', 'Olympic Peninsula', or 'Puget Sound'. This field helps users understand the general area affected by the alert."
      ),

    StartRoadwayLocation: highwayAlertRoadwayLocationSchema.describe(
      "Geographic starting point of the alert zone along the roadway. This object provides the beginning location coordinates and descriptive information for the alert area, helping define the full scope of the affected roadway section."
    ),

    StartTime: zWsdotDate().describe(
      "Timestamp indicating when the highway alert began or when the traffic condition first occurred. This field shows when the alert was first reported or when the traffic disruption started. All times are in Pacific Time Zone."
    ),
  })
  .catchall(z.unknown())
  .describe(
    "Complete highway alert information including location details, event classification, timing, and descriptive text. This schema represents comprehensive alert data from the WSDOT Highway Alerts API, providing essential information for traffic management, driver awareness, and transportation safety. The alert details are critical for real-time traffic monitoring, route planning, and emergency response coordination."
  );

export const highwayAlertArraySchema = z
  .array(highwayAlertSchema)
  .describe(
    "Array of highway alert data for all active alerts across Washington State highways. This collection provides comprehensive alert information that enables traffic monitoring, route planning, and transportation safety management."
  );

export type HighwayAlertRoadwayLocation = z.infer<
  typeof highwayAlertRoadwayLocationSchema
>;
export type HighwayAlert = z.infer<typeof highwayAlertSchema>;

// ============================================================================
// QUERY
// ============================================================================

/**
 * Hook for getting all highway alerts from WSDOT Highway Alerts API
 *
 * Returns current traffic alerts in JSON format. This endpoint provides
 * all active highway alerts across Washington State.
 *
 * @param params - No parameters required (empty object for consistency)
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with highway alert data
 */
export const useHighwayAlerts = (
  params: GetHighwayAlertsParams = {},
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "highway-alerts", "getHighwayAlerts", params],
    queryFn: () => getHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
