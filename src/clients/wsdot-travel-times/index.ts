export * from "./getTravelTime";
export * from "./getTravelTimes";

// Re-export output types from schemas
export type {
  TravelTimeRoute,
  TravelTimes,
} from "@/schemas/wsdot-travel-times";
