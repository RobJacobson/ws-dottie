import { z } from "zod";
import { type FareTotal, fareTotalSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getFareTotalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
  fareLineItemId: z.number().int().positive(),
  quantity: z.number().int().positive(),
});

export type GetFareTotalsParams = z.infer<typeof getFareTotalsParamsSchema>;

export const getFareTotals = async (
  params: GetFareTotalsParams
): Promise<FareTotal> =>
  zodFetch({
    endpoint:
      "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}/{fareLineItemId}/{quantity}",
    inputSchema: getFareTotalsParamsSchema,
    outputSchema: fareTotalSchema,
    params,
  });

export const fareTotalsOptions = createQueryOptions({
  apiFunction: getFareTotals,
  queryKey: ["wsf", "fares", "faretotals", "getFareTotals"],
  cacheStrategy: "DAILY_STATIC",
});
