import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate/cacheFlushDate";
import { vesselAccommodationsResource } from "./vesselAccommodations/vesselAccommodations";
import { vesselBasicsResource } from "./vesselBasics/vesselBasics";
import { vesselHistoriesResource } from "./vesselHistories/vesselHistories";
import { vesselLocationsResource } from "./vesselLocations/vesselLocations";
import { vesselStatsResource } from "./vesselStats/vesselStats";
import { vesselVerboseResource } from "./vesselVerbose/vesselVerbose";

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
