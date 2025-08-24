import {
  fareLineItemsArraySchema,
  fareLineItemsBasicArraySchema,
  fareLineItemsVerboseResponseSchema,
  faresCacheFlushDateSchema,
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
import { wsfTestData } from "../utils/test-data";
import { ApiModuleConfig } from "../utils/types";

export const wsfFaresTestConfig: ApiModuleConfig = {
  moduleName: "WSF Fares",
  endpoints: [
    {
      apiFunction: getFaresCacheFlushDate,
      inputSchema: getFaresCacheFlushDateParamsSchema,
      outputSchema: faresCacheFlushDateSchema,
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
      validParams: { tripDate: new Date("2025-08-23") },
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
      validParams: { tripDate: new Date("2025-08-23"), terminalID: 1 },
      invalidParams: [
        {
          params: { tripDate: new Date("2020-01-01"), terminalID: 1 },
          expectedError: "Invalid date",
        },
        {
          params: { tripDate: new Date("2025-08-23"), terminalID: -1 },
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
        tripDate: new Date("2025-08-23"),
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
            tripDate: new Date("2025-08-23"),
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
      validParams: { tripDate: new Date("2025-08-23") },
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
        tripDate: new Date("2025-08-23"),
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
            tripDate: new Date("2025-08-23"),
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
        tripDate: new Date("2025-08-23"),
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
            tripDate: new Date("2025-08-23"),
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
      validParams: { tripDate: new Date("2025-08-23") },
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
      maxResponseTime: 8000,
    },
    {
      apiFunction: getFareTotals,
      inputSchema: getFareTotalsParamsSchema,
      outputSchema: fareTotalsArraySchema,
      validParams: {
        tripDate: new Date("2025-08-23"),
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
            tripDate: new Date("2025-08-23"),
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
            tripDate: new Date("2025-08-23"),
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
