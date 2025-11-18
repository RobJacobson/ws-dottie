import type { ApiDefinition } from "@/apis/types";
import { cacheFlushDateVesselsGroup } from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
import { vesselAccommodationsGroup } from "./vesselAccommodations/shared/vesselAccommodations.endpoints";
import { vesselBasicsGroup } from "./vesselBasics/shared/vesselBasics.endpoints";
import { vesselHistoriesGroup } from "./vesselHistories/shared/vesselHistories.endpoints";
import { vesselLocationsGroup } from "./vesselLocations/shared/vesselLocations.endpoints";
import { vesselStatsGroup } from "./vesselStats/shared/vesselStats.endpoints";
import { vesselVerboseGroup } from "./vesselVerbose/shared/vesselVerbose.endpoints";

export const wsfVesselsApi: ApiDefinition = {
  api: {
    name: "wsf-vessels",
    baseUrl: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  },
  endpointGroups: [
    cacheFlushDateVesselsGroup,
    vesselAccommodationsGroup,
    vesselBasicsGroup,
    vesselHistoriesGroup,
    vesselLocationsGroup,
    vesselStatsGroup,
    vesselVerboseGroup,
  ],
};
