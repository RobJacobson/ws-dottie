import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotHighwayAlertsApi } from "../apiDefinition";
import { mapAreasInputSchema } from "./alertAreas.input";
import { areaSchema } from "./alertAreas.output";

const group = defineEndpointGroup({
  api: wsdotHighwayAlertsApi,
  name: "alertAreas",
  documentation: {
    resourceDescription:
      "Each Area item represents a geographic region used for organizing and filtering highway alerts across Washington State. These include unique area codes and descriptive names for different regions.",
    businessContext:
      "Use to filter highway alerts by geographic region by providing area codes and descriptions for targeted traffic information retrieval.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchMapAreas = defineEndpoint({
  group,
  functionName: "fetchMapAreas",
  definition: {
    endpoint: "/getMapAreasAsJson",
    inputSchema: mapAreasInputSchema,
    outputSchema: areaSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns an array of Area objects for all available geographic regions.",
  },
});

export const alertAreasGroup = group.descriptor;
