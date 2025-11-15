import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import { subSurfaceMeasurementsInputSchema } from "./subSurfaceMeasurements.input";
import { subsurfaceMeasurementSchema } from "./subSurfaceMeasurements.output";

export const subSurfaceMeasurementsGroup: EndpointGroup = {
  name: "sub-surface-measurements",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Each SubSurfaceMeasurements item represents temperature data collected from sensors embedded 12-18 inches below road pavement surfaces. These measurements help transportation officials monitor ground temperature conditions that affect road safety and maintenance decisions.",
    businessContext:
      "Use to assess road surface conditions by providing subsurface temperature data for winter maintenance operations and travel safety assessments.",
  },
};

export const fetchSubSurfaceMeasurements = createEndpoint({
  api: apis.wsdotWeatherReadings,
  group: subSurfaceMeasurementsGroup,
  functionName: "fetchSubSurfaceMeasurements",
  endpoint: "/Scanweb/SubSurfaceMeasurements",
  inputSchema: subSurfaceMeasurementsInputSchema,
  outputSchema: subsurfaceMeasurementSchema.array(),
  sampleParams: {},
  endpointDescription:
    "Returns array of SubSurfaceMeasurements for all weather stations statewide.",
});
