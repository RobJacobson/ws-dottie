import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "SurfaceMeasurements provides surface sensor data including surface temperature, road freezing temperature, and road surface condition from weather stations. Coverage Area: Statewide.";

export const surfaceMeasurementsResource = {
  name: "surface-measurements",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getSurfaceMeasurements",
      endpoint: "/Scanweb/SurfaceMeasurements",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.scanwebSurfaceMeasurementsSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns surface measurements from all weather stations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.ScanwebSurfaceMeasurements[]
    >,
  },
};
