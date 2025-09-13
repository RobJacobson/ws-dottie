import { defineEndpoint } from "@/shared/endpoints";
import { getTravelTimeMeta } from "./getTravelTime";
import { getTravelTimesMeta } from "./getTravelTimes";

export const getTravelTime = defineEndpoint(getTravelTimeMeta);
export const getTravelTimes = defineEndpoint(getTravelTimesMeta);

// Re-export output types from schemas
export type {
  TravelTimeRoute,
  TravelTimes,
} from "@/schemas/wsdot-travel-times";
// Re-export input types from client files
export type { TravelTimeInput } from "./getTravelTime";
export type { TravelTimesInput } from "./getTravelTimes";
