import type { ApiDefinition, ApiMetadata } from "@/apis/types";

// Export API metadata FIRST (before importing groups)
// This allows endpoint files to import API without circular dependency
export const API: ApiMetadata = {
  name: "wsf-terminals",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
} as const;

// THEN import groups (which can use API constant)
import { cacheFlushDateTerminalsGroup } from "./cacheFlushDate/cacheFlushDate.endpoints";
import { terminalBasicsGroup } from "./terminalBasics/terminalBasics.endpoints";
import { terminalBulletinsGroup } from "./terminalBulletins/terminalBulletins.endpoints";
import { terminalLocationsGroup } from "./terminalLocations/terminalLocations.endpoints";
import { terminalSailingSpaceGroup } from "./terminalSailingSpace/terminalSailingSpace.endpoints";
import { terminalTransportsGroup } from "./terminalTransports/terminalTransports.endpoints";
import { terminalVerboseGroup } from "./terminalVerbose/terminalVerbose.endpoints";
import { terminalWaitTimesGroup } from "./terminalWaitTimes/terminalWaitTimes.endpoints";

// Finally, construct full API definition using API constant
export const wsfTerminalsApi = {
  name: API.name,
  baseUrl: API.baseUrl,
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
