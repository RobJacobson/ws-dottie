import type { ApiDefinition } from "@/apis/types";
import { wsfTerminalsApiMeta } from "./apiMeta";
import { cacheFlushDateTerminalsGroup } from "./cacheFlushDate/shared/cacheFlushDate.endpoints";
import { terminalBasicsGroup } from "./terminalBasics/shared/terminalBasics.endpoints";
import { terminalBulletinsGroup } from "./terminalBulletins/shared/terminalBulletins.endpoints";
import { terminalLocationsGroup } from "./terminalLocations/shared/terminalLocations.endpoints";
import { terminalSailingSpaceGroup } from "./terminalSailingSpace/shared/terminalSailingSpace.endpoints";
import { terminalTransportsGroup } from "./terminalTransports/shared/terminalTransports.endpoints";
import { terminalVerboseGroup } from "./terminalVerbose/shared/terminalVerbose.endpoints";
import { terminalWaitTimesGroup } from "./terminalWaitTimes/shared/terminalWaitTimes.endpoints";

export const wsfTerminals: ApiDefinition = {
  api: wsfTerminalsApiMeta,
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
};
