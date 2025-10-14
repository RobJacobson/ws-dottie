import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const surfaceMeasurementsResource = {
  name: "surface-measurements",
  resourceDescription:
    "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.",
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getSurfaceMeasurements: {
      function: "getSurfaceMeasurements",
      endpoint: "/Scanweb/SurfaceMeasurements",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.scanwebSurfaceMeasurementsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns surface measurements from all weather stations.",
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.ScanwebSurfaceMeasurements[]
    >,
  },
};
