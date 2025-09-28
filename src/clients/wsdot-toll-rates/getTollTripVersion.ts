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
} from "@/schemas/wsdot-toll-rates/tollTripVersion.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTollTripVersion */
const tollTripVersionInput = z.object({}).strict();

/** Endpoint metadata for getTollTripVersion */
export const getTollTripVersionMeta: EndpointDefinition<
  TollTripVersionInput,
  TollTripVersion
> = {
  api: "wsdot-toll-rates",
  function: "getTollTripVersion",
  endpoint: "/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripVersionAsJson",
  inputSchema: tollTripVersionInput,
  outputSchema: tollTripVersionSchema,
  sampleParams: {},
  cacheStrategy: "FREQUENT",
};

// Type exports
export type TollTripVersionInput = z.infer<typeof tollTripVersionInput>;
