import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { mapAreasInputSchema } from "./alertAreas.input";
import { areaSchema } from "./alertAreas.output";

export const alertAreasGroup: EndpointGroup = {
  name: "alertAreas",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Geographic map areas for filtering highway alerts by region.",
    description:
      "Area codes and names used to organize and filter highway alerts across Washington State geographic regions.",
    useCases: [
      "Filter highway alerts by geographic map area.",
      "Obtain valid area codes for alert queries.",
      "Display regional alert organization in user interfaces.",
    ],
    updateFrequency: "5m",
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
    "List all available geographic map areas for filtering alerts.",
});
