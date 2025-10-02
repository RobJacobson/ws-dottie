import { datesHelper } from "@/shared/utils";
import { createApiDefinition } from "../utils";
import {
  cacheFlushDateInputSchema,
  fareLineItemsBasicInputSchema,
  fareLineItemsInputSchema,
  fareLineItemsVerboseInputSchema,
  fareTotalsInputSchema,
  terminalComboInputSchema,
  terminalComboVerboseInputSchema,
  terminalMatesInputSchema,
  terminalsInputSchema,
  validDateRangeInputSchema,
} from "./original/inputSchemas.original";
import {
  cacheFlushDateResponseSchema,
  fareTotalResponseSchema,
  lineItemResponsesListSchema,
  lineItemVerboseResponseSchema,
  terminalComboResponseSchema,
  terminalComboVerboseResponseSchema,
  terminalResponsesListSchema,
  validDateRangeResponseSchema,
} from "./original/outputSchemas.original";

export const wsfFaresApi = createApiDefinition("wsf-fares", [
  {
    function: "cacheFlushDate",
    endpoint: "/ferries/api/fares/rest/cacheflushdate",
    inputSchema: cacheFlushDateInputSchema,
    outputSchema: cacheFlushDateResponseSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
  {
    function: "fareLineItems",
    endpoint:
      "/ferries/api/fares/rest/farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}",
    inputSchema: fareLineItemsInputSchema,
    outputSchema: lineItemResponsesListSchema,
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
    inputSchema: fareLineItemsBasicInputSchema,
    outputSchema: lineItemResponsesListSchema,
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
    inputSchema: fareLineItemsVerboseInputSchema,
    outputSchema: lineItemVerboseResponseSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "faresTerminals",
    endpoint: "/ferries/api/fares/rest/terminals/{TripDate}",
    inputSchema: terminalsInputSchema,
    outputSchema: terminalResponsesListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "faresValidDateRange",
    endpoint: "/ferries/api/fares/rest/validdaterange",
    inputSchema: validDateRangeInputSchema,
    outputSchema: validDateRangeResponseSchema,
    sampleParams: {},
    cacheStrategy: "STATIC",
  },
  {
    function: "fareTotals",
    endpoint:
      "/ferries/api/fares/rest/faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}",
    inputSchema: fareTotalsInputSchema,
    outputSchema: fareTotalResponseSchema,
    sampleParams: {
      TripDate: datesHelper.tomorrow(),
      DepartingTerminalID: 1,
      ArrivingTerminalID: 10,
      RoundTrip: false,
      FareLineItemID: "1",
      Quantity: "2",
    },
    cacheStrategy: "STATIC",
  },
  {
    function: "terminalCombo",
    endpoint:
      "/ferries/api/fares/rest/terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
    inputSchema: terminalComboInputSchema,
    outputSchema: terminalComboResponseSchema,
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
    inputSchema: terminalComboVerboseInputSchema,
    outputSchema: terminalComboVerboseResponseSchema,
    sampleParams: { TripDate: datesHelper.tomorrow() },
    cacheStrategy: "STATIC",
  },
  {
    function: "terminalMates",
    endpoint: "/ferries/api/fares/rest/terminalmates/{TripDate}/{TerminalID}",
    inputSchema: terminalMatesInputSchema,
    outputSchema: terminalResponsesListSchema,
    sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
    cacheStrategy: "STATIC",
  },
]);
