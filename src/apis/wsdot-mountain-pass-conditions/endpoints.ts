import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotMountainPassConditionsApi: ApiDefinition = {
  name: "wsdot-mountain-pass-conditions",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/mountainpassconditions/mountainpassconditionsrest.svc",
  endpoints: [
    /**
     * PassCondition response
     */
    {
      function: "getMountainPassCondition",
      endpoint:
        "/getMountainPassConditionAsJon?PassConditionID={PassConditionID}",
      inputSchema: i.getMountainPassConditionSchema,
      outputSchema: o.passConditionSchema,
      sampleParams: { PassConditionID: 12 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionInput,
      o.PassCondition
    >,
    {
      function: "getMountainPassConditions",
      endpoint: "/getMountainPassConditionsAsJson",
      inputSchema: i.getMountainPassConditionsSchema,
      outputSchema: z.array(o.passConditionSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.GetMountainPassConditionsInput,
      o.PassCondition[]
    >,
  ],
};
