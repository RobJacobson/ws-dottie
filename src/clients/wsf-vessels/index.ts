import { defineEndpoint } from "@/shared/endpoints";
import { getCacheFlushDateVesselsMeta } from "./cacheFlushDate";
import { getVesselAccommodationsMeta } from "./vesselAccommodations";
import { getVesselAccommodationsByIdMeta } from "./vesselAccommodationsById";
import { getVesselBasicsMeta } from "./vesselBasics";
import { getVesselBasicsByIdMeta } from "./vesselBasicsById";
import { getVesselHistoryMeta } from "./vesselHistory";
import { getVesselHistoryByVesselAndDateRangeMeta } from "./vesselHistoryByVesselAndDateRange";
import { getVesselLocationsMeta } from "./vesselLocations";
import { getVesselLocationsByVesselIdMeta } from "./vesselLocationsById";
import { getVesselStatsMeta } from "./vesselStats";
import { getVesselStatsByIdMeta } from "./vesselStatsById";
import { getVesselVerboseMeta } from "./vesselVerbose";
import { getVesselVerboseByIdMeta } from "./vesselVerboseById";

export const getVesselsCacheFlushDate = defineEndpoint(
  getCacheFlushDateVesselsMeta
);
export const vesselAccommodations = defineEndpoint(getVesselAccommodationsMeta);
export const vesselAccommodationsById = defineEndpoint(
  getVesselAccommodationsByIdMeta
);
export const vesselBasics = defineEndpoint(getVesselBasicsMeta);
export const vesselBasicsById = defineEndpoint(getVesselBasicsByIdMeta);
export const vesselHistory = defineEndpoint(getVesselHistoryMeta);
export const vesselHistoryByVesselAndDateRange = defineEndpoint(
  getVesselHistoryByVesselAndDateRangeMeta
);
export const vesselLocations = defineEndpoint(getVesselLocationsMeta);
export const vesselLocationsById = defineEndpoint(
  getVesselLocationsByVesselIdMeta
);
export const vesselStats = defineEndpoint(getVesselStatsMeta);
export const vesselStatsById = defineEndpoint(getVesselStatsByIdMeta);
export const vesselVerbose = defineEndpoint(getVesselVerboseMeta);
export const vesselVerboseById = defineEndpoint(getVesselVerboseByIdMeta);

// Re-export input types from client files
export type { CacheFlushDateVesselsInput } from "./cacheFlushDate";
export type { VesselAccommodationsInput } from "./vesselAccommodations";
export type { VesselAccommodationsByIdInput } from "./vesselAccommodationsById";
export type { VesselBasicsInput } from "./vesselBasics";
export type { VesselBasicsByIdInput } from "./vesselBasicsById";
export type { VesselHistoryInput } from "./vesselHistory";
export type { VesselHistoryByVesselAndDateRangeInput } from "./vesselHistoryByVesselAndDateRange";
export type { VesselLocationsInput } from "./vesselLocations";
export type { VesselLocationsByVesselIdInput } from "./vesselLocationsById";
export type { VesselStatsInput } from "./vesselStats";
export type { VesselStatsByIdInput } from "./vesselStatsById";
export type { VesselVerboseInput } from "./vesselVerbose";
export type { VesselVerboseByIdInput } from "./vesselVerboseById";
