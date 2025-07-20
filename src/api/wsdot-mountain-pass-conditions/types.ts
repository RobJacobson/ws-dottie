// WSDOT Mountain Pass Conditions API types
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

/**
 * Travel restriction information for mountain passes
 */
export type TravelRestriction = {
  TravelDirection: string;
  RestrictionText: string;
};

/**
 * Mountain pass condition data from WSDOT Mountain Pass Conditions API
 * Based on actual API response structure and PassCondition class documentation
 */
export type MountainPassCondition = {
  DateUpdated: Date; // Converted from WSDOT date format "/Date(timestamp)/"
  ElevationInFeet: number;
  Latitude: number;
  Longitude: number;
  MountainPassId: number;
  MountainPassName: string;
  RestrictionOne: TravelRestriction;
  RestrictionTwo: TravelRestriction;
  RoadCondition: string;
  TemperatureInFahrenheit: number | null;
  TravelAdvisoryActive: boolean;
  WeatherCondition: string;
};

/**
 * Response type for mountain pass conditions API
 */
export type MountainPassConditionsResponse = MountainPassCondition[];
