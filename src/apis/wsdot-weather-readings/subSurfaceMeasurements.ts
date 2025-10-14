import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

const DESCRIPTION =
  "SubSurfaceMeasurements provides sub-surface sensor data including sub-surface temperature readings from weather stations. Coverage Area: Statewide.";

export const subSurfaceMeasurementsResource = {
  name: "sub-surface-measurements",
  description: DESCRIPTION,
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    all: {
      function: "getSubSurfaceMeasurements",
      endpoint: "/Scanweb/SubSurfaceMeasurements",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.scanwebSubSurfaceMeasurementsSchema),
      sampleParams: {},
      cacheStrategy: "FREQUENT",
      description: `Returns sub-surface measurements from all weather stations. ${DESCRIPTION}`,
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.ScanwebSubSurfaceMeasurements[]
    >,
  },
};
