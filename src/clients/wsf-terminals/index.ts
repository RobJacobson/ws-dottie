import { defineEndpoint } from "@/shared/endpoints";
import { getCacheFlushDateTerminalsMeta } from "./cacheFlushDate";
import { getTerminalBasicsMeta } from "./terminalBasics";
import { getTerminalBasicsByTerminalIdMeta } from "./terminalBasicsById";
import { getTerminalBulletinsMeta } from "./terminalBulletins";
import { getTerminalBulletinsByTerminalIdMeta } from "./terminalBulletinsById";
import { getTerminalLocationsMeta } from "./terminalLocations";
import { getTerminalLocationsByTerminalIdMeta } from "./terminalLocationsById";
import { getTerminalSailingSpaceMeta } from "./terminalSailingSpace";
import { getTerminalSailingSpaceByTerminalIdMeta } from "./terminalSailingSpaceById";
import { getTerminalTransportsMeta } from "./terminalTransports";
import { getTerminalTransportsByTerminalIdMeta } from "./terminalTransportsById";
import { getTerminalVerboseMeta } from "./terminalVerbose";
import { getTerminalVerboseByTerminalIdMeta } from "./terminalVerboseById";
import { getTerminalWaitTimesMeta } from "./terminalWaitTimes";
import { getTerminalWaitTimesByTerminalIdMeta } from "./terminalWaitTimesById";

export const getTerminalsCacheFlushDate = defineEndpoint(
  getCacheFlushDateTerminalsMeta
);
export const terminalBasics = defineEndpoint(getTerminalBasicsMeta);
export const terminalBasicsById = defineEndpoint(
  getTerminalBasicsByTerminalIdMeta
);
export const terminalBulletins = defineEndpoint(getTerminalBulletinsMeta);
export const terminalBulletinsById = defineEndpoint(
  getTerminalBulletinsByTerminalIdMeta
);
export const terminalLocations = defineEndpoint(getTerminalLocationsMeta);
export const terminalLocationsById = defineEndpoint(
  getTerminalLocationsByTerminalIdMeta
);
export const terminalSailingSpace = defineEndpoint(getTerminalSailingSpaceMeta);
export const terminalSailingSpaceById = defineEndpoint(
  getTerminalSailingSpaceByTerminalIdMeta
);
export const terminalTransports = defineEndpoint(getTerminalTransportsMeta);
export const terminalTransportsById = defineEndpoint(
  getTerminalTransportsByTerminalIdMeta
);
export const terminalVerbose = defineEndpoint(getTerminalVerboseMeta);
export const terminalVerboseById = defineEndpoint(
  getTerminalVerboseByTerminalIdMeta
);
export const terminalWaitTimes = defineEndpoint(getTerminalWaitTimesMeta);
export const terminalWaitTimesById = defineEndpoint(
  getTerminalWaitTimesByTerminalIdMeta
);

// Re-export input types from client files
export type { CacheFlushDateTerminalsInput } from "./cacheFlushDate";
export type { TerminalBasicsInput } from "./terminalBasics";
export type { TerminalBasicsByTerminalIdInput } from "./terminalBasicsById";
export type { TerminalBulletinsInput } from "./terminalBulletins";
export type { TerminalBulletinsByTerminalIdInput } from "./terminalBulletinsById";
export type { TerminalLocationsInput } from "./terminalLocations";
export type { TerminalLocationsByTerminalIdInput } from "./terminalLocationsById";
export type { TerminalSailingSpaceInput } from "./terminalSailingSpace";
export type { TerminalSailingSpaceByTerminalIdInput } from "./terminalSailingSpaceById";
export type { TerminalTransportsInput } from "./terminalTransports";
export type { TerminalTransportsByTerminalIdInput } from "./terminalTransportsById";
export type { TerminalVerboseInput } from "./terminalVerbose";
export type { TerminalVerboseByTerminalIdInput } from "./terminalVerboseById";
export type { TerminalWaitTimesInput } from "./terminalWaitTimes";
export type { TerminalWaitTimesByTerminalIdInput } from "./terminalWaitTimesById";
