import type { UseQueryResult } from "@tanstack/react-query";
import { apis } from "@/apis/shared/apis";
import type {
  EndpointMeta,
  FetchFunctionParams,
  QueryHookOptions,
} from "@/apis/types";
import {
  createFetchFunction,
  createHook,
} from "@/shared/factories/metaEndpointFactory";
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
export const fetchCommercialVehicleRestrictionsWithId: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsWithIdInput>
) => Promise<CVRestrictionWithId[]> = createFetchFunction(
  apis.wsdotCommercialVehicleRestrictions,
  cvRestrictionDataWithIdGroup,
  commercialVehicleRestrictionsWithIdMeta
);

/**
 * React Query hook for retrieving commercial vehicle restrictions with unique identifiers for all Washington State highways
 */
export const useCommercialVehicleRestrictionsWithId: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsWithIdInput>,
  options?: QueryHookOptions<CVRestrictionWithId[]>
) => UseQueryResult<CVRestrictionWithId[], Error> = createHook(
  apis.wsdotCommercialVehicleRestrictions,
  cvRestrictionDataWithIdGroup,
  commercialVehicleRestrictionsWithIdMeta
);
