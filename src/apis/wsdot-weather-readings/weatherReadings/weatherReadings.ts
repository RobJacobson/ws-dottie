import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotWeatherReadingsApiMeta } from "../apiMeta";
import {
  type WeatherReadingsInput,
  weatherReadingsInputSchema,
} from "./shared/weatherReadings.input";
import {
  type WeatherReading,
  weatherReadingSchema,
} from "./shared/weatherReadings.output";

/**
 * Metadata for the fetchWeatherReadings endpoint
 */
export const weatherReadingsMeta = {
  functionName: "fetchWeatherReadings",
  endpoint: "/Scanweb",
  inputSchema: weatherReadingsInputSchema,
  outputSchema: weatherReadingSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List comprehensive weather readings from all weather stations.",
  toolDescription: {
    purpose:
      "List comprehensive weather readings from all WSDOT weather stations, including atmospheric conditions, precipitation data, and embedded surface/subsurface sensor measurements.",
    useWhen: [
      "needing complete weather station data for analysis",
      "building comprehensive weather monitoring systems",
      "accessing all available sensor measurements in one request",
    ],
    avoidWhen: [
      "you only need surface measurements (prefer fetchSurfaceMeasurements)",
      "you only need subsurface measurements (prefer fetchSubSurfaceMeasurements)",
      "you need data for specific stations (prefer weather-information endpoints)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per weather station",
    outputHighlights: [
      "StationId (NWS code), StationName, Latitude/Longitude, and Elevation for station identification",
      "ReadingTime as UTC timestamp when comprehensive reading was taken",
      "AirTemperature in Celsius, RelativeHumidty percentage, and BarometricPressure in millibars",
      "Wind data: AverageWindSpeed/AverageWindDirection in km/h and degrees, WindGust in km/h",
      "Visibility in meters and comprehensive precipitation data across multiple time periods",
      "PrecipitationType codes: 0=none, 1=rain, 2=snow with intensity and accumulation measurements",
      "SnowDepth in centimeters for winter conditions",
      "SurfaceMeasurements array with pavement temperatures, freezing points, and road condition codes",
      "SubSurfaceMeasurements array with ground temperatures from sensors below pavement",
      "Extremely comprehensive payload - largest response of all weather endpoints",
    ],
    chaining: [
      "fetchWeatherStations → extract StationId → correlate with weather readings data",
    ],
  },
} satisfies EndpointMeta<WeatherReadingsInput, WeatherReading[]>;

/**
 * Factory result for weather readings
 */
const weatherReadingsFactory = createFetchAndHook<
  WeatherReadingsInput,
  WeatherReading[]
>({
  api: wsdotWeatherReadingsApiMeta,
  endpoint: weatherReadingsMeta,
  getEndpointGroup: () =>
    require("./shared/weatherReadings.endpoints").weatherReadingsGroup,
});

/**
 * Fetch function and React Query hook for retrieving comprehensive weather readings from all weather stations
 */
export const { fetch: fetchWeatherReadings, hook: useWeatherReadings } =
  weatherReadingsFactory;
