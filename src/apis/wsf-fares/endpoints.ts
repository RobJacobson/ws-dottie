import type { ApiDefinition } from "@/shared/endpoints";
import { datesHelper } from "@/shared/utils";
import { input, output } from "./schemas";

export const wsfFaresApi: ApiDefinition = {
  name: "wsf-fares",
  baseUrl: "http://www.wsdot.wa.gov/ferries/api/fares/rest",
  endpoints: [
    {
      function: "cacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: input.cacheFlushDateSchema,
      outputSchema: output.cacheFlushDateResponseSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "fareLineItems",
      endpoint:
        "/fareLineItems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
      inputSchema: input.fareLineItemsSchema,
      outputSchema: output.lineItemResponsesListSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 3,
        ArrivingTerminalID: 7,
        RoundTrip: false,
      },
      cacheStrategy: "STATIC",
    },
    {
      function: "fareLineItemsBasic",
      endpoint:
        "/fareLineItemsBasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
      inputSchema: input.fareLineItemsBasicSchema,
      outputSchema: output.lineItemResponsesListSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        RoundTrip: false,
      },
      cacheStrategy: "STATIC",
    },
    {
      function: "fareLineItemsVerbose",
      endpoint: "/fareLineItemsVerbose/{TripDate}",
      inputSchema: input.fareLineItemsVerboseSchema,
      outputSchema: output.lineItemVerboseResponseSchema,
      sampleParams: { TripDate: datesHelper.today() },
      cacheStrategy: "STATIC",
    },
    {
      function: "faresTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: input.terminalsSchema,
      outputSchema: output.terminalResponsesListSchema,
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    },
    {
      function: "faresValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: input.validDateRangeSchema,
      outputSchema: output.validDateRangeResponseSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    },
    {
      function: "fareTotals",
      endpoint:
        "/fareTotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
      inputSchema: input.fareTotalsSchema,
      outputSchema: output.fareTotalResponsesListSchema,
      sampleParams: {
        TripDate: datesHelper.today(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        RoundTrip: false,
        FareLineItemID: "1,2",
        Quantity: "3,1",
      },
      cacheStrategy: "STATIC",
    },
    {
      function: "terminalCombo",
      endpoint:
        "/terminalCombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: input.terminalComboSchema,
      outputSchema: output.terminalComboResponseSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
    },
    {
      function: "terminalComboVerbose",
      endpoint: "/terminalComboVerbose/{TripDate}",
      inputSchema: input.terminalComboVerboseSchema,
      outputSchema: output.terminalComboVerboseResponsesListSchema,
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    },
    {
      function: "terminalMates",
      endpoint: "/terminalMates/{TripDate}/{TerminalID}",
      inputSchema: input.terminalMatesSchema,
      outputSchema: output.terminalResponsesListSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      cacheStrategy: "STATIC",
    },
  ],
};
