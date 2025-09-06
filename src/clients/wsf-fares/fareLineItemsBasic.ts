import { z } from "zod";
import { fareLineItemBasicSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFareLineItemsBasicParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
  roundTrip: z.boolean(),
});

export type GetFareLineItemsBasicParams = z.infer<
  typeof getFareLineItemsBasicParamsSchema
>;

export const fareLineItemsBasicArraySchema = z.array(fareLineItemBasicSchema);
export type FareLineItemsBasic = z.infer<typeof fareLineItemsBasicArraySchema>;

const ENDPOINT =
  "/ferries/api/fares/rest/farelineitemsbasic/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}";

export const getFareLineItemsBasic = zodFetch<
  GetFareLineItemsBasicParams,
  FareLineItemsBasic
>(ENDPOINT, getFareLineItemsBasicParamsSchema, fareLineItemsBasicArraySchema);

export const fareLineItemsBasicOptions = createQueryOptions({
  apiFunction: getFareLineItemsBasic,
  queryKey: ["wsf", "fares", "farelineitemsbasic", "getFareLineItemsBasic"],
  cacheStrategy: "DAILY_STATIC",
});
