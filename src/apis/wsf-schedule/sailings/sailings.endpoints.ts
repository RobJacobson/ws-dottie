import { apis } from "@/apis/shared/apis";
import type { EndpointGroup } from "@/apis/types";
import { createEndpoint } from "@/shared/factories/createEndpoint";
import {
  allSailingsBySchedRouteIDInputSchema,
  sailingsByRouteIDInputSchema,
} from "./sailings.input";
import { sailingSchema } from "./sailings.output";

export const sailingsGroup: EndpointGroup = {
  name: "sailings",
  cacheStrategy: "FREQUENT",
  documentation: {
    summary: "Scheduled ferry sailings organized by route and direction.",
    description:
      "Departure times organized by direction, days of operation, and date ranges, mirroring printed PDF schedule groupings.",
    useCases: [
      "Display schedule structure with sailing groups.",
      "Show departure times by direction and day type.",
      "Access journey details with vessel assignments and terminal stops.",
    ],
    updateFrequency: "daily",
  },
};

export const fetchAllSailingsBySchedRouteID = createEndpoint({
  api: apis.wsfSchedule,
  group: sailingsGroup,
  functionName: "fetchAllSailingsBySchedRouteID",
  endpoint: "/allsailings/{SchedRouteID}",
  inputSchema: allSailingsBySchedRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription:
    "List all sailings for scheduled route including inactive sailings.",
});

export const fetchSailingsByRouteID = createEndpoint({
  api: apis.wsfSchedule,
  group: sailingsGroup,
  functionName: "fetchSailingsByRouteID",
  endpoint: "/sailings/{SchedRouteID}",
  inputSchema: sailingsByRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription: "List active sailings for specified scheduled route.",
});
