/**
 * @module WSDOT — Toll Trip Version API
 * @description Current version number for toll trip data.
 *
 * Provides:
 * - Version value for toll trip datasets
 *
 * Data includes:
 * - Version number
 *
 * @functions
 *   - getTollTripVersion: Returns current toll trip version
 *
 * @input
 *   - getTollTripVersion: {}
 *
 * @output
 *   - getTollTripVersion: TollTripVersion
 *   - TollTripVersion fields:
 *     - Version: Version number
 *
 * @cli
 *   - getTollTripVersion: node dist/cli.mjs getTollTripVersion
 *
 * @exampleResponse
 * {
 *   "Version": 352417
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
 */
import { z } from "zod";
import {
  type TollTripVersion,
  tollTripVersionSchema,
} from "@/schemas/wsdot-toll-rates";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetchCustom } from "@/shared/fetching";

export const getTollTripVersion = async (
  params: GetTollTripVersionParams = {}
): Promise<TollTripVersion> => {
  return zodFetchCustom(
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson",
    {
      input: getTollTripVersionParamsSchema,
      output: tollTripVersionSchema,
    },
    params
  );
};

export const getTollTripVersionParamsSchema = z.object({});

export type GetTollTripVersionParams = z.infer<
  typeof getTollTripVersionParamsSchema
>;

export const tollTripVersionOptions = createQueryOptions({
  apiFunction: getTollTripVersion,
  queryKey: ["wsdot", "toll-rates", "getTollTripVersion"],
  cacheStrategy: "MINUTE_UPDATES",
});
