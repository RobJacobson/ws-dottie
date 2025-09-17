import { z } from "zod";
import {
  type FareLineItemsVerbose,
  fareLineItemsVerboseSchema,
} from "@/schemas/wsf-fares/fareLineItemsVerbose.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItemsVerbose */
const fareLineItemsVerboseInput = z.object({
  tripDate: z.date(),
});

/** Endpoint metadata for getFareLineItemsVerbose */
export const getFareLineItemsVerboseMeta: EndpointDefinition<
  FareLineItemsVerboseInput,
  FareLineItemsVerbose
> = {
  id: "wsf-fares/fareLineItemsVerbose",
  endpoint: "/ferries/api/fares/rest/farelineitemsverbose/{tripDate}",
  inputSchema: fareLineItemsVerboseInput,
  outputSchema: fareLineItemsVerboseSchema,
  sampleParams: { tripDate: datesHelper.tomorrow() },
  cacheStrategy: "STATIC",
};

// Type exports
export type FareLineItemsVerboseInput = z.infer<
  typeof fareLineItemsVerboseInput
>;
