/**
 * @module WSDOT — Toll Trip Rates API
 * @description Current toll trip rates including versioned trip list.
 *
 * Provides:
 * - Version number and list of current trip rates
 *
 * Data includes:
 * - Version, and array of TripName and Toll (cents) with message
 *
 * @functions
 *   - getTollTripRates: Returns current toll trip rates with version
 *
 * @input
 *   - getTollTripRates: {}
 *
 * @output
 *   - getTollTripRates: TollTripRates
 *   - TollTripRates fields:
 *     - Trips: Array of trip rate objects
 *     - Version: Version number
 *   - TollTripRate fields:
 *     - Message: Status/message
 *     - Toll: Toll in cents
 *     - TripName: Trip identifier
 *
 * @cli
 *   - getTollTripRates: node dist/cli.mjs getTollTripRates
 *
 * @exampleResponse
 * {
 *   "Message": "$1.00",
 *   "Toll": 1,
 *   "TripName": "405tp02752",
 *   "Version": 352417
 * }
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___tolling.html
 */
import { z } from "zod";
import { tripRatesSchema } from "@/schemas/wsdot-toll-rates";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTollTripRates */
const getTollTripRatesParamsSchema = z.object({});

/** Endpoint definition for getTollTripRates */
export const getTollTripRatesDef = defineEndpoint({
  api: "wsdot-toll-rates",
  function: "getTollTripRates",
  endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson",
  inputSchema: getTollTripRatesParamsSchema,
  outputSchema: tripRatesSchema,
  sampleParams: {},
  cacheStrategy: "MINUTE_UPDATES",
});
