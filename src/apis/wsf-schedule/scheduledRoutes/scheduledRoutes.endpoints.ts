import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import {
  scheduledRoutesByIdInputSchema,
  scheduledRoutesInputSchema,
} from "./scheduledRoutes.input";
import { schedRouteSchema } from "./scheduledRoutes.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "scheduled-routes",
  cacheStrategy: "STATIC",
  documentation: {
    resourceDescription:
      "Scheduled routes represent the predefined ferry routes with their associated schedule identifiers, used for organizing and retrieving sailing schedules.",
    businessContext: "",
  },
});

export const fetchScheduledRoutes = defineEndpoint({
  group,
  functionName: "fetchScheduledRoutes",
  definition: {
    endpoint: "/schedroutes",
    inputSchema: scheduledRoutesInputSchema,
    outputSchema: schedRouteSchema.array(),
    sampleParams: {},
    endpointDescription: "Returns all scheduled routes.",
  },
});

export const fetchScheduledRoutesById = defineEndpoint({
  group,
  functionName: "fetchScheduledRoutesById",
  definition: {
    endpoint: "/schedroutes/{ScheduleID}",
    inputSchema: scheduledRoutesByIdInputSchema,
    outputSchema: schedRouteSchema.array(),
    sampleParams: { ScheduleID: 193 },
    endpointDescription:
      "Returns scheduled routes for the specified schedule ID.",
  },
});

export const scheduledRoutesResource = group.descriptor;
