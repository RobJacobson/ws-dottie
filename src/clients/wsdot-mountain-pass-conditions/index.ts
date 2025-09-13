import { defineEndpoint } from "@/shared/endpoints";
import { getMountainPassConditionMeta } from "./getMountainPassCondition";
import { getMountainPassConditionsMeta } from "./getMountainPassConditions";

export const getMountainPassCondition = defineEndpoint(
  getMountainPassConditionMeta
);
export const getMountainPassConditions = defineEndpoint(
  getMountainPassConditionsMeta
);

// Re-export output types from schemas
export type {
  MountainPassConditions,
  PassCondition,
  TravelRestriction,
} from "@/schemas/wsdot-mountain-pass-conditions";
// Re-export input types from client files
export type { MountainPassConditionInput } from "./getMountainPassCondition";
export type { MountainPassConditionsInput } from "./getMountainPassConditions";
