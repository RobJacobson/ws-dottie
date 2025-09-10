export * from "./cacheFlushDate";
export * from "./terminalBasics";
export * from "./terminalBasicsById";
export * from "./terminalBulletins";
export * from "./terminalBulletinsById";
export * from "./terminalLocations";
export * from "./terminalLocationsById";
export * from "./terminalSailingSpace";
export * from "./terminalSailingSpaceById";
export * from "./terminalTransports";
export * from "./terminalTransportsById";
export * from "./terminalVerbose";
export * from "./terminalVerboseById";
export * from "./terminalWaitTimes";
export * from "./terminalWaitTimesById";

// Re-export output types from schemas
export type {
  TerminalBasics,
  TerminalBasicsArray,
  TerminalBulletins,
  TerminalBulletinsArray,
  TerminalLocation,
  TerminalLocationArray,
  TerminalSailingSpace,
  TerminalSailingSpaceArray,
  TerminalTransports,
  TerminalTransportsArray,
  TerminalVerbose,
  TerminalVerboseArray,
  TerminalWaitTimes,
  TerminalWaitTimesArray,
  Bulletin,
  WaitTime,
  DepartingSpace,
  Terminal,
  TransitLink,
  SpaceForArrivalTerminal,
  DispGISZoomLoc,
} from "@/schemas/wsf-terminals";
