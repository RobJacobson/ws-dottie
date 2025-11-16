import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { tollTripInfoInputSchema } from "./tollTripInfo.input";
import { tollTripInfoSchema } from "./tollTripInfo.output";

export const tollTripInfoGroup: EndpointGroup = {
  name: "toll-trip-info",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Trip route information for HOV toll lanes including locations, mileposts, and geometry.",
    description:
      "Reference data for toll trip routes including start and end locations, coordinates, mileposts, travel direction, and optional geometry data for mapping.",
    useCases: [
      "Display toll trip routes on maps.",
      "Look up trip information by location or route.",
      "Build trip selection interfaces for toll rate queries.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchTollTripInfo = createEndpoint({
  api: apis.wsdotTollRates,
  group: tollTripInfoGroup,
  functionName: "fetchTollTripInfo",
  endpoint: "/getTollTripInfoAsJson",
  inputSchema: tollTripInfoInputSchema,
  outputSchema: tollTripInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "List trip information for all toll trips statewide.",
});
