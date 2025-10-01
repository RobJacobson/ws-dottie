import { z } from "zod";

import {
  type FareLineItemBasic,
  fareLineItemBasicSchema,
} from "@/schemas/wsf-fares/fareLineItemBasic.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareLineItemsBasic */
const fareLineItemsBasicInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  DepartingTerminalID: z.number().int().positive(),
  ArrivingTerminalID: z.number().int().positive(),
  RoundTrip: z.boolean(),
});

/** Endpoint metadata for getFareLineItemsBasic */
export const getFareLineItemsBasicMeta: EndpointDefinition<
  FareLineItemsBasicInput,
  FareLineItemBasic[]
> = {
  api: "wsf-fares",
  function: "fareLineItemsBasic",
  endpoint:
    "/ferries/api/fares/rest/farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
  inputSchema: fareLineItemsBasicInput,
  outputSchema: z.array(fareLineItemBasicSchema),
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
    RoundTrip: false,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type FareLineItemsBasicInput = z.infer<typeof fareLineItemsBasicInput>;
