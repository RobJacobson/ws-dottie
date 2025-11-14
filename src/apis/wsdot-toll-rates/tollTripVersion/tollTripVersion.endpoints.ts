import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripVersionInputSchema } from "./tollTripVersion.input";
import { tollTripVersionSchema } from "./tollTripVersion.output";

export const tollTripVersionGroup = defineEndpointGroup({
  name: "toll-trip-version",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.",
    businessContext: "",
  },
});

export const fetchTollTripVersion = defineEndpoint({
  apiName: wsdotTollRatesApi.name,
  baseUrl: wsdotTollRatesApi.baseUrl,
  group: tollTripVersionGroup,
  functionName: "fetchTollTripVersion",
  endpoint: "/getTollTripVersionAsJson",
  inputSchema: tollTripVersionInputSchema,
  outputSchema: tollTripVersionSchema,
  sampleParams: {},
  endpointDescription:
    "Returns current version and timestamp information for toll trip data.",
});

