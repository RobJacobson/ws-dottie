// WSDOT Weather Information API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_information.html
// API Help: https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help

/**
 * Weather information data from WSDOT Weather Information API
 * Based on actual API response structure and WeatherInfo class documentation
 */
export type WeatherInfo = {
  BarometricPressure: number | null;
  Latitude: number;
  Longitude: number;
  PrecipitationInInches: number | null;
  ReadingTime: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  RelativeHumidity: number | null;
  SkyCoverage: string | null;
  StationID: number;
  StationName: string;
  TemperatureInFahrenheit: number | null;
  Visibility: number | null;
  WindDirection: number | null;
  WindDirectionCardinal: string | null;
  WindGustSpeedInMPH: number | null;
  WindSpeedInMPH: number | null;
};
/**
 * Response types for weather information API
 */
export type WeatherInformationResponse = WeatherInfo[];
