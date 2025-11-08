import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { cvRestrictionDataGroup } from "./cvRestrictionData.endpoints";
import type { CommercialVehicleRestrictionsInput } from "./cvRestrictionData.input";
import type { CVRestriction } from "./cvRestrictionData.output";

const fetchFunctions = createFetchFunctions(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataGroup
);

export const fetchCommercialVehicleRestrictions: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsInput>
) => Promise<CVRestriction[]> =
  fetchFunctions.fetchCommercialVehicleRestrictions;
