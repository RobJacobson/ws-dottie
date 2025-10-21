import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate/cacheFlushDate";
import { terminalBasicsResource } from "./terminalBasics/terminalBasics";
import { terminalBulletinsResource } from "./terminalBulletins/terminalBulletins";
import { terminalLocationsResource } from "./terminalLocations/terminalLocations";
import { terminalSailingSpaceResource } from "./terminalSailingSpace/terminalSailingSpace";
import { terminalTransportsResource } from "./terminalTransports/terminalTransports";
import { terminalVerboseResource } from "./terminalVerbose/terminalVerbose";
import { terminalWaitTimesResource } from "./terminalWaitTimes/terminalWaitTimes";

export const wsfTerminalsApi: ApiDefinition = {
  name: "wsf-terminals",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  endpointGroups: [
    cacheFlushDateResource,
    terminalBasicsResource,
    terminalBulletinsResource,
    terminalLocationsResource,
    terminalSailingSpaceResource,
    terminalTransportsResource,
    terminalVerboseResource,
    terminalWaitTimesResource,
  ],
};

// Export individual resources for direct use
export {
  cacheFlushDateResource,
  terminalBasicsResource,
  terminalBulletinsResource,
  terminalLocationsResource,
  terminalSailingSpaceResource,
  terminalTransportsResource,
  terminalVerboseResource,
  terminalWaitTimesResource,
};
