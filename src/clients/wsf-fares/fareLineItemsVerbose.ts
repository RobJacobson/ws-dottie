import { z } from "zod";
import { fareLineItemsVerboseSchema } from "@/schemas/wsf-fares";
import type { FareLineItemsVerbose } from "@/schemas/wsf-fares/fareLineItemsVerbose.zod";
import type { Endpoint } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItemsVerbose */
const fareLineItemsVerboseInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getFareLineItemsVerbose */
export const getFareLineItemsVerboseMeta: Endpoint<
  FareLineItemsVerboseInput,
  FareLineItemsVerbose
> = {
  api: "wsf-fares",
  function: "getFareLineItemsVerbose",
  endpoint: "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}",
  inputSchema: fareLineItemsVerboseInput,
  outputSchema: fareLineItemsVerboseSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "DAILY_STATIC",
};

// Type exports
export type FareLineItemsVerboseInput = z.infer<
  typeof fareLineItemsVerboseInput
>;
