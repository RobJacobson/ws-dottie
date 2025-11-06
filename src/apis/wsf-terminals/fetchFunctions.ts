import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsfTerminalsApi } from "./apiDefinition";

export const {
  fetchCacheFlushDate,
  fetchTerminalBasics,
  fetchTerminalBasicsByTerminalId,
  fetchTerminalBulletins,
  fetchTerminalBulletinsByTerminalId,
  fetchTerminalLocations,
  fetchTerminalLocationsByTerminalId,
  fetchTerminalSailingSpace,
  fetchTerminalSailingSpaceByTerminalId,
  fetchTerminalTransports,
  fetchTerminalTransportsByTerminalId,
  fetchTerminalVerbose,
  fetchTerminalVerboseByTerminalId,
  fetchTerminalWaitTimes,
  fetchTerminalWaitTimesByTerminalId,
} = createFetchFunctions(wsfTerminalsApi);
