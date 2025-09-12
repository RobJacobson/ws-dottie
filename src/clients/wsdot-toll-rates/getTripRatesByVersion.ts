import { z } from "zod";
import { tripRatesSchema } from "@/schemas/wsdot-toll-rates";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTripRatesByVersion */
const getTripRatesByVersionParamsSchema = z.object({
  /** Version number to retrieve */
  version: z.number().describe("Version number to retrieve"),
});

/** GetTripRatesByVersion params type */

/** Endpoint definition for getTripRatesByVersion */
export const getTripRatesByVersionDef = defineEndpoint({
  api: "wsdot-toll-rates",
  function: "getTripRatesByVersion",
  endpoint:
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?version={version}",
  inputSchema: getTripRatesByVersionParamsSchema,
  outputSchema: tripRatesSchema,
  sampleParams: {
    version: 352417,
  },
  cacheStrategy: "MINUTE_UPDATES",
});
