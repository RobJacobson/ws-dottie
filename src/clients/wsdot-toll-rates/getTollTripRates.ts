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

import {
  type TollTripRates,
  tollTripRatesSchema,
} from "@/schemas/wsdot-toll-rates/tollTripRates.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTollTripRates */
const tollTripRatesInput = z.object({}).strict();

/** Endpoint metadata for getTollTripRates */
export const getTollTripRatesMeta: EndpointDefinition<
  TollTripRatesInput,
  TollTripRates
> = {
  api: "wsdot-toll-rates",
  function: "getTollTripRates",
  endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson",
  inputSchema: tollTripRatesInput,
  outputSchema: tollTripRatesSchema,
  sampleParams: {},
  cacheStrategy: "FREQUENT",
};

// Type exports
export type TollTripRatesInput = z.infer<typeof tollTripRatesInput>;
