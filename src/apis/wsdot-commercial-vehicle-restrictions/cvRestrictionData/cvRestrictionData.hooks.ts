import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { cvRestrictionDataGroup } from "./cvRestrictionData.endpoints";
import * as fetchFunctions from "./cvRestrictionData.fetch";
import type { CommercialVehicleRestrictionsInput } from "./cvRestrictionData.input";
import type { CVRestriction } from "./cvRestrictionData.output";

const hooks = createHooks(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataGroup,
  fetchFunctions
);

export const useCommercialVehicleRestrictions: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsInput>,
  options?: QueryHookOptions<CVRestriction[]>
) => UseQueryResult<CVRestriction[], Error> =
  hooks.useCommercialVehicleRestrictions;
