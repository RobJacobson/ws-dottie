import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
import {
  type SubSurfaceMeasurementsInput,
  subSurfaceMeasurementsInputSchema,
} from "./shared/subSurfaceMeasurements.input";
import {
  type SubsurfaceMeasurement,
  subsurfaceMeasurementSchema,
} from "./shared/subSurfaceMeasurements.output";

/**
 * Metadata for the fetchSubSurfaceMeasurements endpoint
 */
export const subSurfaceMeasurementsMeta = {
  functionName: "fetchSubSurfaceMeasurements",
  endpoint: "/Scanweb/SubSurfaceMeasurements",
  inputSchema: subSurfaceMeasurementsInputSchema,
  outputSchema: subsurfaceMeasurementSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List subsurface measurements from all weather stations statewide.",
} satisfies EndpointMeta<SubSurfaceMeasurementsInput, SubsurfaceMeasurement[]>;

/**
 * Factory result for sub-surface measurements
 */
const subSurfaceMeasurementsFactory = createFetchAndHook<
  SubSurfaceMeasurementsInput,
  SubsurfaceMeasurement[]
>({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: subSurfaceMeasurementsMeta,
  getEndpointGroup: () =>
    require("./shared/subSurfaceMeasurements.endpoints")
      .subSurfaceMeasurementsGroup,
});

/**
 * Fetch function and React Query hook for retrieving subsurface measurements from all weather stations statewide
 */
export const {
  fetch: fetchSubSurfaceMeasurements,
  hook: useSubSurfaceMeasurements,
} = subSurfaceMeasurementsFactory;
