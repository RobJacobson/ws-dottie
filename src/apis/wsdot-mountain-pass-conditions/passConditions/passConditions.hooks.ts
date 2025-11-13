import {
  fetchMountainPassConditionById,
  fetchMountainPassConditions,
} from "./passConditions.endpoints";

export const useMountainPassConditionById =
  fetchMountainPassConditionById.useQuery;

export const useMountainPassConditions =
  fetchMountainPassConditions.useQuery;
