import { z } from "zod";
import { tripRatesSchema } from "@/schemas/wsdot-toll-rates";
import { defineEndpoint } from "@/shared/endpoints";

/** Params schema for getTripRatesByVersion */
export const getTripRatesByVersionParamsSchema = z.object({
  /** Version number to retrieve */
  version: z.number().describe("Version number to retrieve"),
});

/** GetTripRatesByVersion params type */
export type GetTripRatesByVersionParams = z.infer<
  typeof getTripRatesByVersionParamsSchema
>;

/** Endpoint definition for getTripRatesByVersion */
export const getTripRatesByVersionDef = defineEndpoint({
  moduleGroup: "wsdot-toll-rates",
  functionName: "getTripRatesByVersion",
  endpoint:
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?version={version}",
  inputSchema: getTripRatesByVersionParamsSchema,
  outputSchema: tripRatesSchema,
  sampleParams: {
    version: 352417,
  },
  cacheStrategy: "MINUTE_UPDATES",
});
