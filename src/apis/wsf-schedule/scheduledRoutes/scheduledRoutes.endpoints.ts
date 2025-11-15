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
    resourceDescription:
      "Scheduled routes represent predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.",
    businessContext: "",
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
  endpointDescription: "Returns all scheduled routes.",
});

export const fetchScheduledRoutesById = createEndpoint({
  api: apis.wsfSchedule,
  group: scheduledRoutesGroup,
  functionName: "fetchScheduledRoutesById",
  endpoint: "/schedroutes/{ScheduleID}",
  inputSchema: scheduledRoutesByIdInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: { ScheduleID: 193 },
  endpointDescription: "Returns scheduled routes for specified schedule ID.",
});
