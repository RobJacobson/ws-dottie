import { z } from "zod";
import {
  type FareTotals,
  fareTotalsSchema,
} from "@/schemas/wsf-fares/fareTotal.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareTotals */
const fareTotalsInput = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
  fareLineItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

/** Endpoint metadata for getFareTotals */
export const getFareTotalsMeta: Endpoint<FareTotalsInput, FareTotals> = {
  endpoint:
    "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}/{fareLineItemId}/{quantity}",
  inputSchema: fareTotalsInput,
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
};

// Type exports
export type FareTotalsInput = z.infer<typeof fareTotalsInput>;
