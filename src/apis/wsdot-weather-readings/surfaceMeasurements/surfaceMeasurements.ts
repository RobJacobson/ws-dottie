import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
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
export const fetchSurfaceMeasurements: FetchFactory<
  SurfaceMeasurementsInput,
  SurfaceMeasurement[]
> = createFetchFunction({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: surfaceMeasurementsMeta,
});

/**
 * React Query hook for retrieving surface measurements from all weather stations
 */
export const useSurfaceMeasurements: HookFactory<
  SurfaceMeasurementsInput,
  SurfaceMeasurement[]
> = createHook({
  apiName: wsdotWeatherReadingsApiMeta.name,
  endpointName: surfaceMeasurementsMeta.functionName,
  fetchFn: fetchSurfaceMeasurements,
  cacheStrategy: surfaceMeasurementsGroup.cacheStrategy,
});
