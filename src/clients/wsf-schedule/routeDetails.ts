import {
  type Annotation,
  annotationSchema,
  type RouteDetails,
  type RouteDetailsArray,
  routeDetailsArraySchema,
  routeDetailsSchema,
  type ServiceDisruption,
  serviceDisruptionSchema,
} from "@/schemas/wsf-schedule";

export { routeDetailsSchema, routeDetailsArraySchema };
export type { RouteDetails, RouteDetailsArray };

export { serviceDisruptionSchema, annotationSchema };
export type { ServiceDisruption, Annotation };
