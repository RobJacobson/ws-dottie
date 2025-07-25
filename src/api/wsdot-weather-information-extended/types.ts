// WSDOT Weather Information Extended API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_traveler_a_p_i_1_1_controller_1_1_scanweb_controller.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/api/Scanweb

/**
 * Surface measurement data from weather stations
 */
export type SurfaceMeasurement = {
  SensorId: number;
  SurfaceTemperature: number | null;
  RoadFreezingTemperature: number | null;
  RoadSurfaceCondition: number | null;
};

/**
 * Subsurface measurement data from weather stations
 */
export type SubSurfaceMeasurement = {
  SensorId: number;
  SubSurfaceTemperature: number | null;
};

/**
 * Extended weather reading data from WSDOT Weather Information Extended API
 * Based on actual API response structure and WeatherReading class documentation
 * Updated 2024-12-19: ReadingTime can be null in actual API responses despite documentation
 */
export type WeatherReading = {
  StationId: string;
  StationName: string;
  Latitude: number;
  Longitude: number;
  Elevation: number;
  ReadingTime: Date | null; // Converted from ISO date string, can be null
  AirTemperature: number | null;
  RelativeHumidty: number | null; // Note: API has typo "Humidty" instead of "Humidity"
  AverageWindSpeed: number | null;
  AverageWindDirection: number | null;
  WindGust: number | null;
  Visibility: number | null;
  PrecipitationIntensity: number | null;
  PrecipitationType: number | null;
  PrecipitationPast1Hour: number | null;
  PrecipitationPast3Hours: number | null;
  PrecipitationPast6Hours: number | null;
  PrecipitationPast12Hours: number | null;
  PrecipitationPast24Hours: number | null;
  PrecipitationAccumulation: number | null;
  BarometricPressure: number | null;
  SnowDepth: number | null;
  SurfaceMeasurements: SurfaceMeasurement[] | null;
  SubSurfaceMeasurements: SubSurfaceMeasurement[] | null;
};
