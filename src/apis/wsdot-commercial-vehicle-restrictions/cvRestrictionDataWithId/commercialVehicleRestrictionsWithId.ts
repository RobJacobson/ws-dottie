import type { EndpointMeta } from "@/apis/types";
import {
  createFetchFunction,
  createHook,
  type FetchFactory,
  type HookFactory,
} from "@/shared/factories";
import { wsdotCommercialVehicleRestrictionsApiMeta } from "../apiMeta";
import { cvRestrictionDataWithIdGroup } from "./shared/cvRestrictionDataWithId.endpoints";
import {
  type CommercialVehicleRestrictionsWithIdInput,
  commercialVehicleRestrictionsWithIdInputSchema,
} from "./shared/cvRestrictionDataWithId.input";
import {
  type CVRestrictionWithId,
  cvRestrictionWithIdSchema,
} from "./shared/cvRestrictionDataWithId.output";

/**
 * Metadata for the fetchCommercialVehicleRestrictionsWithId endpoint
 */
export const commercialVehicleRestrictionsWithIdMeta = {
  functionName: "fetchCommercialVehicleRestrictionsWithId",
  endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
  inputSchema: commercialVehicleRestrictionsWithIdInputSchema,
  outputSchema: cvRestrictionWithIdSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List commercial vehicle restrictions with unique identifiers for all Washington State highways.",
} satisfies EndpointMeta<
  CommercialVehicleRestrictionsWithIdInput,
  CVRestrictionWithId[]
>;

/**
 * Fetch function for retrieving commercial vehicle restrictions with unique identifiers for all Washington State highways
 */
export const fetchCommercialVehicleRestrictionsWithId: FetchFactory<
  CommercialVehicleRestrictionsWithIdInput,
  CVRestrictionWithId[]
> = createFetchFunction({
  api: wsdotCommercialVehicleRestrictionsApiMeta,
  endpoint: commercialVehicleRestrictionsWithIdMeta,
});

/**
 * React Query hook for retrieving commercial vehicle restrictions with unique identifiers for all Washington State highways
 */
export const useCommercialVehicleRestrictionsWithId: HookFactory<
  CommercialVehicleRestrictionsWithIdInput,
  CVRestrictionWithId[]
> = createHook({
  apiName: wsdotCommercialVehicleRestrictionsApiMeta.name,
  endpointName: commercialVehicleRestrictionsWithIdMeta.functionName,
  fetchFn: fetchCommercialVehicleRestrictionsWithId,
  cacheStrategy: cvRestrictionDataWithIdGroup.cacheStrategy,
});
