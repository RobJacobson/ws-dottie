// NOTE: WSDOT Weather Information Extended API schema has been updated
// Previous issues identified and resolved:
// 1. ReadingTime field was using custom regex instead of zWsdotDate() utility function
// 2. Schema now uses zWsdotDate().nullable() for consistency with other WSDOT APIs
// 3. Date handling is now consistent with project standards while maintaining functionality

import { expect } from "vitest";

import {
  getWeatherInformationExtended,
  weatherReadingArraySchema,
} from "../../../src/api/wsdot-weather-information-extended";
import type { ApiModuleConfig } from "../utils/types";

export const wsdotWeatherInformationExtendedTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Weather Information Extended",
  endpoints: [
    {
      apiFunction: getWeatherInformationExtended,
      outputSchema: weatherReadingArraySchema,
      validParams: {},
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getWeatherInformationExtended",
      category: "parameterless",
      maxResponseTime: 5000,
      customTests: [
        {
          name: "should return non-empty extended weather data",
          test: async () => {
            const result = await getWeatherInformationExtended();
            expect(result.length).toBeGreaterThan(0);
          },
        },
        {
          name: "should return valid weather reading structure",
          test: async () => {
            const result = await getWeatherInformationExtended();
            const firstReading = result[0];

            // Validate required fields exist
            expect(firstReading).toHaveProperty("StationId");
            expect(firstReading).toHaveProperty("StationName");
            expect(firstReading).toHaveProperty("ReadingTime");
            expect(firstReading).toHaveProperty("Latitude");
            expect(firstReading).toHaveProperty("Longitude");
            expect(firstReading).toHaveProperty("Elevation");

            // Validate data types
            expect(typeof firstReading.StationId).toBe("string");
            expect(typeof firstReading.StationName).toBe("string");
            expect(typeof firstReading.ReadingTime).toBe("string");
            expect(typeof firstReading.Latitude).toBe("number");
            expect(typeof firstReading.Longitude).toBe("number");
            expect(typeof firstReading.Elevation).toBe("number");
          },
        },
        {
          name: "should return valid coordinate ranges for Washington State",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              // Washington State coordinate ranges (skip readings with invalid coordinates)
              if (reading.Latitude !== 0 && reading.Longitude !== 0) {
                expect(reading.Latitude).toBeGreaterThanOrEqual(45.5);
                expect(reading.Latitude).toBeLessThanOrEqual(49.0);
                expect(reading.Longitude).toBeGreaterThanOrEqual(-125.0);
                expect(reading.Longitude).toBeLessThanOrEqual(-116.5);
              }
            });
          },
        },
        {
          name: "should return reasonable elevation values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              // Elevation should be reasonable for Washington State (-100 to 15,000 feet)
              expect(reading.Elevation).toBeGreaterThanOrEqual(-100);
              expect(reading.Elevation).toBeLessThanOrEqual(15000);
            });
          },
        },
        {
          name: "should return reasonable temperature values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.AirTemperature !== null) {
                // Reasonable temperature range for Washington State (-50°C to 50°C)
                expect(reading.AirTemperature).toBeGreaterThanOrEqual(-50);
                expect(reading.AirTemperature).toBeLessThanOrEqual(50);
              }
            });
          },
        },
        {
          name: "should return valid humidity values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.RelativeHumidty !== null) {
                // Note: API has typo 'RelativeHumidty'
                // Humidity should be 0-200% (allows for supersaturated conditions)
                expect(reading.RelativeHumidty).toBeGreaterThanOrEqual(0);
                expect(reading.RelativeHumidty).toBeLessThanOrEqual(200);
              }
            });
          },
        },
        {
          name: "should return valid wind speed values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.AverageWindSpeed !== null) {
                // Wind speed should be reasonable (0 to 200 mph)
                expect(reading.AverageWindSpeed).toBeGreaterThanOrEqual(0);
                expect(reading.AverageWindSpeed).toBeLessThanOrEqual(200);
              }
              if (reading.WindGust !== null) {
                // Wind gust should be reasonable (0 to 250 mph)
                expect(reading.WindGust).toBeGreaterThanOrEqual(0);
                expect(reading.WindGust).toBeLessThanOrEqual(250);
              }
            });
          },
        },
        {
          name: "should return valid wind direction values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.AverageWindDirection !== null) {
                // Wind direction should be 0-359 degrees
                expect(reading.AverageWindDirection).toBeGreaterThanOrEqual(0);
                expect(reading.AverageWindDirection).toBeLessThanOrEqual(359);
              }
            });
          },
        },
        {
          name: "should return valid visibility values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.Visibility !== null) {
                // Visibility should be reasonable (0 to 100,000 meters)
                expect(reading.Visibility).toBeGreaterThanOrEqual(0);
                expect(reading.Visibility).toBeLessThanOrEqual(100000);
              }
            });
          },
        },
        {
          name: "should return valid precipitation values",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              // Precipitation values should be non-negative
              if (reading.PrecipitationPast1Hour !== null) {
                expect(reading.PrecipitationPast1Hour).toBeGreaterThanOrEqual(
                  0
                );
              }
              if (reading.PrecipitationPast3Hours !== null) {
                expect(reading.PrecipitationPast3Hours).toBeGreaterThanOrEqual(
                  0
                );
              }
              if (reading.PrecipitationPast6Hours !== null) {
                expect(reading.PrecipitationPast6Hours).toBeGreaterThanOrEqual(
                  0
                );
              }
              if (reading.PrecipitationPast12Hours !== null) {
                expect(reading.PrecipitationPast12Hours).toBeGreaterThanOrEqual(
                  0
                );
              }
              if (reading.PrecipitationPast24Hours !== null) {
                expect(reading.PrecipitationPast24Hours).toBeGreaterThanOrEqual(
                  0
                );
              }
              if (reading.PrecipitationAccumulation !== null) {
                expect(
                  reading.PrecipitationAccumulation
                ).toBeGreaterThanOrEqual(0);
              }
            });
          },
        },
        {
          name: "should return valid surface measurement data when available",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.SurfaceMeasurements) {
                reading.SurfaceMeasurements.forEach((surface) => {
                  // Validate surface measurement structure
                  expect(surface).toHaveProperty("SensorId");
                  expect(surface).toHaveProperty("SurfaceTemperature");
                  expect(surface).toHaveProperty("RoadFreezingTemperature");
                  expect(surface).toHaveProperty("RoadSurfaceCondition");

                  // Validate data types
                  expect(typeof surface.SensorId).toBe("number");

                  // Temperature values should be reasonable
                  if (surface.SurfaceTemperature !== null) {
                    expect(surface.SurfaceTemperature).toBeGreaterThanOrEqual(
                      -50
                    );
                    expect(surface.SurfaceTemperature).toBeLessThanOrEqual(100);
                  }
                  if (surface.RoadFreezingTemperature !== null) {
                    expect(
                      surface.RoadFreezingTemperature
                    ).toBeGreaterThanOrEqual(-50);
                    expect(surface.RoadFreezingTemperature).toBeLessThanOrEqual(
                      50
                    );
                  }
                });
              }
            });
          },
        },
        {
          name: "should return valid subsurface measurement data when available",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.SubSurfaceMeasurements) {
                reading.SubSurfaceMeasurements.forEach((subsurface) => {
                  // Validate subsurface measurement structure
                  expect(subsurface).toHaveProperty("SensorId");
                  expect(subsurface).toHaveProperty("SubSurfaceTemperature");

                  // Validate data types
                  expect(typeof subsurface.SensorId).toBe("number");

                  // Temperature values should be reasonable
                  if (subsurface.SubSurfaceTemperature !== null) {
                    expect(
                      subsurface.SubSurfaceTemperature
                    ).toBeGreaterThanOrEqual(-50);
                    expect(
                      subsurface.SubSurfaceTemperature
                    ).toBeLessThanOrEqual(50);
                  }
                });
              }
            });
          },
        },
        {
          name: "should return valid timestamp data",
          test: async () => {
            const result = await getWeatherInformationExtended();

            result.forEach((reading) => {
              if (reading.ReadingTime !== null) {
                // Timestamps should be valid ISO 8601 format
                expect(reading.ReadingTime).toMatch(
                  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/
                );

                // Validate that timestamps can be parsed as valid dates
                const timestamp = new Date(reading.ReadingTime);
                expect(timestamp.getTime()).not.toBeNaN();
              }
            });
          },
        },
      ],
    },
  ],
  settings: {
    defaultMaxResponseTime: 5000,
    requiresAuth: false,
    rateLimitDelay: 100,
  },
};
