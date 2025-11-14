import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateVesselsGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { vesselAccommodationsGroup } from "./vesselAccommodations/vesselAccommodations.endpoints";
import { vesselBasicsGroup } from "./vesselBasics/vesselBasics.endpoints";
import { vesselHistoriesGroup } from "./vesselHistories/vesselHistories.endpoints";
import { vesselLocationsGroup } from "./vesselLocations/vesselLocations.endpoints";
import { vesselStatsGroup } from "./vesselStats/vesselStats.endpoints";
import { vesselVerboseGroup } from "./vesselVerbose/vesselVerbose.endpoints";

export const wsfVesselsApi = {
  name: "wsf-vessels",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  endpointGroups: [
    cacheFlushDateVesselsGroup,
    vesselAccommodationsGroup,
    vesselBasicsGroup,
    vesselHistoriesGroup,
    vesselLocationsGroup,
    vesselStatsGroup,
    vesselVerboseGroup,
  ],
} satisfies ApiDefinition;
