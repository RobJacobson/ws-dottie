import { z } from "zod";

import { zFlexibleDate, zPositiveInteger } from "./index";

/**
 * Schema template utilities for reducing repetitive descriptions
 * and validation patterns across WS-Dottie APIs
 */

/**
 * Creates a vessel ID parameter schema with contextual description
 */
export const createVesselIdParam = (purpose: string) =>
  z.object({
    vesselId: zPositiveInteger("vessel").describe(
      `The unique identifier for the vessel ${purpose}. Each vessel has a permanent ID number used across all API endpoints. For example, vessel ID 1 corresponds to M/V Cathlamet. This ID can be found from the getVesselBasics() endpoint.`
    ),
  });

/**
 * Creates vessel ID parameter description for inline use
 */
export const createVesselIdDescription = (purpose: string) =>
  `The unique identifier for the vessel ${purpose}. Each vessel has a permanent ID number used across all API endpoints. For example, vessel ID 1 corresponds to M/V Cathlamet. This ID can be found from the getVesselBasics() endpoint.`;

/**
 * Creates date range parameter schemas with validation
 */
export const createDateRangeParams = (context: string) => ({
  dateStart: zFlexibleDate().describe(
    `The start date for ${context}. Can be provided as a JavaScript Date object or ISO date string (YYYY-MM-DD). The API will return data starting from this date. Note that historical data availability may be limited for dates too far in the past.`
  ),
  dateEnd: zFlexibleDate().describe(
    `The end date for ${context}. Can be provided as a JavaScript Date object or ISO date string (YYYY-MM-DD). Must be the same date or after the dateStart. The API will return data up to and including this date.`
  ),
});

/**
 * Date range validation refinement
 */
export const createDateRangeRefinement = () => ({
  refine: (data: { dateStart: Date | string; dateEnd: Date | string }) => {
    const start =
      data.dateStart instanceof Date
        ? data.dateStart
        : new Date(data.dateStart);
    const end =
      data.dateEnd instanceof Date ? data.dateEnd : new Date(data.dateEnd);
    return start <= end;
  },
  errorConfig: {
    message: "dateStart must be before or equal to dateEnd",
    path: ["dateEnd"] as const,
  },
});

/**
 * Creates batch size parameter with sensible defaults
 */
export const createBatchSizeParam = (
  context: string,
  defaultSize = 6,
  maxSize = 20
) =>
  z
    .number()
    .int()
    .positive()
    .max(maxSize)
    .optional()
    .default(defaultSize)
    .describe(
      `Optional batch size for processing ${context} requests to avoid overwhelming the server. Default is ${defaultSize} concurrent requests. Larger values may be faster but could hit rate limits. Smaller values are more conservative but slower. Maximum allowed is ${maxSize}.`
    );

/**
 * Creates vessel name parameter with validation
 */
export const createVesselNameParam = (context: string) =>
  z
    .string()
    .min(1, "Vessel name cannot be empty")
    .describe(
      `The name of the vessel without the 'M/V' prefix (e.g., 'Cathlamet', 'Spokane', 'Walla Walla') ${context}. This should match the vessel name exactly as it appears in the WSF system. You can get valid vessel names from the getVesselBasics() endpoint using the VesselName field with the 'M/V ' prefix removed.`
    );

/**
 * Creates vessel names array parameter
 */
export const createVesselNamesParam = (context: string) =>
  z
    .array(z.string().min(1))
    .min(1, "At least one vessel name is required")
    .describe(
      `Array of vessel names without the 'M/V' prefix (e.g., ['Cathlamet', 'Spokane', 'Walla Walla']) ${context}. Each name should match exactly as it appears in the WSF system. This allows fetching data for multiple vessels in a single operation, which is more efficient than individual calls.`
    );
