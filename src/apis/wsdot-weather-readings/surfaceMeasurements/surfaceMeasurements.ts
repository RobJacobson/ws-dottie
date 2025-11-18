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
import { surfaceMeasurementsGroup } from "./shared/surfaceMeasurements.endpoints";
import {
  type SurfaceMeasurementsInput,
  surfaceMeasurementsInputSchema,
} from "./shared/surfaceMeasurements.input";
import {
  type SurfaceMeasurement,
  surfaceMeasurementSchema,
} from "./shared/surfaceMeasurements.output";

/**
 * Metadata for the fetchSurfaceMeasurements endpoint
 */
export const surfaceMeasurementsMeta = {
  functionName: "fetchSurfaceMeasurements",
  endpoint: "/Scanweb/SurfaceMeasurements",
  inputSchema: surfaceMeasurementsInputSchema,
  outputSchema: surfaceMeasurementSchema.array(),
  sampleParams: {},
  endpointDescription: "List surface measurements from all weather stations.",
} satisfies EndpointMeta<SurfaceMeasurementsInput, SurfaceMeasurement[]>;

/**
 * Fetch function for retrieving surface measurements from all weather stations
 */
export const fetchSurfaceMeasurements: (
  params?: FetchFunctionParams<SurfaceMeasurementsInput>
) => Promise<SurfaceMeasurement[]> = createFetchFunction(
  apis.wsdotWeatherReadings,
  surfaceMeasurementsGroup,
  surfaceMeasurementsMeta
);

/**
 * React Query hook for retrieving surface measurements from all weather stations
 */
export const useSurfaceMeasurements: (
  params?: FetchFunctionParams<SurfaceMeasurementsInput>,
  options?: QueryHookOptions<SurfaceMeasurement[]>
) => UseQueryResult<SurfaceMeasurement[], Error> = createHook(
  apis.wsdotWeatherReadings,
  surfaceMeasurementsGroup,
  surfaceMeasurementsMeta
);
