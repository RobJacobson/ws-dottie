import { z } from "zod";
import {
  type FareLineItemsVerbose,
  fareLineItemsVerboseSchema,
} from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { zodFetch } from "@/shared/fetching";

export const getFareLineItemsVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;

const ENDPOINT = "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}";

export const getFareLineItemsVerbose = zodFetch<
  GetFareLineItemsVerboseParams,
  FareLineItemsVerbose
>(ENDPOINT, getFareLineItemsVerboseParamsSchema, fareLineItemsVerboseSchema);

export const fareLineItemsVerboseOptions = createQueryOptions({
  apiFunction: getFareLineItemsVerbose,
  queryKey: ["wsf", "fares", "farelineitemsverbose", "getFareLineItemsVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
