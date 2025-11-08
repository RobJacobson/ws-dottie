import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsdotCommercialVehicleRestrictionsApi } from "@/apis/wsdot-commercial-vehicle-restrictions/apiDefinition";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId.endpoints";
import type { CommercialVehicleRestrictionsWithIdInput } from "./cvRestrictionDataWithId.input";
import type { CVRestrictionWithId } from "./cvRestrictionDataWithId.output";

const fetchFunctions = createFetchFunctions(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataWithIdGroup
);

export const fetchCommercialVehicleRestrictionsWithId: (
  params?: FetchFunctionParams<CommercialVehicleRestrictionsWithIdInput>
) => Promise<CVRestrictionWithId[]> =
  fetchFunctions.fetchCommercialVehicleRestrictionsWithId;
