import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripVersionInputSchema } from "./tollTripVersion.input";
import { tollTripVersionSchema } from "./tollTripVersion.output";

const group = defineEndpointGroup({
  api: wsdotTollRatesApi,
  name: "toll-trip-version",
  documentation: {
    resourceDescription:
      "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchTollTripVersion = defineEndpoint({
  group,
  functionName: "fetchTollTripVersion",
  definition: {
    endpoint: "/getTollTripVersionAsJson",
    inputSchema: tollTripVersionInputSchema,
    outputSchema: tollTripVersionSchema,
    sampleParams: {},
    endpointDescription:
      "Returns current version and timestamp information for toll trip data.",
  },
});

export const tollTripVersionResource = group.descriptor;
