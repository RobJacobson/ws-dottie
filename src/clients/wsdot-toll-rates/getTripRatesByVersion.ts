import { z } from "zod";

import {
  type TollTripRates,
  tollTripRatesSchema,
} from "@/schemas/wsdot-toll-rates/tollTripRates.zod";
import type { EndpointDefinition } from "@/shared/endpoints";

/** Input schema for getTripRatesByVersion */
const tripRatesByVersionInput = z.object({
  /** Version number to retrieve */
  version: z.number().describe("Version number to retrieve"),
});

/** Endpoint metadata for getTripRatesByVersion */
export const getTripRatesByVersionMeta: EndpointDefinition<
  TripRatesByVersionInput,
  TollTripRates
> = {
  api: "wsdot-toll-rates",
  function: "getTripRatesByVersion",
  endpoint:
    "/Traffic/api/TollRates/TollRatesREST.svc/GetTripRatesByVersionAsJson?version={version}",
  inputSchema: tripRatesByVersionInput,
  outputSchema: tollTripRatesSchema,
  sampleParams: {
    version: 352417,
  },
  cacheStrategy: "FREQUENT",
};

// Type exports
export type TripRatesByVersionInput = z.infer<typeof tripRatesByVersionInput>;
