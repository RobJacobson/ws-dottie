import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
import { cvRestrictionDataGroup } from "./cvRestrictionData.endpoints";
import type { CommercialVehicleRestrictionsInput } from "./cvRestrictionData.input";
import type { CVRestriction } from "./cvRestrictionData.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataGroup
);

export const fetchCommercialVehicleRestrictions =
  fetchFunctions.fetchCommercialVehicleRestrictions as (
    params?: FetchFunctionParams<CommercialVehicleRestrictionsInput>
  ) => Promise<CVRestriction[]>;
