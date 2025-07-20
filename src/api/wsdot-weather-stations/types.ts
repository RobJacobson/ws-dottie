// WSDOT Weather Stations API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_weather_stations.html
// API Endpoint: https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc

/**
 * Weather station data from WSDOT Weather Stations API
 * Based on actual API response structure and WeatherStationData class documentation
 */
export type WeatherStationData = {
  Latitude: number;
  Longitude: number;
  StationCode: number;
  StationName: string;
};

/**
 * Response types for weather stations API
 */
export type WeatherStationsResponse = WeatherStationData[];
