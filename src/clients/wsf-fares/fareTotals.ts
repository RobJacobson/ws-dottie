import { z } from "zod";
import { fareTotalsSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFareTotals */
const getFareTotalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
  fareLineItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

/** Endpoint definition for getFareTotals */

export const getFareTotalsDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFareTotals",
  endpoint:
    "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}/{fareLineItemId}/{quantity}",
  inputSchema: getFareTotalsParamsSchema,
  outputSchema: fareTotalsSchema,
  sampleParams: {
    tripDate: datesHelper.tomorrow(),
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
    fareLineItemId: 1,
    quantity: 2,
  },
  cacheStrategy: "DAILY_STATIC",
});

/** GetFareTotals params type */
