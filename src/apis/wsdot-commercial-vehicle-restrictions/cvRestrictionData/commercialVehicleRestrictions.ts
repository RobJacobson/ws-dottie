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
} from "@/shared/factories";
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
export const fetchCommercialVehicleRestrictions: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsInput>
) => Promise<CVRestriction[]> = createFetchFunction(
  apis.wsdotCommercialVehicleRestrictions,
  cvRestrictionDataGroup,
  commercialVehicleRestrictionsMeta
);

/**
 * React Query hook for retrieving commercial vehicle restrictions for all Washington State highways
 */
export const useCommercialVehicleRestrictions: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsInput>,
  options?: QueryHookOptions<CVRestriction[]>
) => UseQueryResult<CVRestriction[], Error> = createHook(
  apis.wsdotCommercialVehicleRestrictions,
  cvRestrictionDataGroup,
  commercialVehicleRestrictionsMeta
);
