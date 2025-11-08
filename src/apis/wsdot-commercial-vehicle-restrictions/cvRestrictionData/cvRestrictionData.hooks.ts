import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import type { QueryHookOptions } from "@/shared/factories/createHooks";
import { createHooks } from "@/shared/factories/createHooks";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
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
