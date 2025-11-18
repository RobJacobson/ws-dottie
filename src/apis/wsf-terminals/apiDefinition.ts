import type { ApiDefinition } from "@/apis/shared/apis";
import { apis } from "@/apis/shared/apis";
import { cacheFlushDateTerminalsGroup } from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
import { terminalBasicsGroup } from "./terminalBasics/shared/terminalBasics.endpoints";
import { terminalBulletinsGroup } from "./terminalBulletins/shared/terminalBulletins.endpoints";
import { terminalLocationsGroup } from "./terminalLocations/shared/terminalLocations.endpoints";
import { terminalSailingSpaceGroup } from "./terminalSailingSpace/shared/terminalSailingSpace.endpoints";
import { terminalTransportsGroup } from "./terminalTransports/shared/terminalTransports.endpoints";
import { terminalVerboseGroup } from "./terminalVerbose/shared/terminalVerbose.endpoints";
import { terminalWaitTimesGroup } from "./terminalWaitTimes/shared/terminalWaitTimes.endpoints";

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
