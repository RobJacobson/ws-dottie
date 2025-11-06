import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
import { cvRestrictionDataGroup } from "./cvRestrictionData.endpoints";
import * as fetchFunctions from "./cvRestrictionData.fetch";
import type { CommercialVehicleRestrictionsInput } from "./cvRestrictionData.input";
import type { CVRestriction } from "./cvRestrictionData.output";

const hooks = createEndpointGroupHooks(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataGroup,
  fetchFunctions
);

export const useCommercialVehicleRestrictions =
  hooks.useCommercialVehicleRestrictions as (
    params?: CommercialVehicleRestrictionsInput,
    options?: QueryHookOptions<CVRestriction[]>
  ) => UseQueryResult<CVRestriction[], Error>;
