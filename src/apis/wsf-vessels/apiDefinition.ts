import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate/cacheFlushDate";
import { vesselAccommodationsResource } from "./vesselAccommodations/vesselAccommodations";
import { vesselBasicsResource } from "./vesselBasics/vesselBasics";
import { vesselHistoriesResource } from "./vesselHistories/vesselHistories";
import { vesselLocationsResource } from "./vesselLocations/vesselLocations";
import { vesselStatsResource } from "./vesselStats/vesselStats";
import { vesselVerboseResource } from "./vesselVerbose/vesselVerbose";

export const wsfVesselsApi: ApiDefinition = {
  name: "wsf-vessels",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  endpointGroups: [
    cacheFlushDateResource,
    vesselAccommodationsResource,
    vesselBasicsResource,
    vesselHistoriesResource,
    vesselLocationsResource,
    vesselStatsResource,
    vesselVerboseResource,
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
