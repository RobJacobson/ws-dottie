import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { vesselAccommodationsResource } from "./vesselAccommodations/vesselAccommodations.endpoints";
import { vesselBasicsResource } from "./vesselBasics/vesselBasics.endpoints";
import { vesselHistoriesResource } from "./vesselHistories/vesselHistories.endpoints";
import { vesselLocationsGroup } from "./vesselLocations/vesselLocations.endpoints";
import { vesselStatsResource } from "./vesselStats/vesselStats.endpoints";
import { vesselVerboseResource } from "./vesselVerbose/vesselVerbose.endpoints";

export const wsfVesselsApi: ApiDefinition = {
  name: "wsf-vessels",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  endpointGroups: [
    cacheFlushDateResource,
    vesselAccommodationsResource,
    vesselBasicsResource,
    vesselHistoriesResource,
    vesselLocationsGroup,
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
  vesselLocationsGroup,
  vesselStatsResource,
  vesselVerboseResource,
};
