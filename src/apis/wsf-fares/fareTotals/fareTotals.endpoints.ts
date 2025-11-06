import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { datesHelper } from "@/shared/factories";
import { z } from "@/shared/zod-openapi-init";
import type { FareTotalsByTripDateAndRouteInput } from "./fareTotals.input";
import { fareTotalsByTripDateAndRouteInputSchema } from "./fareTotals.input";
import type { FareTotal } from "./fareTotals.output";
import { fareTotalSchema } from "./fareTotals.output";

export const fareTotalsGroup = {
  name: "fare-totals",
  documentation: {
    resourceDescription:
      "Each FareTotal item represents calculated fare costs for Washington State Ferries journeys based on selected fare line items and passenger quantities. These totals combine individual fare components to provide complete pricing for specific routes and travel scenarios.",
    businessContext:
      "Use to calculate complete journey costs by providing fare totals based on selected line items, quantities, and trip parameters for accurate ticket pricing and payment processing.",
  },
  cacheStrategy: "STATIC" as const,
  endpoints: {
    getFareTotalsByTripDateAndRoute: {
      function: "getFareTotalsByTripDateAndRoute",
      endpoint:
        "/fareTotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
      inputSchema: fareTotalsByTripDateAndRouteInputSchema,
      outputSchema: z.array(fareTotalSchema),
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
    } satisfies EndpointDefinition<
      FareTotalsByTripDateAndRouteInput,
      FareTotal[]
    >,
  },
} satisfies EndpointGroup;
