import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { datesHelper } from "@/shared/utils";
import { wsdotTollRatesApi } from "../apiDefinition";
import {
  tollTripRatesInputSchema,
  tripRatesByDateInputSchema,
  tripRatesByVersionInputSchema,
} from "./tollTripRates.input";
import { tollTripsRatesSchema } from "./tollTripRates.output";

const group = defineEndpointGroup({
  api: wsdotTollRatesApi,
  name: "toll-trip-rates",
  documentation: {
    resourceDescription:
      "Each TollTripRates item represents comprehensive toll rate data for specific trips including pricing details, informational messages, and version tracking. Each container supports current data retrieval, historical date ranges, and version-specific queries.",
    businessContext:
      "Use to analyze toll pricing trends and retrieve historical rate data by providing detailed trip information, version tracking, and date range filtering for transportation planning.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchTollTripRates = defineEndpoint({
  group,
  functionName: "fetchTollTripRates",
  definition: {
    endpoint: "/getTollTripRatesAsJson",
    inputSchema: tollTripRatesInputSchema,
    outputSchema: tollTripsRatesSchema,
    sampleParams: {},
    endpointDescription:
      "Returns single TollTripRates item with current pricing and message data.",
  },
});

export const fetchTripRatesByDate = defineEndpoint({
  group,
  functionName: "fetchTripRatesByDate",
  definition: {
    endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
    inputSchema: tripRatesByDateInputSchema,
    outputSchema: tollTripsRatesSchema.array(),
    sampleParams: {
      FromDate: datesHelper.yesterday(),
      ToDate: datesHelper.today(),
    },
    endpointDescription:
      "Returns multiple TollTripRates items for specified date range.",
  },
});

export const fetchTripRatesByVersion = defineEndpoint({
  group,
  functionName: "fetchTripRatesByVersion",
  definition: {
    endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
    inputSchema: tripRatesByVersionInputSchema,
    outputSchema: tollTripsRatesSchema,
    sampleParams: { Version: 352417 },
    endpointDescription:
      "Returns single TollTripRates item for specific version.",
  },
});

export const tollTripRatesResource = group.descriptor;
