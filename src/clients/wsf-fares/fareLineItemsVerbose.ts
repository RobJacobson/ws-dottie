import { z } from "zod";

import {
  type FareLineItemsVerbose,
  fareLineItemsVerboseSchema,
} from "@/schemas/wsf-fares/fareLineItemsVerbose.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItemsVerbose */
const fareLineItemsVerboseInput = z.object({
  tripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

/** Endpoint metadata for getFareLineItemsVerbose */
export const getFareLineItemsVerboseMeta: EndpointDefinition<
  FareLineItemsVerboseInput,
  FareLineItemsVerbose
> = {
  id: "wsf-fares:fareLineItemsVerbose",
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
