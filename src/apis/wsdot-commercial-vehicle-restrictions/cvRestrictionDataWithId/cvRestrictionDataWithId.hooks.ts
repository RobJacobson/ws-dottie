import type { UseQueryResult } from "@tanstack/react-query";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
import {
  createHooks,
  type FetchFunctionParams,
  type QueryHookOptions,
} from "@/shared/factories";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId.endpoints";
import * as fetchFunctions from "./cvRestrictionDataWithId.fetch";
import type { CommercialVehicleRestrictionsWithIdInput } from "./cvRestrictionDataWithId.input";
import type { CVRestrictionWithId } from "./cvRestrictionDataWithId.output";

const hooks = createHooks(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataWithIdGroup,
  fetchFunctions
);

export const useCommercialVehicleRestrictionsWithId: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsWithIdInput>,
  options?: QueryHookOptions<CVRestrictionWithId[]>
) => UseQueryResult<CVRestrictionWithId[], Error> =
  hooks.useCommercialVehicleRestrictionsWithId;
