import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { mapAreasInputSchema } from "./alertAreas.input";
import { areaSchema } from "./alertAreas.output";

export const alertAreasGroup: EndpointGroup = {
  name: "alertAreas",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each Area item represents a geographic region used for organizing and filtering highway alerts across Washington State. These include unique area codes and descriptive names for different regions.",
    businessContext:
      "Use to filter highway alerts by geographic region by providing area codes and descriptions for targeted traffic information retrieval.",
  },
};

export const fetchMapAreas = createEndpoint({
  api: apis.wsdotHighwayAlerts,
  group: alertAreasGroup,
  functionName: "fetchMapAreas",
  endpoint: "/getMapAreasAsJson",
  inputSchema: mapAreasInputSchema,
  outputSchema: areaSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns an array of Area objects for all available geographic regions.",
});
