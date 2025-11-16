import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  scheduledRoutesByIdInputSchema,
  scheduledRoutesInputSchema,
} from "./scheduledRoutes.input";
import { schedRouteSchema } from "./scheduledRoutes.output";

export const scheduledRoutesGroup: EndpointGroup = {
  name: "scheduled-routes",
  cacheStrategy: "STATIC",
  documentation: {
    summary: "Ferry routes active for specific schedule seasons.",
    description:
      "Predefined routes with schedule identifiers, contingency adjustments, and service disruptions. Routes must be scheduled to run during a season to be included. Use the cacheFlushDate endpoint for this API to determine when to invalidate cached data for this group.",
    useCases: [
      "Discover routes active for a specific schedule season.",
      "Filter routes by season using schedule IDs.",
      "Identify contingency routes and service disruptions.",
    ],
  },
};

export const fetchScheduledRoutes = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduledRoutesGroup,
  functionName: "fetchScheduledRoutes",
  endpoint: "/schedroutes",
  inputSchema: scheduledRoutesInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List all scheduled routes across current and upcoming seasons.",
});

export const fetchScheduledRoutesById = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduledRoutesGroup,
  functionName: "fetchScheduledRoutesById",
  endpoint: "/schedroutes/{ScheduleID}",
  inputSchema: scheduledRoutesByIdInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: { ScheduleID: 193 },
  endpointDescription: "List scheduled routes for a specific schedule season.",
});
