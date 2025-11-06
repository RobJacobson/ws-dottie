import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./surfaceMeasurements.input";
import * as o from "./surfaceMeasurements.output";

export const surfaceMeasurementsResource = {
  name: "surface-measurements",
  documentation: {
    resourceDescription:
      "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getSurfaceMeasurements: {
      function: "getSurfaceMeasurements",
      endpoint: "/Scanweb/SurfaceMeasurements",
      inputSchema: i.surfaceMeasurementsInputSchema,
      outputSchema: z.array(o.surfaceMeasurementSchema),
      sampleParams: {},
      endpointDescription:
        "Returns surface measurements from all weather stations.",
    } satisfies EndpointDefinition<
      i.SurfaceMeasurementsInput,
      o.SurfaceMeasurement[]
    >,
  },
} satisfies EndpointGroup;
