import { datesHelper } from "@/shared/utils";
import { createApiDefinition } from "../utils";
import { input, output } from "./schemas";

export const wsfFaresApi = createApiDefinition("wsf-fares", [
  {
    function: "cacheFlushDate",
    endpoint: "/ferries/api/fares/rest/cacheflushdate",
    inputSchema: input.cacheFlushDateSchema,
    outputSchema: output.cacheFlushDateResponseSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
  {
    function: "fareLineItems",
    endpoint:
      "/ferries/api/fares/rest/farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
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
      "/ferries/api/fares/rest/farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
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
    endpoint: "/ferries/api/fares/rest/farelineitemsverbose/{TripDate}",
    inputSchema: input.fareLineItemsVerboseSchema,
    outputSchema: output.lineItemVerboseResponseSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "faresTerminals",
    endpoint: "/ferries/api/fares/rest/terminals/{TripDate}",
    inputSchema: input.terminalsSchema,
    outputSchema: output.terminalResponsesListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "faresValidDateRange",
    endpoint: "/ferries/api/fares/rest/validdaterange",
    inputSchema: input.validDateRangeSchema,
    outputSchema: output.validDateRangeResponseSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
  {
    function: "fareTotals",
    endpoint:
      "/ferries/api/fares/rest/faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
    inputSchema: input.fareTotalsSchema,
    outputSchema: output.fareTotalResponseSchema,
    sampleParams: {
      TripDate: datesHelper.tomorrow(),
      DepartingTerminalID: 1,
      ArrivingTerminalID: 10,
      RoundTrip: false,
      FareLineItemID: 1,
      Quantity: 2,
    },
    cacheStrategy: "STATIC",
  },
  {
    function: "terminalCombo",
    endpoint:
      "/ferries/api/fares/rest/terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
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
    endpoint: "/ferries/api/fares/rest/terminalcomboverbose/{TripDate}",
    inputSchema: input.terminalComboVerboseSchema,
    outputSchema: output.terminalComboVerboseResponseSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "terminalMates",
    endpoint: "/ferries/api/fares/rest/terminalmates/{TripDate}/{TerminalID}",
    inputSchema: input.terminalMatesSchema,
    outputSchema: output.terminalResponsesListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
    cacheStrategy: "STATIC",
  },
]);
