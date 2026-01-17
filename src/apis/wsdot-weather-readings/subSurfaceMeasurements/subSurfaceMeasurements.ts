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
  toolDescription: {
    purpose:
      "List subsurface temperature measurements from sensors embedded 12-18 inches below road pavement at WSDOT weather stations.",
    useWhen: [
      "monitoring subsurface road temperatures",
      "analyzing pavement conditions",
      "studying ground temperature patterns",
    ],
    avoidWhen: [
      "you need surface-level measurements (prefer fetchSurfaceMeasurements)",
      "you need comprehensive weather data (prefer fetchWeatherReadings)",
    ],
    inputs: [],
    returns: "array — one item per subsurface sensor",
    outputHighlights: [
      "SensorId for sensor identification",
      "SubSurfaceTemperature in Celsius from sensors 12-18 inches below pavement",
      "Measurements help assess pavement conditions and freeze/thaw cycles",
      "SensorId may be undefined for some sensors",
      "Temperature values may be undefined when sensors are offline",
    ],
    chaining: [
      "fetchWeatherStations → extract StationID → correlate with subsurface measurements",
    ],
  },
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
