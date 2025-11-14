import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import { surfaceMeasurementsInputSchema } from "./surfaceMeasurements.input";
import { surfaceMeasurementSchema } from "./surfaceMeasurements.output";

export const surfaceMeasurementsGroup = defineEndpointGroup({
  name: "surface-measurements",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.",
    businessContext: "",
  },
});

export const fetchSurfaceMeasurements = defineEndpoint({
  api: API,
  group: surfaceMeasurementsGroup,
  functionName: "fetchSurfaceMeasurements",
  endpoint: "/Scanweb/SurfaceMeasurements",
  inputSchema: surfaceMeasurementsInputSchema,
  outputSchema: surfaceMeasurementSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns surface measurements from all weather stations.",
});
