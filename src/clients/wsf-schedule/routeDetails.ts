import {
  routeDetailsSchema,
  routeDetailsArraySchema,
  type RouteDetails,
  type RouteDetailsArray,
} from "@/schemas/wsf-schedule";
import {
  serviceDisruptionSchema,
  type ServiceDisruption,
} from "@/schemas/wsf-schedule";
import { annotationSchema, type Annotation } from "@/schemas/wsf-schedule";

// ============================================================================
// Output Schemas & Types
//
// routeDetailsSchema (imported from routeDetails.zod)
// routeDetailsArraySchema (imported from routeDetails.zod)
// RouteDetails (imported from routeDetails.zod)
// RouteDetailsArray (imported from routeDetails.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { routeDetailsSchema, routeDetailsArraySchema };
export type { RouteDetails, RouteDetailsArray };

// Re-export schemas and types for convenience
export { serviceDisruptionSchema, annotationSchema };
export type { ServiceDisruption, Annotation };
