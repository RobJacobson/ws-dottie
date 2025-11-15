import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { datesHelper } from "@/shared/utils";
import {
  tollTripRatesInputSchema,
  tripRatesByDateInputSchema,
  tripRatesByVersionInputSchema,
} from "./tollTripRates.input";
import { tollTripsRatesSchema } from "./tollTripRates.output";

export const tollTripRatesGroup: EndpointGroup = {
  name: "toll-trip-rates",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Comprehensive toll rate data for all trips including pricing, messages, and version tracking.",
    description:
      "Container for toll trip rates supporting current data, historical date ranges, and version-specific queries. Includes pricing details, informational messages, and version tracking for transportation planning.",
    useCases: [
      "Retrieve current toll rates for all trips.",
      "Analyze historical toll pricing trends.",
      "Access version-specific rate data for change tracking.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchTollTripRates = createEndpoint({
  api: apis.wsdotTollRates,
  group: tollTripRatesGroup,
  functionName: "fetchTollTripRates",
  endpoint: "/getTollTripRatesAsJson",
  inputSchema: tollTripRatesInputSchema,
  outputSchema: tollTripsRatesSchema,
  sampleParams: {},
  endpointDescription: "Get current toll rates for all trips.",
});

export const fetchTripRatesByDate = createEndpoint({
  api: apis.wsdotTollRates,
  group: tollTripRatesGroup,
  functionName: "fetchTripRatesByDate",
  endpoint: "/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}",
  inputSchema: tripRatesByDateInputSchema,
  outputSchema: tollTripsRatesSchema.array(),
  sampleParams: {
    FromDate: datesHelper.yesterday(),
    ToDate: datesHelper.today(),
  },
  endpointDescription: "Get historical toll rates for a specified date range.",
});

export const fetchTripRatesByVersion = createEndpoint({
  api: apis.wsdotTollRates,
  group: tollTripRatesGroup,
  functionName: "fetchTripRatesByVersion",
  endpoint: "/getTripRatesByVersionAsJson?Version={Version}",
  inputSchema: tripRatesByVersionInputSchema,
  outputSchema: tollTripsRatesSchema,
  sampleParams: { Version: 352417 },
  endpointDescription: "Get toll rates for a specific version number.",
});
