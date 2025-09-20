import { defineEndpoint } from "@/shared/endpoints";
import { getTollRatesMeta } from "./getTollRates";
import { getTollTripInfoMeta } from "./getTollTripInfo";
import { getTollTripRatesMeta } from "./getTollTripRates";
import { getTollTripVersionMeta } from "./getTollTripVersion";
import { getTripRatesByDateMeta } from "./getTripRatesByDate";
import { getTripRatesByVersionMeta } from "./getTripRatesByVersion";

export const getTollRates = defineEndpoint(getTollRatesMeta);
export const getTollTripInfo = defineEndpoint(getTollTripInfoMeta);
export const getTollTripRates = defineEndpoint(getTollTripRatesMeta);
export const getTollTripVersion = defineEndpoint(getTollTripVersionMeta);
export const getTripRatesByDate = defineEndpoint(getTripRatesByDateMeta);
export const getTripRatesByVersion = defineEndpoint(getTripRatesByVersionMeta);

// Re-export input types from client files
export type { TollRatesInput } from "./getTollRates";
export type { TollTripInfoInput } from "./getTollTripInfo";
export type { TollTripRatesInput } from "./getTollTripRates";
export type { TollTripVersionInput } from "./getTollTripVersion";
export type { TripRatesByDateInput } from "./getTripRatesByDate";
export type { TripRatesByVersionInput } from "./getTripRatesByVersion";
