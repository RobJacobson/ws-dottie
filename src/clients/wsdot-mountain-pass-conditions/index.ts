import { getMountainPassConditionMeta } from "./getMountainPassCondition";
import { getMountainPassConditionsMeta } from "./getMountainPassConditions";
import { defineEndpoint } from "@/shared/endpoints";

export const getMountainPassCondition = defineEndpoint(
  getMountainPassConditionMeta
);
export const getMountainPassConditions = defineEndpoint(
  getMountainPassConditionsMeta
);

// Re-export input types from client files
export type { MountainPassConditionInput } from "./getMountainPassCondition";
export type { MountainPassConditionsInput } from "./getMountainPassConditions";
