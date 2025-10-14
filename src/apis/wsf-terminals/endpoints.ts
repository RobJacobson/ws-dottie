import type { ApiDefinition } from "@/apis/types";

// Import all resources
import { cacheFlushDateResource } from "./cacheFlushDate";
import { terminalBasicsResource } from "./terminalBasics";
import { terminalBulletinsResource } from "./terminalBulletins";
import { terminalLocationsResource } from "./terminalLocations";
import { terminalSailingSpaceResource } from "./terminalSailingSpace";
import { terminalTransportsResource } from "./terminalTransports";
import { terminalVerboseResource } from "./terminalVerbose";
import { terminalWaitTimesResource } from "./terminalWaitTimes";

// Combine all resources into the legacy format for backward compatibility
export const wsfTerminalsApi: ApiDefinition = {
  name: "wsf-terminals",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  endpoints: [
    // Flatten all endpoints from all resources
    ...Object.values(cacheFlushDateResource.endpoints),
    ...Object.values(terminalBasicsResource.endpoints),
    ...Object.values(terminalBulletinsResource.endpoints),
    ...Object.values(terminalLocationsResource.endpoints),
    ...Object.values(terminalSailingSpaceResource.endpoints),
    ...Object.values(terminalTransportsResource.endpoints),
    ...Object.values(terminalVerboseResource.endpoints),
    ...Object.values(terminalWaitTimesResource.endpoints),
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
