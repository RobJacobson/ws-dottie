import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsdotWeatherReadingsApi } from "../apiDefinition";
import { subSurfaceMeasurementsInputSchema } from "./subSurfaceMeasurements.input";
import { subsurfaceMeasurementSchema } from "./subSurfaceMeasurements.output";

const group = defineEndpointGroup({
  api: wsdotWeatherReadingsApi,
  name: "sub-surface-measurements",
  documentation: {
    resourceDescription:
      "Each SubSurfaceMeasurements item represents temperature data collected from sensors embedded 12-18 inches below road pavement surfaces. These measurements help transportation officials monitor ground temperature conditions that affect road safety and maintenance decisions.",
    businessContext:
      "Use to assess road surface conditions by providing subsurface temperature data for winter maintenance operations and travel safety assessments.",
  },
  cacheStrategy: "FREQUENT",
});

export const fetchSubSurfaceMeasurements = defineEndpoint({
  group,
  functionName: "fetchSubSurfaceMeasurements",
  definition: {
    endpoint: "/Scanweb/SubSurfaceMeasurements",
    inputSchema: subSurfaceMeasurementsInputSchema,
    outputSchema: subsurfaceMeasurementSchema.array(),
    sampleParams: {},
    endpointDescription:
      "Returns array of SubSurfaceMeasurements for all weather stations statewide.",
  },
});

export const subSurfaceMeasurementsResource = group.descriptor;
