import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateTerminalsGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { terminalBasicsGroup } from "./terminalBasics/terminalBasics.endpoints";
import { terminalBulletinsGroup } from "./terminalBulletins/terminalBulletins.endpoints";
import { terminalLocationsGroup } from "./terminalLocations/terminalLocations.endpoints";
import { terminalSailingSpaceGroup } from "./terminalSailingSpace/terminalSailingSpace.endpoints";
import { terminalTransportsGroup } from "./terminalTransports/terminalTransports.endpoints";
import { terminalVerboseGroup } from "./terminalVerbose/terminalVerbose.endpoints";
import { terminalWaitTimesGroup } from "./terminalWaitTimes/terminalWaitTimes.endpoints";

export const wsfTerminalsApi = {
  name: "wsf-terminals",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  endpointGroups: [
    cacheFlushDateTerminalsGroup,
    terminalBasicsGroup,
    terminalBulletinsGroup,
    terminalLocationsGroup,
    terminalSailingSpaceGroup,
    terminalTransportsGroup,
    terminalVerboseGroup,
    terminalWaitTimesGroup,
  ],
} satisfies ApiDefinition;
