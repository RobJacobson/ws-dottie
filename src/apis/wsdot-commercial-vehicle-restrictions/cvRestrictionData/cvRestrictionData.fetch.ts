import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
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
