import { z } from "zod";
import {
  type TollRate,
  tollRatesSchema,
} from "@/schemas/wsdot-toll-rates/tollRate.zod";
import type { Endpoint } from "@/shared/endpoints";

/** Input schema for getTripRatesByVersion */
const tripRatesByVersionInput = z.object({
  /** Version number to retrieve */
  version: z.number().describe("Version number to retrieve"),
});

/** Endpoint metadata for getTripRatesByVersion */
export const getTripRatesByVersionMeta: Endpoint<
  TripRatesByVersionInput,
  TollRate[]
> = {
  endpoint:
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?version={version}",
  inputSchema: tripRatesByVersionInput,
  outputSchema: tollRatesSchema,
  sampleParams: {
    version: 352417,
  },
  cacheStrategy: "MINUTE_UPDATES",
};

// Type exports
export type TripRatesByVersionInput = z.infer<typeof tripRatesByVersionInput>;
