// WSDOT Mountain Pass Conditions API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___mountain_pass.html
// API Help: https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching";

import { getMountainPassConditionById, getMountainPassConditions } from "./api";
import type {
  MountainPassCondition,
  MountainPassConditionsResponse,
} from "./types";

/**
 * React Query hook for retrieving all mountain pass conditions
 *
 * @returns React Query result containing mountain pass conditions data
 *
 * @example
 * ```typescript
 * const { data: conditions, isLoading, error } = useMountainPassConditions();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {conditions?.map(condition => (
 *       <div key={condition.MountainPassId}>
 *         {condition.MountainPassName}: {condition.RoadCondition}
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useMountainPassConditions = () => {
  return useQuery<MountainPassConditionsResponse>({
    queryKey: ["mountainPassConditions"],
    queryFn: getMountainPassConditions,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * React Query hook for retrieving a specific mountain pass condition by ID
 * Note: This endpoint may not work as expected based on testing
 *
 * @param passConditionId - The ID of the specific mountain pass condition
 * @returns React Query result containing mountain pass condition data
 *
 * @example
 * ```typescript
 * const { data: condition, isLoading, error } = useMountainPassConditionById(1);
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <h2>{condition?.MountainPassName}</h2>
 *     <p>Temperature: {condition?.TemperatureInFahrenheit}°F</p>
 *     <p>Road Condition: {condition?.RoadCondition}</p>
 *   </div>
 * );
 * ```
 */
export const useMountainPassConditionById = (passConditionId: number) => {
  return useQuery<MountainPassCondition>({
    queryKey: ["mountainPassCondition", passConditionId],
    queryFn: () => getMountainPassConditionById(passConditionId),
    ...createInfrequentUpdateOptions(),
    enabled: passConditionId > 0,
  });
};
