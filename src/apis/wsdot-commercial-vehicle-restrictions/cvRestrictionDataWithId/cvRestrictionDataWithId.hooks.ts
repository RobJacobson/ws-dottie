import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
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
