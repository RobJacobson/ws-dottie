import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "Calculates fare totals for WSF routes based on selected fare line items and quantities. Supports both one-way and round trip calculations with detailed breakdown by direction and fare type. Data updates infrequently.";

export const fareTotalsResource = {
  name: "fare-totals",
  description: DESCRIPTION,
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getTotals: {
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
      cacheStrategy: "STATIC",
      description: `Calculates total fares for the specified terminal combination, trip type, and selected fare line items with quantities. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<i.FareTotalsInput, o.FareTotalResponse[]>,
  },
};
