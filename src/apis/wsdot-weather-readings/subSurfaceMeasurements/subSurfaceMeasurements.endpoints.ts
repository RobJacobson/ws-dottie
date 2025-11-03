import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import * as i from "./subSurfaceMeasurements.input";
import * as o from "./subSurfaceMeasurements.output";

export const subSurfaceMeasurementsResource: EndpointGroup = {
  name: "sub-surface-measurements",
  documentation: {
    resourceDescription:
      "Each SubSurfaceMeasurements item represents temperature data collected from sensors embedded 12-18 inches below road pavement surfaces. These measurements help transportation officials monitor ground temperature conditions that affect road safety and maintenance decisions.",
    businessContext:
      "Use to assess road surface conditions by providing subsurface temperature data for winter maintenance operations and travel safety assessments.",
    updateFrequency: "",
    relatedEndpoints: [],
    usageExamples: [],
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    getSubSurfaceMeasurements: {
      function: "getSubSurfaceMeasurements",
      endpoint: "/Scanweb/SubSurfaceMeasurements",
      inputSchema: i.getSubSurfaceMeasurementsSchema,
      outputSchema: z.array(o.scanwebSubSurfaceMeasurementsSchema),
      sampleParams: {},
      endpointDescription:
        "Returns array of SubSurfaceMeasurements for all weather stations statewide.",
    } satisfies EndpointDefinition<
      i.GetSubSurfaceMeasurementsInput,
      o.ScanwebSubSurfaceMeasurements[]
    >,
  },
};
