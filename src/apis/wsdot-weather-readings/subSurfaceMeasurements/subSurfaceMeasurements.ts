import { z } from "zod";
import type { EndpointDefinition } from "@/apis/types";
import * as i from "./subSurfaceMeasurements.input";
import * as o from "./subSurfaceMeasurements.output";

export const export const subSurfaceMeasurementsResource = {: EndpointGroup 
  name: "sub-surface-measurements",
  resourceDescription:
    "SubSurfaceMeasurements provides sub-surface sensor data including sub-surface temperature readings from weather stations. Coverage Area: Statewide.",
  documentation: {
    resourceDescription: "SubSurfaceMeasurements provides sub-surface sensor data including sub-surface temperature readings from weather stations. Coverage Area: Statewide.\"",
    businessContext: "",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: []
  }cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getSubSurfaceMeasurements: {
      function: "getSubSurfaceMeasurements",
      endpoint: "/Scanweb/SubSurfaceMeasurements",
      inputSchema: i.getWeatherReadingsSchema,
      outputSchema: z.array(o.scanwebSubSurfaceMeasurementsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns sub-surface measurements from all weather stations.",
    } satisfies EndpointDefinition<
      i.GetWeatherReadingsInput,
      o.ScanwebSubSurfaceMeasurements[]
    >,
  },
};
