import { z } from "zod";

/**
 * Schema template utilities for reducing repetitive descriptions
 * and validation patterns across WS-Dottie APIs
 *
 * These templates provide consistent, AI-friendly documentation for common
 * parameter types used across vessel, terminal, and other API endpoints.
 */

/**
 * Creates vessel ID parameter description for inline use
 *
 * Generates a consistent description for vessel ID parameters that explains
 * what the ID represents and how to obtain valid values.
 *
 * @param purpose - The purpose for which the vessel ID is being used
 * @returns Formatted description string for vessel ID parameters
 *
 * @example
 * ```typescript
 * vesselId: z.number().describe(
 *   createVesselIdDescription("whose basic information you want to retrieve")
 * )
 * ```
 */
export const createVesselIdDescription = (purpose: string) =>
  `The unique identifier for the vessel ${purpose}. Each vessel has a permanent ID number used across all API endpoints. For example, vessel ID 1 corresponds to Cathlamet. This ID can be found from the getVesselBasics() endpoint.`;

/**
 * Creates date range parameter schemas with validation
 *
 * Generates a consistent pair of date parameters (start and end dates)
 * with appropriate descriptions and validation context.
 *
 * @param context - The context in which the date range is being used
 * @returns Object containing dateStart and dateEnd Zod schemas
 *
 * @example
 * ```typescript
 * const dateParams = createDateRangeParams("historical data retrieval");
 * // Returns: { dateStart: z.date().describe("..."), dateEnd: z.date().describe("...") }
 * ```
 */
export const createDateRangeParams = (context: string) => ({
  dateStart: z
    .date()
    .describe(
      `The start date for ${context}. The API will return data starting from this date. Note that historical data availability may be limited for dates too far in the past.`
    ),
  dateEnd: z
    .date()
    .describe(
      `The end date for ${context}. Must be the same date or after the dateStart. The API will return data up to and including this date.`
    ),
});

/**
 * Date range validation refinement
 *
 * Provides validation logic to ensure that start date is before or equal to end date.
 * Returns both the refinement function and error configuration for easy use.
 *
 * @returns Object containing refine function and errorConfig for date validation
 *
 * @example
 * ```typescript
 * const { refine, errorConfig } = createDateRangeRefinement();
 * z.object({
 *   dateStart: z.date(),
 *   dateEnd: z.date()
 * }).refine(refine, errorConfig)
 * ```
 */
export const createDateRangeRefinement = () => ({
  refine: (data: { dateStart: Date; dateEnd: Date }) => {
    return data.dateStart <= data.dateEnd;
  },
  errorConfig: {
    message: "dateStart must be before or equal to dateEnd",
    path: ["dateEnd"],
  },
});

/**
 * Creates batch size parameter with sensible defaults
 *
 * Generates a consistent batch size parameter with validation, defaults,
 * and context-aware descriptions for batch processing operations.
 *
 * @param context - The context in which the batch size is being used
 * @param defaultSize - Default batch size value (default: 6)
 * @param maxSize - Maximum allowed batch size (default: 20)
 * @returns Zod schema for batch size parameter with validation and defaults
 *
 * @example
 * ```typescript
 * batchSize: createBatchSizeParam("vessel history retrieval", 6, 10)
 * ```
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
 *
 * Generates a consistent vessel name parameter with validation rules
 * and context-aware descriptions for vessel identification.
 *
 * @param context - The context in which the vessel name is being used
 * @returns Zod schema for vessel name parameter with validation
 *
 * @example
 * ```typescript
 * vesselName: createVesselNameParam("for historical data retrieval")
 * ```
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
 *
 * Generates a consistent array of vessel names parameter with validation
 * for operations that can handle multiple vessels simultaneously.
 *
 * @param context - The context in which the vessel names are being used
 * @returns Zod schema for vessel names array parameter with validation
 *
 * @example
 * ```typescript
 * vesselNames: createVesselNamesParam("for bulk operations")
 * ```
 */
export const createVesselNamesParam = (context: string) =>
  z
    .array(z.string().min(1))
    .min(1, "At least one vessel name is required")
    .describe(
      `Array of vessel names without the 'M/V' prefix (e.g., ['Cathlamet', 'Spokane', 'Walla Walla']) ${context}. Each name should match exactly as it appears in the WSF system. This allows fetching data for multiple vessels in a single operation, which is more efficient than individual calls.`
    );
