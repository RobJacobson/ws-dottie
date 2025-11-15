import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { tollTripVersionInputSchema } from "./tollTripVersion.input";
import { tollTripVersionSchema } from "./tollTripVersion.output";

export const tollTripVersionGroup: EndpointGroup = {
  name: "toll-trip-version",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "TollTripVersion provides version and timestamp information for toll trip data, enabling cache management and data freshness tracking.",
    businessContext: "",
  },
};

export const fetchTollTripVersion = createEndpoint({
  api: apis.wsdotTollRates,
  group: tollTripVersionGroup,
  functionName: "fetchTollTripVersion",
  endpoint: "/getTollTripVersionAsJson",
  inputSchema: tollTripVersionInputSchema,
  outputSchema: tollTripVersionSchema,
  sampleParams: {},
  endpointDescription:
    "Returns current version and timestamp information for toll trip data.",
});
