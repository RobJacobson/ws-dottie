import { z } from "zod";
import { fareLineItemsVerboseSchema } from "@/schemas/wsf-fares";
import { defineEndpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Params schema for getFareLineItemsVerbose */
const getFareLineItemsVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

/** GetFareLineItemsVerbose params type */

/** Endpoint definition for getFareLineItemsVerbose */
export const getFareLineItemsVerboseDef = defineEndpoint({
  api: "wsf-fares",
  function: "getFareLineItemsVerbose",
  endpoint: "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}",
  inputSchema: getFareLineItemsVerboseParamsSchema,
  outputSchema: fareLineItemsVerboseSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
});
