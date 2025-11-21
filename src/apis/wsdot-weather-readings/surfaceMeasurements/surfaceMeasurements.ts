import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
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
 * Factory result for surface measurements
 */
const surfaceMeasurementsFactory = createFetchAndHook<
  SurfaceMeasurementsInput,
  SurfaceMeasurement[]
>({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: surfaceMeasurementsMeta,
  getEndpointGroup: () =>
    require("./shared/surfaceMeasurements.endpoints").surfaceMeasurementsGroup,
});

/**
 * Fetch function and React Query hook for retrieving surface measurements from all weather stations
 */
export const { fetch: fetchSurfaceMeasurements, hook: useSurfaceMeasurements } =
  surfaceMeasurementsFactory;
