import { z } from "zod";
import { type FareTotal, fareTotalSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
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

const ENDPOINT =
  "/ferries/api/fares/rest/faretotals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}/{fareLineItemId}/{quantity}";

export const getFareTotals = zodFetch<GetFareTotalsParams, FareTotal>(
  ENDPOINT,
  getFareTotalsParamsSchema,
  fareTotalSchema
);

export const fareTotalsOptions = createQueryOptions({
  apiFunction: getFareTotals,
  queryKey: ["wsf", "fares", "faretotals", "getFareTotals"],
  cacheStrategy: "DAILY_STATIC",
});
