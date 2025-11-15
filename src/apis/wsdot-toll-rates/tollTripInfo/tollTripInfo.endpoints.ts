import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { tollTripInfoInputSchema } from "./tollTripInfo.input";
import { tollTripInfoSchema } from "./tollTripInfo.output";

export const tollTripInfoGroup: EndpointGroup = {
  name: "toll-trip-info",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.",
    businessContext: "",
  },
};

export const fetchTollTripInfo = defineEndpoint({
  api: apis.wsdotTollRates,
  group: tollTripInfoGroup,
  functionName: "fetchTollTripInfo",
  endpoint: "/getTollTripInfoAsJson",
  inputSchema: tollTripInfoInputSchema,
  outputSchema: tollTripInfoSchema.array(),
  sampleParams: {},
  endpointDescription: "Returns trip information for all toll trips statewide.",
});
