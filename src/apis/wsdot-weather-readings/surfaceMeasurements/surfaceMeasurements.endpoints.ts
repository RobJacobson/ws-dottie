import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import type { SurfaceMeasurementsInput } from "./surfaceMeasurements.input";
import { surfaceMeasurementsInputSchema } from "./surfaceMeasurements.input";
import type { SurfaceMeasurement } from "./surfaceMeasurements.output";
import { surfaceMeasurementSchema } from "./surfaceMeasurements.output";

export const surfaceMeasurementsResource = {
  name: "surface-measurements",
  documentation: {
    resourceDescription:
      "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.",
    businessContext: "",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchSurfaceMeasurements: {
      endpoint: "/Scanweb/SurfaceMeasurements",
      inputSchema: surfaceMeasurementsInputSchema,
      outputSchema: z.array(surfaceMeasurementSchema),
      sampleParams: {},
      endpointDescription:
        "Returns surface measurements from all weather stations.",
    } satisfies EndpointDefinition<
      SurfaceMeasurementsInput,
      SurfaceMeasurement[]
    >,
  },
} satisfies EndpointGroup;
