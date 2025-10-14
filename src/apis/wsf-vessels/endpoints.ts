import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate";
import { vesselAccommodationsResource } from "./vesselAccommodations";
import { vesselBasicsResource } from "./vesselBasics";
import { vesselHistoriesResource } from "./vesselHistories";
import { vesselLocationsResource } from "./vesselLocations";
import { vesselStatsResource } from "./vesselStats";
import { vesselVerboseResource } from "./vesselVerbose";

// Combine all resources into the legacy format for backward compatibility
export const wsfVesselsApi: ApiDefinition = {
  name: "wsf-vessels",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(cacheFlushDateResource.endpoints),
    ...Object.values(vesselAccommodationsResource.endpoints),
    ...Object.values(vesselBasicsResource.endpoints),
    ...Object.values(vesselHistoriesResource.endpoints),
    ...Object.values(vesselLocationsResource.endpoints),
    ...Object.values(vesselStatsResource.endpoints),
    ...Object.values(vesselVerboseResource.endpoints),
  ],
};

// Export individual resources for direct use
export {
  cacheFlushDateResource,
  vesselAccommodationsResource,
  vesselBasicsResource,
  vesselHistoriesResource,
  vesselLocationsResource,
  vesselStatsResource,
  vesselVerboseResource,
};
