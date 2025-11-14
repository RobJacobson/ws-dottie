import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { cacheFlushDateTerminalsGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { terminalBasicsGroup } from "./terminalBasics/terminalBasics.endpoints";
import { terminalBulletinsGroup } from "./terminalBulletins/terminalBulletins.endpoints";
import { terminalLocationsGroup } from "./terminalLocations/terminalLocations.endpoints";
import { terminalSailingSpaceGroup } from "./terminalSailingSpace/terminalSailingSpace.endpoints";
import { terminalTransportsGroup } from "./terminalTransports/terminalTransports.endpoints";
import { terminalVerboseGroup } from "./terminalVerbose/terminalVerbose.endpoints";
import { terminalWaitTimesGroup } from "./terminalWaitTimes/terminalWaitTimes.endpoints";

export const wsfTerminalsApi = {
  api: apis.wsfTerminals,
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
