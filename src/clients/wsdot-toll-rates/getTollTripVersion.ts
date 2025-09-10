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
import { tollTripVersionSchema } from "@/schemas/wsdot-toll-rates";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTollTripVersion */
export const getTollTripVersionParamsSchema = z.object({});

/** Endpoint definition for getTollTripVersion */
export const getTollTripVersionDef = defineEndpoint({
  moduleGroup: "wsdot-toll-rates",
  functionName: "getTollTripVersion",
  endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson",
  inputSchema: getTollTripVersionParamsSchema,
  outputSchema: tollTripVersionSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
});

/** GetTollTripVersion params type */
