import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotCommercialVehicleRestrictionsApiMeta } from "../apiMeta";
import {
  type CommercialVehicleRestrictionsInput,
  commercialVehicleRestrictionsInputSchema,
} from "./shared/cvRestrictionData.input";
import {
  type CVRestriction,
  cvRestrictionSchema,
} from "./shared/cvRestrictionData.output";

/**
 * Metadata for the fetchCommercialVehicleRestrictions endpoint
 */
export const commercialVehicleRestrictionsMeta = {
  functionName: "fetchCommercialVehicleRestrictions",
  endpoint: "/getCommercialVehicleRestrictionsAsJson",
  inputSchema: commercialVehicleRestrictionsInputSchema,
  outputSchema: cvRestrictionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List commercial vehicle restrictions for all Washington State highways.",
} satisfies EndpointMeta<CommercialVehicleRestrictionsInput, CVRestriction[]>;

/**
 * Factory result for commercial vehicle restrictions
 */
const commercialVehicleRestrictionsFactory = createFetchAndHook<
  CommercialVehicleRestrictionsInput,
  CVRestriction[]
>({
  api: wsdotCommercialVehicleRestrictionsApiMeta,
  endpoint: commercialVehicleRestrictionsMeta,
  getEndpointGroup: () =>
    require("./shared/cvRestrictionData.endpoints").cvRestrictionDataGroup,
});

/**
 * Fetch function and React Query hook for retrieving commercial vehicle restrictions for all Washington State highways
 */
export const {
  fetch: fetchCommercialVehicleRestrictions,
  hook: useCommercialVehicleRestrictions,
} = commercialVehicleRestrictionsFactory;
