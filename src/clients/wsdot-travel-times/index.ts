import { getTravelTimeMeta } from "./getTravelTime";
import { getTravelTimesMeta } from "./getTravelTimes";
import { defineEndpoint } from "@/shared/endpoints";

export const getTravelTime = defineEndpoint(getTravelTimeMeta);
export const getTravelTimes = defineEndpoint(getTravelTimesMeta);

// Re-export input types from client files
export type { TravelTimeInput } from "./getTravelTime";
export type { TravelTimesInput } from "./getTravelTimes";
