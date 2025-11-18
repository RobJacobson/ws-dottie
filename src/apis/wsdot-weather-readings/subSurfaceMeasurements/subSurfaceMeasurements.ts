import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
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
export const fetchSubSurfaceMeasurements: (
  params?: FetchFunctionParams<SubSurfaceMeasurementsInput>
) => Promise<SubsurfaceMeasurement[]> = createFetchFunction(
  apis.wsdotWeatherReadings,
  subSurfaceMeasurementsGroup,
  subSurfaceMeasurementsMeta
);

/**
 * React Query hook for retrieving subsurface measurements from all weather stations statewide
 */
export const useSubSurfaceMeasurements: (
  params?: FetchFunctionParams<SubSurfaceMeasurementsInput>,
  options?: QueryHookOptions<SubsurfaceMeasurement[]>
) => UseQueryResult<SubsurfaceMeasurement[], Error> = createHook(
  apis.wsdotWeatherReadings,
  subSurfaceMeasurementsGroup,
  subSurfaceMeasurementsMeta
);
