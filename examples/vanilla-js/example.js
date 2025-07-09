// Vanilla JavaScript example using WSDOT API client

import { createWsdotClient } from "wsdot-api-client";

// Create client instance
const wsdotClient = createWsdotClient({
  apiKey: "your-api-key-here",
  timeout: 15000,
  logLevel: "info",
});

// Example: Get routes for today
const getRoutesForToday = async () => {
  try {
    const routes = await wsdotClient.wsf.schedule.getRoutes(new Date());
    console.log("Routes for today:", routes);
    return routes;
  } catch (error) {
    console.error("Error fetching routes:", error);
    return [];
  }
};

// Example: Get vessel locations
const getVesselLocations = async () => {
  try {
    const vessels = await wsdotClient.wsf.vessels.getVesselLocations();
    console.log("Vessel locations:", vessels);
    return vessels;
  } catch (error) {
    console.error("Error fetching vessel locations:", error);
    return [];
  }
};

// Example: Get vessel watch (real-time status)
const getVesselWatch = async () => {
  try {
    const vessels = await wsdotClient.wsf.vessels.getVesselWatch();
    console.log("Vessel watch:", vessels);
    return vessels;
  } catch (error) {
    console.error("Error fetching vessel watch:", error);
    return [];
  }
};

// Example: Get vessel watch verbose (detailed real-time status)
const getVesselWatchVerbose = async () => {
  try {
    const vessels = await wsdotClient.wsf.vessels.getVesselWatchVerbose();
    console.log("Vessel watch verbose:", vessels);
    return vessels;
  } catch (error) {
    console.error("Error fetching vessel watch verbose:", error);
    return [];
  }
};

// Example: Get vessel watch verbose by specific vessel
const getVesselWatchVerboseByVessel = async (vesselId) => {
  try {
    const vessels =
      await wsdotClient.wsf.vessels.getVesselWatchVerboseByVessel(vesselId);
    console.log(`Vessel watch verbose for vessel ${vesselId}:`, vessels);
    return vessels;
  } catch (error) {
    console.error("Error fetching vessel watch verbose by vessel:", error);
    return [];
  }
};

// Example: Get vessel watch verbose by route and date
const getVesselWatchVerboseByRouteAndDate = async (routeId, date) => {
  try {
    const vessels =
      await wsdotClient.wsf.vessels.getVesselWatchVerboseByRouteAndDate({
        routeId,
        date: new Date(date),
      });
    console.log(
      `Vessel watch verbose for route ${routeId} on ${date}:`,
      vessels
    );
    return vessels;
  } catch (error) {
    console.error(
      "Error fetching vessel watch verbose by route and date:",
      error
    );
    return [];
  }
};

// Example: Get routes between specific terminals
const getRoutesByTerminals = async () => {
  try {
    const routes = await wsdotClient.wsf.schedule.getRoutesByTerminals({
      tripDate: new Date(),
      departingTerminalId: 1,
      arrivingTerminalId: 2,
    });
    console.log("Routes between terminals:", routes);
    return routes;
  } catch (error) {
    console.error("Error fetching routes by terminals:", error);
    return [];
  }
};

// Example: Get highway cameras
const getHighwayCameras = async () => {
  try {
    const cameras = await wsdotClient.wsdot.traffic.getHighwayCameras();
    console.log("Highway cameras:", cameras);
    return cameras;
  } catch (error) {
    console.error("Error fetching highway cameras:", error);
    return [];
  }
};

// Example: Get traffic flow
const getTrafficFlow = async () => {
  try {
    const traffic = await wsdotClient.wsdot.traffic.getTrafficFlow();
    console.log("Traffic flow:", traffic);
    return traffic;
  } catch (error) {
    console.error("Error fetching traffic flow:", error);
    return [];
  }
};

// Run examples
const runExamples = async () => {
  console.log("=== WSDOT API Client Examples ===");

  await getRoutesForToday();
  await getVesselLocations();
  await getVesselWatch();
  await getVesselWatchVerbose();
  await getVesselWatchVerboseByVessel(1); // Example vessel ID
  await getVesselWatchVerboseByRouteAndDate(1, "2024-01-15"); // Example route ID and date
  await getRoutesByTerminals();
  await getHighwayCameras();
  await getTrafficFlow();
};

// Export for use in other modules
export {
  wsdotClient,
  getRoutesForToday,
  getVesselLocations,
  getVesselWatch,
  getVesselWatchVerbose,
  getVesselWatchVerboseByVessel,
  getVesselWatchVerboseByRouteAndDate,
  getRoutesByTerminals,
  getHighwayCameras,
  getTrafficFlow,
  runExamples,
};
