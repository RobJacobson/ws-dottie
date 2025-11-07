import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
import { cvRestrictionDataGroup } from "./cvRestrictionData.endpoints";
import type { CommercialVehicleRestrictionsInput } from "./cvRestrictionData.input";
import type { CVRestriction } from "./cvRestrictionData.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataGroup
);

export const fetchCommercialVehicleRestrictions: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsInput>
) => Promise<CVRestriction[]> = fetchFunctions.fetchCommercialVehicleRestrictions;
