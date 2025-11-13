import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import { wsfScheduleApi } from "../apiDefinition";
import {
  allSailingsBySchedRouteIDInputSchema,
  sailingsByRouteIDInputSchema,
} from "./sailings.input";
import { sailingSchema } from "./sailings.output";

const group = defineEndpointGroup({
  api: wsfScheduleApi,
  name: "sailings",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Sailing information represents individual ferry trips with departure and arrival times, vessel assignments, and route details for scheduled ferry services.",
    businessContext: "",
  },
});

export const fetchAllSailingsBySchedRouteID = defineEndpoint({
  group,
  functionName: "fetchAllSailingsBySchedRouteID",
  definition: {
    endpoint: "/allsailings/{SchedRouteID}",
    inputSchema: allSailingsBySchedRouteIDInputSchema,
    outputSchema: sailingSchema.array(),
    sampleParams: { SchedRouteID: 2401 },
    endpointDescription:
      "Returns all sailing data for the specified scheduled route ID.",
  },
});

export const fetchSailingsByRouteID = defineEndpoint({
  group,
  functionName: "fetchSailingsByRouteID",
  definition: {
    endpoint: "/sailings/{SchedRouteID}",
    inputSchema: sailingsByRouteIDInputSchema,
    outputSchema: sailingSchema.array(),
    sampleParams: { SchedRouteID: 2401 },
    endpointDescription:
      "Returns sailing data for the specified scheduled route ID.",
  },
});

export const sailingsResource = group.descriptor;
