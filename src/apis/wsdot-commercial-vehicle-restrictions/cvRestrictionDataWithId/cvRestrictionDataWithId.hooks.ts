import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/factories/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/factories/createEndpointGroupHooks";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId.endpoints";
import * as fetchFunctions from "./cvRestrictionDataWithId.fetch";
import type { CommercialVehicleRestrictionsWithIdInput } from "./cvRestrictionDataWithId.input";
import type { CVRestrictionWithId } from "./cvRestrictionDataWithId.output";

const hooks = createEndpointGroupHooks(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataWithIdGroup,
  fetchFunctions
);

export const useCommercialVehicleRestrictionsWithId: (
  params?: CommercialVehicleRestrictionsWithIdInput,
  options?: QueryHookOptions<CVRestrictionWithId[]>
) => UseQueryResult<CVRestrictionWithId[], Error> =
  hooks.useCommercialVehicleRestrictionsWithId;
