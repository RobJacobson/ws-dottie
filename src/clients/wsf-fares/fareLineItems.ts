import { z } from "zod";
import { fareLineItemSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFareLineItemsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

export type GetFareLineItemsParams = z.infer<
  typeof getFareLineItemsParamsSchema
>;

export const fareLineItemsArraySchema = z.array(fareLineItemSchema);
export type FareLineItems = z.infer<typeof fareLineItemsArraySchema>;

const ENDPOINT =
  "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}";

export const getFareLineItems = zodFetch<GetFareLineItemsParams, FareLineItems>(
  ENDPOINT,
  getFareLineItemsParamsSchema,
  fareLineItemsArraySchema
);

export const fareLineItemsOptions = createQueryOptions({
  apiFunction: getFareLineItems,
  queryKey: ["wsf", "fares", "farelineitems", "getFareLineItems"],
  cacheStrategy: "DAILY_STATIC",
});
