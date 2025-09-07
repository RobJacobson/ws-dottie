import {
  type RoutesArray,
  type RoutesWithServiceDisruptions,
  type RoutesWithServiceDisruptionsArray,
  routesArraySchema,
  routesWithServiceDisruptionsArraySchema,
} from "@/schemas/wsf-schedule";

export { routesArraySchema, routesWithServiceDisruptionsArraySchema };
export type Routes = RoutesArray;
export type RouteWithDisruptions = RoutesWithServiceDisruptions;
