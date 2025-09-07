import { z } from "zod";
import {
  type FareLineItemsVerbose,
  fareLineItemsVerboseSchema,
} from "@/schemas/wsf-fares";
import { createQueryOptions } from "@/shared/tanstack/factory";
import { zodFetch } from "@/shared/fetching";

export const getFareLineItemsVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;

export const getFareLineItemsVerbose = async (
  params: GetFareLineItemsVerboseParams
): Promise<FareLineItemsVerbose> =>
  zodFetch({
    endpoint: "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}",
    inputSchema: getFareLineItemsVerboseParamsSchema,
    outputSchema: fareLineItemsVerboseSchema,
    params,
  });

export const fareLineItemsVerboseOptions = createQueryOptions({
  apiFunction: getFareLineItemsVerbose,
  queryKey: ["wsf", "fares", "farelineitemsverbose", "getFareLineItemsVerbose"],
  cacheStrategy: "DAILY_STATIC",
});
