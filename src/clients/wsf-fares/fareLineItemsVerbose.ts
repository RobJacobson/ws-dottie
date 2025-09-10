import { z } from "zod";
import { fareLineItemsVerboseSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { getSampleDates } from "@/shared/utils/dateUtils";

/** Params schema for getFareLineItemsVerbose */
export const getFareLineItemsVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetFareLineItemsVerbose params type */
export type GetFareLineItemsVerboseParams = z.infer<
  typeof getFareLineItemsVerboseParamsSchema
>;

/** Endpoint definition for getFareLineItemsVerbose */
export const getFareLineItemsVerboseDef = defineEndpoint({
  moduleGroup: "wsf-fares",
  functionName: "getFareLineItemsVerbose",
  endpoint: "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}",
  inputSchema: getFareLineItemsVerboseParamsSchema,
  outputSchema: fareLineItemsVerboseSchema,
  sampleParams: { tripDate: getSampleDates().tomorrow },
  cacheStrategy: "DAILY_STATIC",
});
