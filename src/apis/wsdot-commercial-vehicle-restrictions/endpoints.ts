import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsdotCommercialVehicleRestrictionsApi: ApiDefinition = {
  name: "wsdot-commercial-vehicle-restrictions",
  baseUrl:
    "http://www.wsdot.wa.gov/traffic/api/cvrestrictions/cvrestrictionsrest.svc",
  endpoints: [
    /**
     * CVRestrictionData response
     */
    {
      function: "getCommercialVehicleRestrictions",
      endpoint: "/getCommercialVehicleRestrictionsAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsSchema,
      outputSchema: z.array(o.cVRestrictionDataSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsInput,
      o.CVRestrictionData[]
    >,
    /**
     * CVRestrictionDataWithId response
     */
    {
      function: "getCommercialVehicleRestrictionsWithId",
      endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
      inputSchema: i.getCommercialVehicleRestrictionsWithIdSchema,
      outputSchema: z.array(o.cVRestrictionDataWithIdSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.GetCommercialVehicleRestrictionsWithIdInput,
      o.CVRestrictionDataWithId[]
    >,
  ],
};
