import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsdotCommercialVehicleRestrictionsApi } from "../apiDefinition";
import { cvRestrictionDataWithIdGroup } from "./cvRestrictionDataWithId.endpoints";
import type { CommercialVehicleRestrictionsWithIdInput } from "./cvRestrictionDataWithId.input";
import type { CVRestrictionWithId } from "./cvRestrictionDataWithId.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsdotCommercialVehicleRestrictionsApi,
  cvRestrictionDataWithIdGroup
);

export const fetchCommercialVehicleRestrictionsWithId =
  fetchFunctions.fetchCommercialVehicleRestrictionsWithId as (
    params?: FetchFunctionParams<CommercialVehicleRestrictionsWithIdInput>
  ) => Promise<CVRestrictionWithId[]>;
