import { routesArraySchema, type RoutesArray } from "@/schemas/wsf-schedule";
import {
  routesWithServiceDisruptionsArraySchema,
  type RoutesWithServiceDisruptions,
  type RoutesWithServiceDisruptionsArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Output Schemas & Types
//
// routeSchema (imported from route.zod)
// routesArraySchema (imported from route.zod)
// Route (imported from route.zod)
// routesWithServiceDisruptionsSchema (imported from routesWithServiceDisruptions.zod)
// routesWithServiceDisruptionsArraySchema (imported from routesWithServiceDisruptions.zod)
// RoutesWithServiceDisruptions (imported from routesWithServiceDisruptions.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { routesArraySchema, routesWithServiceDisruptionsArraySchema };
export type Routes = RoutesArray;
export type RouteWithDisruptions = RoutesWithServiceDisruptions;
export type RoutesWithDisruptions = RoutesWithServiceDisruptionsArray;
