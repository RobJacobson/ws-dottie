import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { subSurfaceMeasurementsInputSchema } from "./subSurfaceMeasurements.input";
import { subsurfaceMeasurementSchema } from "./subSurfaceMeasurements.output";

export const subSurfaceMeasurementsGroup: EndpointGroup = {
  name: "sub-surface-measurements",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Subsurface temperature measurements from sensors embedded below road pavement.",
    description:
      "Ground temperature data from sensors embedded 12-18 inches below road pavement surfaces for monitoring ground temperature conditions.",
    useCases: [
      "Monitor ground temperature conditions for winter maintenance operations.",
      "Predict road surface conditions based on subsurface temperature trends.",
      "Assess travel safety by understanding ground temperature patterns.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchSubSurfaceMeasurements = createEndpoint({
  api: apis.wsdotWeatherReadings,
  group: subSurfaceMeasurementsGroup,
  functionName: "fetchSubSurfaceMeasurements",
  endpoint: "/Scanweb/SubSurfaceMeasurements",
  inputSchema: subSurfaceMeasurementsInputSchema,
  outputSchema: subsurfaceMeasurementSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List subsurface measurements from all weather stations statewide.",
});
