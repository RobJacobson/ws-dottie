import { z } from "zod";

import {
  type FareLineItem,
  fareLineItemSchema,
} from "@/schemas/wsf-fares/fareLineItem.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItems */
const fareLineItemsInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  DepartingTerminalID: z.number().int().positive(),
  ArrivingTerminalID: z.number().int().positive(),
  RoundTrip: z.boolean(),
});

/** Endpoint metadata for getFareLineItems */
export const getFareLineItemsMeta: EndpointDefinition<
  FareLineItemsInput,
  FareLineItem[]
> = {
  api: "wsf-fares",
  function: "fareLineItems",
  endpoint:
    "/ferries/api/fares/rest/farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
  inputSchema: fareLineItemsInput,
  outputSchema: z.array(fareLineItemSchema),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 3,
    ArrivingTerminalID: 7,
    RoundTrip: false,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type FareLineItemsInput = z.infer<typeof fareLineItemsInput>;
