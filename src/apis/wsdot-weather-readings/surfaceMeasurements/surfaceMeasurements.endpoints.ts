import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { surfaceMeasurementsInputSchema } from "./surfaceMeasurements.input";
import { surfaceMeasurementSchema } from "./surfaceMeasurements.output";

const group = defineEndpointGroup({
  api: wsdotWeatherReadingsApi,
  name: "surface-measurements",
  documentation: {
    resourceDescription:
      "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchSurfaceMeasurements = defineEndpoint({
  group,
  functionName: "fetchSurfaceMeasurements",
  definition: {
    endpoint: "/Scanweb/SurfaceMeasurements",
    inputSchema: surfaceMeasurementsInputSchema,
    outputSchema: surfaceMeasurementSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns surface measurements from all weather stations.",
  },
});

export const surfaceMeasurementsResource = group.descriptor;
