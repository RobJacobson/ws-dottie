import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { tollTripVersionInputSchema } from "./tollTripVersion.input";
import { tollTripVersionSchema } from "./tollTripVersion.output";

export const tollTripVersionGroup: EndpointGroup = {
  name: "toll-trip-version",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Version and timestamp information for toll trip data.",
    description:
      "Current version number and timestamp for toll trip rates data, enabling cache management and data freshness tracking.",
    useCases: [
      "Check data freshness before fetching toll rates.",
      "Determine when to invalidate cached toll rate data.",
      "Track version changes for toll trip rates.",
    ],
    updateFrequency: "5m",
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
  endpointDescription: "Get current version and timestamp for toll trip data.",
});
