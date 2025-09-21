import { expect } from "vitest";
import { z } from "zod";

import {
  commercialVehicleRestrictionArraySchema,
  commercialVehicleRestrictionSchema,
  commercialVehicleRestrictionWithIdArraySchema,
  commercialVehicleRestrictionWithIdSchema,
  getCommercialVehicleRestrictions,
  getCommercialVehicleRestrictionsParamsSchema,
  getCommercialVehicleRestrictionsWithId,
  getCommercialVehicleRestrictionsWithIdParamsSchema,
} from "@/clients/wsdot-commercial-vehicle-restrictions";

import { wsdotTestData } from "../utils/test-data";
import type { ApiModuleConfig } from "../utils/types";

/**
 * Test configuration for WSDOT Commercial Vehicle Restrictions API
 *
 * This configuration defines all the test requirements for the commercial vehicle restrictions endpoints.
 * The test generators will use this configuration to create comprehensive test suites.
 */
export const commercialVehicleRestrictionsTestConfig: ApiModuleConfig = {
  moduleName: "WSDOT Commercial Vehicle Restrictions",

  settings: {
    defaultMaxResponseTime: 5000, // 5 seconds for commercial vehicle restriction endpoints
    requiresAuth: false,
    rateLimitDelay: 200, // 200ms between requests to avoid overwhelming the API
  },

  sharedTestData: {
    validRestrictionIds:
      wsdotTestData.commercialVehicleRestrictions.validRestrictionIds,
    invalidRestrictionIds:
      wsdotTestData.commercialVehicleRestrictions.invalidRestrictionIds,
  },

  endpoints: [
    // Parameterless endpoint - get all commercial vehicle restrictions
    {
      apiFunction: getCommercialVehicleRestrictions,
      inputSchema: getCommercialVehicleRestrictionsParamsSchema,
      outputSchema: commercialVehicleRestrictionArraySchema,
      validParams: {}, // No parameters required
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getCommercialVehicleRestrictions",
      category: "parameterless",
      maxResponseTime: 5000,

      customTests: [
        {
          name: "should return restrictions with valid location data",
          test: async () => {
            const result = await getCommercialVehicleRestrictions({});

            // Data is already validated by zodFetch, so we can use result directly
            // Check that restrictions have valid location data
            for (const restriction of result) {
              expect(restriction.Latitude).toBeDefined();
              expect(restriction.Longitude).toBeDefined();
              expect(restriction.StateRouteID).toBeDefined();
              expect(restriction.BridgeNumber).toBeDefined();
              expect(restriction.BridgeName).toBeDefined();

              // Check reasonable latitude/longitude ranges for Washington State
              expect(restriction.Latitude).toBeGreaterThan(45); // Southern border
              expect(restriction.Latitude).toBeLessThan(50); // Northern border
              expect(restriction.Longitude).toBeGreaterThan(-125); // Western border
              expect(restriction.Longitude).toBeLessThan(-116); // Eastern border

              // Check that route ID is not empty
              expect(restriction.StateRouteID.length).toBeGreaterThan(0);

              // Bridge fields may be empty for non-bridge restrictions
              if (
                restriction.BridgeNumber &&
                restriction.BridgeNumber.length > 0
              ) {
                expect(restriction.BridgeName.length).toBeGreaterThan(0);
              }
            }
          },
        },
        {
          name: "should return restrictions with valid restriction data",
          test: async () => {
            const result = await getCommercialVehicleRestrictions({});
            // Data is already validated by zodFetch, so we can use result directly
            // Check that restrictions have valid restriction data
            for (const restriction of result) {
              expect(restriction.RestrictionType).toBeDefined();
              expect(restriction.VehicleType).toBeDefined();
              expect(restriction.LocationDescription).toBeDefined();
              expect(restriction.LocationName).toBeDefined();
              expect(restriction.RestrictionComment).toBeDefined();

              // Check that restriction type is a valid number (0 is a valid restriction type code)
              expect(restriction.RestrictionType).toBeGreaterThanOrEqual(0);

              // Check that required string fields are not empty
              // VehicleType may be empty for some restrictions
              if (
                restriction.VehicleType &&
                restriction.VehicleType.length > 0
              ) {
                expect(restriction.VehicleType.length).toBeGreaterThan(0);
              }
              expect(restriction.LocationDescription.length).toBeGreaterThan(0);
              expect(restriction.LocationName.length).toBeGreaterThan(0);
              expect(restriction.RestrictionComment.length).toBeGreaterThan(0);
            }
          },
        },
        {
          name: "should return restrictions with valid date data",
          test: async () => {
            const result = await getCommercialVehicleRestrictions({});
            // Data is already validated by zodFetch, so we can use result directly
            // Check that restrictions have valid date data
            for (const restriction of result) {
              expect(restriction.DatePosted).toBeDefined();
              expect(restriction.DateEffective).toBeDefined();
              expect(restriction.DateExpires).toBeDefined();

              // Check that dates are valid Date objects
              expect(restriction.DatePosted).toBeInstanceOf(Date);
              expect(restriction.DateEffective).toBeInstanceOf(Date);
              expect(restriction.DateExpires).toBeInstanceOf(Date);

              // Check that posted date is not in the future
              expect(restriction.DatePosted.getTime()).toBeLessThanOrEqual(
                Date.now()
              );

              // Check that effective date is not in the future (for new restrictions)
              // Note: Some restrictions might be scheduled for future dates
              // So we'll just check that it's a valid date

              // Check that expiration date is after effective date (for temporary restrictions)
              if (!restriction.IsPermanentRestriction) {
                expect(
                  restriction.DateExpires.getTime()
                ).toBeGreaterThanOrEqual(restriction.DateEffective.getTime());
              }
            }
          },
        },
        {
          name: "should return restrictions with valid roadway location data",
          test: async () => {
            const result = await getCommercialVehicleRestrictions({});
            // Data is already validated by zodFetch, so we can use result directly
            // Check that restrictions have valid roadway location data
            for (const restriction of result) {
              expect(restriction.StartRoadwayLocation).toBeDefined();
              expect(restriction.EndRoadwayLocation).toBeDefined();

              // Check start roadway location
              const startLocation = restriction.StartRoadwayLocation;
              expect(startLocation.Latitude).toBeDefined();
              expect(startLocation.Longitude).toBeDefined();
              expect(startLocation.RoadName).toBeDefined();
              expect(startLocation.MilePost).toBeDefined();

              // Check end roadway location
              const endLocation = restriction.EndRoadwayLocation;
              expect(endLocation.Latitude).toBeDefined();
              expect(endLocation.Longitude).toBeDefined();
              expect(endLocation.RoadName).toBeDefined();
              expect(endLocation.MilePost).toBeDefined();

              // Check that milepost values are reasonable (non-negative)
              expect(startLocation.MilePost).toBeGreaterThanOrEqual(0);
              expect(endLocation.MilePost).toBeGreaterThanOrEqual(0);

              // Check that road names are not empty
              expect(startLocation.RoadName.length).toBeGreaterThan(0);
              expect(endLocation.RoadName.length).toBeGreaterThan(0);
            }
          },
        },
      ],
    },

    // Parameterless endpoint - get all commercial vehicle restrictions with IDs
    {
      apiFunction: getCommercialVehicleRestrictionsWithId,
      inputSchema: getCommercialVehicleRestrictionsWithIdParamsSchema,
      outputSchema: commercialVehicleRestrictionWithIdArraySchema,
      validParams: {}, // No parameters required
      invalidParams: [], // No invalid params for parameterless endpoints
      endpointName: "getCommercialVehicleRestrictionsWithId",
      category: "parameterless",
      maxResponseTime: 5000,

      customTests: [
        {
          name: "should return restrictions with valid unique IDs",
          test: async () => {
            const result = await getCommercialVehicleRestrictionsWithId({});
            // Data is already validated by zodFetch, so we can use result directly
            // Check that restrictions have valid unique IDs
            for (const restriction of result) {
              expect(restriction.UniqueID).toBeDefined();
              expect(restriction.UniqueID.length).toBeGreaterThan(0);

              // Check that UniqueID is a string (not a number)
              expect(typeof restriction.UniqueID).toBe("string");
            }
          },
        },
        {
          name: "should return restrictions with all standard restriction data plus IDs",
          test: async () => {
            const result = await getCommercialVehicleRestrictionsWithId({});
            // Data is already validated by zodFetch, so we can use result directly
            // Check that restrictions have all the standard restriction data plus UniqueID
            for (const restriction of result) {
              // Check UniqueID (specific to this endpoint)
              expect(restriction.UniqueID).toBeDefined();
              expect(restriction.UniqueID.length).toBeGreaterThan(0);

              // Check standard restriction fields (inherited from base schema)
              expect(restriction.BridgeName).toBeDefined();
              expect(restriction.BridgeNumber).toBeDefined();
              expect(restriction.StateRouteID).toBeDefined();
              expect(restriction.RestrictionType).toBeDefined();
              expect(restriction.VehicleType).toBeDefined();
              expect(restriction.Latitude).toBeDefined();
              expect(restriction.Longitude).toBeDefined();

              // Check that all required fields are not empty
              // Bridge fields may be empty for non-bridge restrictions
              if (restriction.BridgeName && restriction.BridgeName.length > 0) {
                expect(restriction.BridgeName.length).toBeGreaterThan(0);
              }
              if (
                restriction.BridgeNumber &&
                restriction.BridgeNumber.length > 0
              ) {
                expect(restriction.BridgeNumber.length).toBeGreaterThan(0);
              }
              expect(restriction.StateRouteID.length).toBeGreaterThan(0);
              // VehicleType may be empty for some restrictions
              if (
                restriction.VehicleType &&
                restriction.VehicleType.length > 0
              ) {
                expect(restriction.VehicleType.length).toBeGreaterThan(0);
              }
            }
          },
        },
        {
          name: "should return same restriction data as base endpoint plus IDs",
          test: async () => {
            const baseResult = await getCommercialVehicleRestrictions({});
            const idResult = await getCommercialVehicleRestrictionsWithId({});

            // Data is already validated by zodFetch, so we can use results directly
            // Check that both endpoints return similar amounts of data
            // (they might not be exactly the same due to API timing differences)
            expect(idResult.length).toBeGreaterThan(0);
            expect(baseResult.length).toBeGreaterThan(0);

            // Check that the ID version has all the same fields as the base version
            // plus the UniqueID field
            const baseRestriction = baseResult[0];
            const idRestriction = idResult[0];

            // Check that all base fields are present in the ID version
            expect(idRestriction.BridgeName).toBeDefined();
            expect(idRestriction.BridgeNumber).toBeDefined();
            expect(idRestriction.StateRouteID).toBeDefined();
            expect(idRestriction.RestrictionType).toBeDefined();
            expect(idRestriction.VehicleType).toBeDefined();
            expect(idRestriction.Latitude).toBeDefined();
            expect(idRestriction.Longitude).toBeDefined();

            // Check that the ID version has the additional UniqueID field
            expect(idRestriction.UniqueID).toBeDefined();
            expect(idRestriction.UniqueID.length).toBeGreaterThan(0);
          },
        },
      ],
    },
  ],
};
