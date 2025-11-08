import type { EndpointDefinition, EndpointGroup } from "@/apis/types";
import { z } from "@/shared/zod-openapi-init";
import {
  type SubSurfaceMeasurementsInput,
  subSurfaceMeasurementsInputSchema,
} from "./subSurfaceMeasurements.input";
import {
  type SubsurfaceMeasurement,
  subsurfaceMeasurementSchema,
} from "./subSurfaceMeasurements.output";

export const subSurfaceMeasurementsResource = {
  name: "sub-surface-measurements",
  documentation: {
    resourceDescription:
      "Each SubSurfaceMeasurements item represents temperature data collected from sensors embedded 12-18 inches below road pavement surfaces. These measurements help transportation officials monitor ground temperature conditions that affect road safety and maintenance decisions.",
    businessContext:
      "Use to assess road surface conditions by providing subsurface temperature data for winter maintenance operations and travel safety assessments.",
  },
  cacheStrategy: "FREQUENT" as const,
  endpoints: {
    fetchSubSurfaceMeasurements: {
      endpoint: "/Scanweb/SubSurfaceMeasurements",
      inputSchema: subSurfaceMeasurementsInputSchema,
      outputSchema: z.array(subsurfaceMeasurementSchema),
      sampleParams: {},
      endpointDescription:
        "Returns array of SubSurfaceMeasurements for all weather stations statewide.",
    } satisfies EndpointDefinition<
      SubSurfaceMeasurementsInput,
      SubsurfaceMeasurement[]
    >,
  },
} satisfies EndpointGroup;
