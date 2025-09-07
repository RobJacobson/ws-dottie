import { z } from "zod";
import { fareLineItemSchema } from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
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

export const getFareLineItems = async (
  params: GetFareLineItemsParams
): Promise<FareLineItems> =>
  zodFetch({
    endpoint:
      "/ferries/api/fares/rest/farelineitems/{tripDate}/{departingTerminalId}/{arrivingTerminalId}/{roundTrip}",
    inputSchema: getFareLineItemsParamsSchema,
    outputSchema: fareLineItemsArraySchema,
    params,
  });

export const fareLineItemsOptions = createQueryOptions({
  apiFunction: getFareLineItems,
  queryKey: ["wsf", "fares", "farelineitems", "getFareLineItems"],
  cacheStrategy: "DAILY_STATIC",
});
