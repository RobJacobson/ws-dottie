import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { cacheFlushDateVesselsGroup } from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
import { vesselAccommodationsGroup } from "./vesselAccommodations/shared/vesselAccommodations.endpoints";
import { vesselBasicsGroup } from "./vesselBasics/shared/vesselBasics.endpoints";
import { vesselHistoriesGroup } from "./vesselHistories/shared/vesselHistories.endpoints";
import { vesselLocationsGroup } from "./vesselLocations/shared/vesselLocations.endpoints";
import { vesselStatsGroup } from "./vesselStats/shared/vesselStats.endpoints";
import { vesselVerboseGroup } from "./vesselVerbose/shared/vesselVerbose.endpoints";

export const wsfVesselsApi = {
  api: apis.wsfVessels,
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
