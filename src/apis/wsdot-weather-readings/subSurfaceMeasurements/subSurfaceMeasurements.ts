import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
import { subSurfaceMeasurementsGroup } from "./shared/subSurfaceMeasurements.endpoints";
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
 * Fetch function for retrieving subsurface measurements from all weather stations statewide
 */
export const fetchSubSurfaceMeasurements: FetchFactory<
  SubSurfaceMeasurementsInput,
  SubsurfaceMeasurement[]
> = createFetchFunction({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: subSurfaceMeasurementsMeta,
});

/**
 * React Query hook for retrieving subsurface measurements from all weather stations statewide
 */
export const useSubSurfaceMeasurements: HookFactory<
  SubSurfaceMeasurementsInput,
  SubsurfaceMeasurement[]
> = createHook({
  apiName: wsdotWeatherReadingsApiMeta.name,
  endpointName: subSurfaceMeasurementsMeta.functionName,
  fetchFn: fetchSubSurfaceMeasurements,
  cacheStrategy: subSurfaceMeasurementsGroup.cacheStrategy,
});
