import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { surfaceMeasurementsInputSchema } from "./surfaceMeasurements.input";
import { surfaceMeasurementSchema } from "./surfaceMeasurements.output";

export const surfaceMeasurementsGroup: EndpointGroup = {
  name: "surface-measurements",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary:
      "Surface sensor measurements from WSDOT weather stations statewide.",
    description:
      "Pavement surface temperature, road freezing temperature, and road surface condition codes from sensors embedded in or mounted on road surfaces.",
    useCases: [
      "Monitor road surface conditions for winter maintenance operations.",
      "Assess pavement temperature and freezing risk.",
      "Evaluate travel safety based on surface condition codes.",
    ],
    updateFrequency: "5m",
  },
};

export const fetchSurfaceMeasurements = createEndpoint({
  api: apis.wsdotWeatherReadings,
  group: surfaceMeasurementsGroup,
  functionName: "fetchSurfaceMeasurements",
  endpoint: "/Scanweb/SurfaceMeasurements",
  inputSchema: surfaceMeasurementsInputSchema,
  outputSchema: surfaceMeasurementSchema.array(),
  sampleParams: {},
  endpointDescription: "List surface measurements from all weather stations.",
});
