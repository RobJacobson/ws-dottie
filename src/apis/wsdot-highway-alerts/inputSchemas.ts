import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Input schema for GetAlerts endpoint
 */
export const GetAlertsInputSchema = z.object({});

export type GetAlertsInput = z.infer<typeof GetAlertsInputSchema>;

/**
 * Input schema for GetAlert endpoint
 */
export const GetAlertInputSchema = z.object({
  AlertID: z.number().describe("AlertID for a specific incident."),
});

export type GetAlertInput = z.infer<typeof GetAlertInputSchema>;

/**
 * Input schema for SearchAlerts endpoint
 */
export const SearchAlertsInputSchema = z.object({
  StateRoute: z
    .string()
    .optional()
    .describe(
      "Optional. A State Route formatted as a three digit number. I-5 would be 005."
    ),
  Region: z
    .string()
    .optional()
    .describe(
      "Optional. Use the integer code as follows: 8 - North Central, 11 - South Central, 12 - Southwest, 9 - Northwest, 10 - Olympic, 7 - Eastern."
    ),
  SearchTimeStart: zWsdotDate()
    .optional()
    .describe("Optional. Will only find alerts occuring after this time."),
  SearchTimeEnd: zWsdotDate()
    .optional()
    .describe("Optional. Will only find alerts occuring before this time."),
  StartingMilepost: z
    .number()
    .optional()
    .describe("Optional. Will only find alerts after this milepost."),
  EndingMilepost: z
    .number()
    .optional()
    .describe("Optional. Will only find alerts before this milepost."),
});

export type SearchAlertsInput = z.infer<typeof SearchAlertsInputSchema>;

/**
 * Input schema for GetAlertsForMapArea endpoint
 */
export const GetAlertsForMapAreaInputSchema = z.object({
  MapArea: z.string().describe("The area to limit results to."),
});

export type GetAlertsForMapAreaInput = z.infer<
  typeof GetAlertsForMapAreaInputSchema
>;

/**
 * Input schema for GetAlertsByRegionID endpoint
 */
export const GetAlertsByRegionIDInputSchema = z.object({
  RegionID: z.string().describe("The region ID to limit results to."),
});

export type GetAlertsByRegionIDInput = z.infer<
  typeof GetAlertsByRegionIDInputSchema
>;
