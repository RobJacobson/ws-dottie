import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsf-vessels",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
} as const;

// THEN import groups (which can use API constant)
import { cacheFlushDateVesselsGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { vesselAccommodationsGroup } from "./vesselAccommodations/vesselAccommodations.endpoints";
import { vesselBasicsGroup } from "./vesselBasics/vesselBasics.endpoints";
import { vesselHistoriesGroup } from "./vesselHistories/vesselHistories.endpoints";
import { vesselLocationsGroup } from "./vesselLocations/vesselLocations.endpoints";
import { vesselStatsGroup } from "./vesselStats/vesselStats.endpoints";
import { vesselVerboseGroup } from "./vesselVerbose/vesselVerbose.endpoints";

// Finally, construct full API definition using API constant
export const wsfVesselsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
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
