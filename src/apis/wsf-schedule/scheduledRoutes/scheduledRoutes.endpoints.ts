import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { API } from "../apiDefinition";
import {
  scheduledRoutesByIdInputSchema,
  scheduledRoutesInputSchema,
} from "./scheduledRoutes.input";
import { schedRouteSchema } from "./scheduledRoutes.output";

export const scheduledRoutesGroup = defineEndpointGroup({
  name: "scheduled-routes",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Scheduled routes represent predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.",
    businessContext: "",
  },
});

export const fetchScheduledRoutes = defineEndpoint({
  api: API,
  group: scheduledRoutesGroup,
  functionName: "fetchScheduledRoutes",
  endpoint: "/schedroutes",
  inputSchema: scheduledRoutesInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: {},
  endpointDescription: "Returns all scheduled routes.",
});

export const fetchScheduledRoutesById = defineEndpoint({
  api: API,
  group: scheduledRoutesGroup,
  functionName: "fetchScheduledRoutesById",
  endpoint: "/schedroutes/{ScheduleID}",
  inputSchema: scheduledRoutesByIdInputSchema,
  outputSchema: schedRouteSchema.array(),
  sampleParams: { ScheduleID: 193 },
  endpointDescription: "Returns scheduled routes for specified schedule ID.",
});
