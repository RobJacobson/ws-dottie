import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotTollRatesApi } from "../apiDefinition";
import { tollTripInfoInputSchema } from "./tollTripInfo.input";
import { tollTripInfoSchema } from "./tollTripInfo.output";

const group = defineEndpointGroup({
  api: wsdotTollRatesApi,
  name: "toll-trip-info",
  documentation: {
    resourceDescription:
      "TollTripInfo provides detailed trip information including geographical data, location names, mileposts, and geometry information for toll trips across statewide coverage areas.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchTollTripInfo = defineEndpoint({
  group,
  functionName: "fetchTollTripInfo",
  definition: {
    endpoint: "/getTollTripInfoAsJson",
    inputSchema: tollTripInfoInputSchema,
    outputSchema: tollTripInfoSchema.array(),
    sampleParams: {},
    endpointDescription: "Returns trip information for all toll trips.",
  },
});

export const tollTripInfoResource = group.descriptor;
