import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotCommercialVehicleRestrictionsApiMeta } from "../apiMeta";
import { cvRestrictionDataGroup } from "./shared/cvRestrictionData.endpoints";
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
 * Fetch function for retrieving commercial vehicle restrictions for all Washington State highways
 */
export const fetchCommercialVehicleRestrictions: FetchFactory<
  CommercialVehicleRestrictionsInput,
  CVRestriction[]
> = createFetchFunction({
  api: wsdotCommercialVehicleRestrictionsApiMeta,
  endpoint: commercialVehicleRestrictionsMeta,
});

/**
 * React Query hook for retrieving commercial vehicle restrictions for all Washington State highways
 */
export const useCommercialVehicleRestrictions: HookFactory<
  CommercialVehicleRestrictionsInput,
  CVRestriction[]
> = createHook({
  apiName: wsdotCommercialVehicleRestrictionsApiMeta.name,
  endpointName: commercialVehicleRestrictionsMeta.functionName,
  fetchFn: fetchCommercialVehicleRestrictions,
  cacheStrategy: cvRestrictionDataGroup.cacheStrategy,
});
