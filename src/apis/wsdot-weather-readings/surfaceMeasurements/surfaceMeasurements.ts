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
  toolDescription: {
    purpose:
      "List pavement surface measurements including temperature, freezing point, and road condition from sensors embedded in or mounted on road surfaces.",
    useWhen: [
      "monitoring road surface temperatures",
      "assessing freezing conditions and road safety",
      "analyzing pavement moisture and ice conditions",
    ],
    avoidWhen: [
      "you need subsurface measurements (prefer fetchSubSurfaceMeasurements)",
      "you need comprehensive weather data (prefer fetchWeatherReadings)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per surface sensor",
    outputHighlights: [
      "SensorId for sensor identification",
      "SurfaceTemperature in Celsius from pavement surface sensors",
      "RoadFreezingTemperature in Celsius based on chemical treatment of moisture",
      "RoadSurfaceCondition code: 101=Dry, 102=Wet, 103=Moist, 104=Ice, 105=Snow, 108=Unknown",
      "Critical for winter road maintenance and safety assessments",
      "Sensor fields may be undefined when sensors are offline",
    ],
    chaining: [
      "fetchWeatherStations → extract StationID → correlate with surface measurements",
    ],
  },
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
