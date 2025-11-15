import { apis } from "@/apis/shared/apis";
import { defineEndpoint } from "@/shared/factories/defineEndpoint";
import { defineEndpointGroup } from "@/shared/factories/defineEndpointGroup";
import {
  allSailingsBySchedRouteIDInputSchema,
  sailingsByRouteIDInputSchema,
} from "./sailings.input";
import { sailingSchema } from "./sailings.output";

export const sailingsGroup = defineEndpointGroup({
  name: "sailings",
  cacheStrategy: "FREQUENT",
  documentation: {
    resourceDescription:
      "Sailing information represents individual ferry trips with departure and arrival times, vessel assignments, and route details for scheduled ferry services.",
    businessContext: "",
  },
});

export const fetchAllSailingsBySchedRouteID = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: sailingsGroup,
  functionName: "fetchAllSailingsBySchedRouteID",
  endpoint: "/allsailings/{SchedRouteID}",
  inputSchema: allSailingsBySchedRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription:
    "Returns all sailing data for specified scheduled route ID.",
});

export const fetchSailingsByRouteID = defineEndpoint({
  api: apis.wsdotBorderCrossings,
  group: sailingsGroup,
  functionName: "fetchSailingsByRouteID",
  endpoint: "/sailings/{SchedRouteID}",
  inputSchema: sailingsByRouteIDInputSchema,
  outputSchema: sailingSchema.array(),
  sampleParams: { SchedRouteID: 2401 },
  endpointDescription: "Returns sailing data for specified scheduled route ID.",
});
