import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./surfaceMeasurements.input";
import * as o from "./surfaceMeasurements.output";

export const surfaceMeasurementsResource: EndpointGroup = {
  name: "surface-measurements",
  documentation: {
    resourceDescription:
      "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getSurfaceMeasurements: {
      function: "getSurfaceMeasurements",
      endpoint: "/Scanweb/SurfaceMeasurements",
      inputSchema: i.getSurfaceMeasurementsSchema,
      outputSchema: z.array(o.scanwebSurfaceMeasurementsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns surface measurements from all weather stations.",
    } satisfies EndpointDefinition<
      i.GetSurfaceMeasurementsInput,
      o.ScanwebSurfaceMeasurements[]
    >,
  },
};
