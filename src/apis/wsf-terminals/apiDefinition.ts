import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateTerminalsResource } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { terminalBasicsResource } from "./terminalBasics/terminalBasics.endpoints";
import { terminalBulletinsResource } from "./terminalBulletins/terminalBulletins.endpoints";
import { terminalLocationsResource } from "./terminalLocations/terminalLocations.endpoints";
import { terminalSailingSpaceResource } from "./terminalSailingSpace/terminalSailingSpace.endpoints";
import { terminalTransportsResource } from "./terminalTransports/terminalTransports.endpoints";
import { terminalVerboseResource } from "./terminalVerbose/terminalVerbose.endpoints";
import { terminalWaitTimesResource } from "./terminalWaitTimes/terminalWaitTimes.endpoints";

export const wsfTerminalsApi = {
  name: "wsf-terminals",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  endpointGroups: [
    cacheFlushDateTerminalsResource,
    terminalBasicsResource,
    terminalBulletinsResource,
    terminalLocationsResource,
    terminalSailingSpaceResource,
    terminalTransportsResource,
    terminalVerboseResource,
    terminalWaitTimesResource,
  ],
} satisfies ApiDefinition;
