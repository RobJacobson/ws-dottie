import { z } from "zod";
import { fareTotalsSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFareTotals */
export const getFareTotalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
  fareLineItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

/** Endpoint definition for getFareTotals */
export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

export const getFareTotalsDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFareTotals",
  endpoint:
    "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}/{fareLineItemId}/{quantity}",
  inputSchema: getFareTotalsParamsSchema,
  outputSchema: fareTotalsSchema,
  sampleParams: {
    tripDate: getSampleDates().tomorrow,
    departingTerminalId: 1,
    arrivingTerminalId: 10,
    roundTrip: false,
    fareLineItemId: 1,
    quantity: 2,
  },
  cacheStrategy: "DAILY_STATIC",
});

/** GetFareTotals params type */
