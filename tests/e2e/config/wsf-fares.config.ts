import {
  fareLineItemsArraySchema,
  fareLineItemsBasicArraySchema,
  fareLineItemsVerboseResponseSchema,
  faresTerminalsArraySchema,
  faresValidDateRangeSchema,
  fareTotalsArraySchema,
  getFareLineItems,
  getFareLineItemsBasic,
  getFareLineItemsBasicParamsSchema,
  getFareLineItemsParamsSchema,
  getFareLineItemsVerbose,
  getFareLineItemsVerboseParamsSchema,
  getFaresCacheFlushDate,
  getFaresCacheFlushDateParamsSchema,
  getFaresTerminalMates,
  getFaresTerminalMatesParamsSchema,
  getFaresTerminals,
  getFaresTerminalsParamsSchema,
  getFaresValidDateRange,
  getFaresValidDateRangeParamsSchema,
  getFareTotals,
  getFareTotalsParamsSchema,
  getTerminalCombo,
  getTerminalComboParamsSchema,
  getTerminalComboVerbose,
  getTerminalComboVerboseParamsSchema,
  terminalComboSchema,
  terminalComboVerboseArraySchema,
  terminalMatesArraySchema,
} from "../../../src/api/wsf-fares";
import { wsfCacheFlushDateSchema } from "../../../src/api/wsf/cacheFlushDate";
import type { ApiModuleConfig } from "../utils/types";

/**
 * Generate dynamic test dates based on current date
 * - Tomorrow's date for single date parameters
 * - Day after tomorrow for range end dates
 */
const getTestDates = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  return { tomorrow, dayAfterTomorrow };
};

export const wsfFaresTestConfig: ApiModuleConfig = {
  moduleName: "WSF Fares",
  endpoints: [
    {
      apiFunction: getFaresCacheFlushDate,
      inputSchema: getFaresCacheFlushDateParamsSchema,
      outputSchema: wsfCacheFlushDateSchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getFaresCacheFlushDate",
      category: "parameterized",
      maxResponseTime: 3000,
    },
    {
      apiFunction: getFaresValidDateRange,
      inputSchema: getFaresValidDateRangeParamsSchema,
      outputSchema: faresValidDateRangeSchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getFaresValidDateRange",
      category: "parameterized",
      maxResponseTime: 3000,
    },
    {
      apiFunction: getFaresTerminals,
      inputSchema: getFaresTerminalsParamsSchema,
      outputSchema: faresTerminalsArraySchema,
      validParams: { tripDate: getTestDates().tomorrow },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01") },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2030-01-01") },
          expectedError: "Invalid date",
        },
      ],
      endpointName: "getFaresTerminals",
      category: "parameterized",
      maxResponseTime: 4000,
    },
    {
      apiFunction: getFaresTerminalMates,
      inputSchema: getFaresTerminalMatesParamsSchema,
      outputSchema: terminalMatesArraySchema,
      validParams: { tripDate: getTestDates().tomorrow, terminalID: 1 },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01"), terminalID: 1 },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: getTestDates().tomorrow, terminalID: -1 },
          expectedError: "Invalid terminal ID",
        },
      ],
      endpointName: "getFaresTerminalMates",
      category: "parameterized",
      maxResponseTime: 4000,
    },
    {
      apiFunction: getTerminalCombo,
      inputSchema: getTerminalComboParamsSchema,
      outputSchema: terminalComboSchema,
      validParams: {
        tripDate: getTestDates().tomorrow,
        departingTerminalID: 1,
        arrivingTerminalID: 10,
      },
      invalidParams: [
        {
          params: {
            tripDate: new Date("2020-01-01"),
            departingTerminalID: 1,
            arrivingTerminalID: 10,
          },
          expectedError: "Invalid date",
        },
        {
          params: {
            tripDate: getTestDates().tomorrow,
            departingTerminalID: -1,
            arrivingTerminalID: 10,
          },
          expectedError: "Invalid terminal ID",
        },
      ],
      endpointName: "getTerminalCombo",
      category: "parameterized",
      maxResponseTime: 4000,
    },
    {
      apiFunction: getTerminalComboVerbose,
      inputSchema: getTerminalComboVerboseParamsSchema,
      outputSchema: terminalComboVerboseArraySchema,
      validParams: { tripDate: getTestDates().tomorrow },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01") },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2030-01-01") },
          expectedError: "Invalid date",
        },
      ],
      endpointName: "getTerminalComboVerbose",
      category: "parameterized",
      maxResponseTime: 5000,
    },
    {
      apiFunction: getFareLineItems,
      inputSchema: getFareLineItemsParamsSchema,
      outputSchema: fareLineItemsArraySchema,
      validParams: {
        tripDate: getTestDates().tomorrow,
        departingTerminalID: 1,
        arrivingTerminalID: 10,
        roundTrip: false,
      },
      invalidParams: [
        {
          params: {
            tripDate: new Date("2020-01-01"),
            departingTerminalID: 1,
            arrivingTerminalID: 10,
            roundTrip: false,
          },
          expectedError: "Invalid date",
        },
        {
          params: {
            tripDate: getTestDates().tomorrow,
            departingTerminalID: -1,
            arrivingTerminalID: 10,
            roundTrip: false,
          },
          expectedError: "Invalid terminal ID",
        },
      ],
      endpointName: "getFareLineItems",
      category: "parameterized",
      maxResponseTime: 5000,
    },
    {
      apiFunction: getFareLineItemsBasic,
      inputSchema: getFareLineItemsBasicParamsSchema,
      outputSchema: fareLineItemsBasicArraySchema,
      validParams: {
        tripDate: getTestDates().tomorrow,
        departingTerminalID: 1,
        arrivingTerminalID: 10,
        roundTrip: false,
      },
      invalidParams: [
        {
          params: {
            tripDate: new Date("2020-01-01"),
            departingTerminalID: 1,
            arrivingTerminalID: 10,
            roundTrip: false,
          },
          expectedError: "Invalid date",
        },
        {
          params: {
            tripDate: getTestDates().tomorrow,
            departingTerminalID: -1,
            arrivingTerminalID: 10,
            roundTrip: false,
          },
          expectedError: "Invalid terminal ID",
        },
      ],
      endpointName: "getFareLineItemsBasic",
      category: "parameterized",
      maxResponseTime: 5000,
    },
    {
      apiFunction: getFareLineItemsVerbose,
      inputSchema: getFareLineItemsVerboseParamsSchema,
      outputSchema: fareLineItemsVerboseResponseSchema,
      validParams: { tripDate: getTestDates().tomorrow },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01") },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2030-01-01") },
          expectedError: "Invalid date",
        },
      ],
      endpointName: "getFareLineItemsVerbose",
      category: "parameterized",
      maxResponseTime: 10000,
    },
    {
      apiFunction: getFareTotals,
      inputSchema: getFareTotalsParamsSchema,
      outputSchema: fareTotalsArraySchema,
      validParams: {
        tripDate: getTestDates().tomorrow,
        departingTerminalID: 1,
        arrivingTerminalID: 10,
        roundTrip: false,
        fareLineItemIDs: [1, 2],
        quantities: [2, 1],
      },
      invalidParams: [
        {
          params: {
            tripDate: new Date("2020-01-01"),
            departingTerminalID: 1,
            arrivingTerminalID: 10,
            roundTrip: false,
            fareLineItemIDs: [1, 2],
            quantities: [2, 1],
          },
          expectedError: "Invalid date",
        },
        {
          params: {
            tripDate: getTestDates().tomorrow,
            departingTerminalID: -1,
            arrivingTerminalID: 10,
            roundTrip: false,
            fareLineItemIDs: [1, 2],
            quantities: [2, 1],
          },
          expectedError: "Invalid terminal ID",
        },
        {
          params: {
            tripDate: getTestDates().tomorrow,
            departingTerminalID: 1,
            arrivingTerminalID: 10,
            roundTrip: false,
            fareLineItemIDs: [],
            quantities: [],
          },
          expectedError: "Empty fare line item IDs",
        },
      ],
      endpointName: "getFareTotals",
      category: "parameterized",
      maxResponseTime: 6000,
    },
  ],
  settings: {
    defaultMaxResponseTime: 3000,
    requiresAuth: false,
    rateLimitDelay: 100,
  },
};
