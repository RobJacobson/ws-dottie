import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./fareTotals.input";
import * as o from "./fareTotals.output";

export const fareTotalsResource = {
  name: "fare-totals",
  resourceDescription:
    "Calculates fare totals for WSF routes based on selected fare line items and quantities. Supports both one-way and round trip calculations with detailed breakdown by direction and fare type. Data updates infrequently.",
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getFareTotalsByTripDateAndRoute: {
      function: "getFareTotalsByTripDateAndRoute",
      endpoint:
        "/fareTotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
      inputSchema: i.fareTotalsSchema,
      outputSchema: z.array(o.fareTotalResponseSchema),
      sampleParams: {
        TripDate: datesHelper.today(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        RoundTrip: false,
        FareLineItemID: "1,2",
        Quantity: "3,1",
      },
      endpointDescription:
        "Calculates total fares for the specified terminal combination, trip type, and selected fare line items with quantities.",
    } satisfies EndpointDefinition<i.FareTotalsInput, o.FareTotalResponse[]>,
  },
};
