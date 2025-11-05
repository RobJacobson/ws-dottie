// Test file to verify our API exports work correctly
import { getVesselStats, getVesselStatsByVesselId } from "./dist/apis/wsf-vessels/core.js";
import { useGetVesselStats, useGetVesselStatsByVesselId } from "./dist/apis/wsf-vessels/hooks.js";

async function testCoreFunctions() {
  console.log("Testing core functions...");
  
  try {
    // Test getVesselStats with no params
    const allVessels = await getVesselStats({
      params: {},
      fetchMode: "native",
      validate: true
    });
    console.log("All vessels count:", allVessels?.length || 0);
    
    // Test getVesselStatsByVesselId with params
    const specificVessel = await getVesselStatsByVesselId({
      params: { VesselID: 18 },
      fetchMode: "jsonp",
      validate: false
    });
    console.log("Specific vessel name:", specificVessel?.VesselName || "Not found");
    
    console.log("✅ Core functions test passed");
  } catch (error) {
    console.error("❌ Core functions test failed:", error.message);
  }
}

async function testHooks() {
  console.log("Testing hooks...");
  
  try {
    // Test useGetVesselStats with no params
    const { data: vessels, isLoading, error } = useGetVesselStats({
      params: {},
      staleTime: 5 * 60 * 1000
    });
    console.log("Loading state:", isLoading);
    console.log("Error state:", error);
    console.log("Vessels count:", vessels?.length || 0);
    
    // Test useGetVesselStatsByVesselId with params
    const { data: vessel } = useGetVesselStatsByVesselId({
      params: { VesselID: 18 },
      enabled: true
    });
    console.log("Specific vessel name:", vessel?.VesselName || "Not found");
    
    console.log("✅ Hooks test passed");
  } catch (error) {
    console.error("❌ Hooks test failed:", error.message);
  }
}

// Run tests
testCoreFunctions().then(() => {
  console.log("\nCore functions test completed");
}).catch((error) => {
  console.error("Core functions test error:", error);
});

testHooks().then(() => {
  console.log("\nHooks test completed");
}).catch((error) => {
  console.error("Hooks test error:", error);
});
