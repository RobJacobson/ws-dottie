import { z } from "zod";

import {
  type FareTotals,
  fareTotalsSchema,
} from "@/schemas/wsf-fares/fareTotal.zod";
import type { EndpointDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";

/** Input schema for getFareTotals */
const fareTotalsInput = z.object({
  TripDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  DepartingTerminalID: z.number().int().positive(),
  ArrivingTerminalID: z.number().int().positive(),
  RoundTrip: z.boolean(),
  FareLineItemID: z.number().int().positive(),
  Quantity: z.number().int().positive(),
});

/** Endpoint metadata for getFareTotals */
export const getFareTotalsMeta: EndpointDefinition<
  FareTotalsInput,
  FareTotals
> = {
  api: "wsf-fares",
  function: "fareTotals",
  endpoint:
    "/ferries/api/fares/rest/faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
  inputSchema: fareTotalsInput,
  outputSchema: fareTotalsSchema,
  sampleParams: {
    TripDate: datesHelper.tomorrow(),
    DepartingTerminalID: 1,
    ArrivingTerminalID: 10,
    RoundTrip: false,
    FareLineItemID: 1,
    Quantity: 2,
  },
  cacheStrategy: "STATIC",
};

// Type exports
export type FareTotalsInput = z.infer<typeof fareTotalsInput>;
