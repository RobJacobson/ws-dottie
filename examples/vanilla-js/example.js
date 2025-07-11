// Vanilla JavaScript example using WSDOT API client

import {
  getFaresTerminals,
  getScheduleRoutes,
  getVesselLocations,
} from "wsdot-api-client";

// No client creation needed - functions work directly!

// Example: Get routes for today
const getRoutesForToday = async () => {
  try {
    const routes = await getScheduleRoutes(new Date());
    console.log("Routes for today:", routes);
    return routes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    return [];
  }
};

// Example: Get vessel locations
const fetchVesselLocations = async () => {
  try {
    const vessels = await getVesselLocations();
    console.log("Vessel locations:", vessels);
    return vessels;
  } catch (error) {
    console.error("Error fetching vessel locations:", error);
    return [];
  }
};

// Example: Get terminals
const getTerminals = async () => {
  try {
    const terminals = await getFaresTerminals();
    console.log("Terminals:", terminals);
    return terminals;
  } catch (error) {
    console.error("Error fetching terminals:", error);
    return [];
  }
};

// Run examples
const runExamples = async () => {
  console.log("=== WSDOT API Client Examples ===");

  await getRoutesForToday();
  await fetchVesselLocations();
  await getTerminals();
};

// Export for use in other modules
export { getRoutesForToday, fetchVesselLocations, getTerminals, runExamples };
