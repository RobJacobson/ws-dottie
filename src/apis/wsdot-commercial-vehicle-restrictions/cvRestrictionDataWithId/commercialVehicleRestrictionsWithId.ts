import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotCommercialVehicleRestrictionsApiMeta } from "../apiMeta";
import {
  type CommercialVehicleRestrictionsWithIdInput,
  commercialVehicleRestrictionsWithIdInputSchema,
} from "./shared/cvRestrictionDataWithId.input";
import {
  type CVRestrictionWithId,
  cvRestrictionWithIdSchema,
} from "./shared/cvRestrictionDataWithId.output";

/**
 * Metadata for the fetchCommercialVehicleRestrictionsWithId endpoint
 */
export const commercialVehicleRestrictionsWithIdMeta = {
  functionName: "fetchCommercialVehicleRestrictionsWithId",
  endpoint: "/getCommercialVehicleRestrictionsWithIdAsJson",
  inputSchema: commercialVehicleRestrictionsWithIdInputSchema,
  outputSchema: cvRestrictionWithIdSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List commercial vehicle restrictions with unique identifiers for all Washington State highways.",
} satisfies EndpointMeta<
  CommercialVehicleRestrictionsWithIdInput,
  CVRestrictionWithId[]
>;

/**
 * Factory result for commercial vehicle restrictions with ID
 */
const commercialVehicleRestrictionsWithIdFactory = createFetchAndHook<
  CommercialVehicleRestrictionsWithIdInput,
  CVRestrictionWithId[]
>({
  api: wsdotCommercialVehicleRestrictionsApiMeta,
  endpoint: commercialVehicleRestrictionsWithIdMeta,
  getEndpointGroup: () =>
    require("./shared/cvRestrictionDataWithId.endpoints")
      .cvRestrictionDataWithIdGroup,
});

/**
 * Fetch function and React Query hook for retrieving commercial vehicle restrictions with unique identifiers for all Washington State highways
 */
export const {
  fetch: fetchCommercialVehicleRestrictionsWithId,
  hook: useCommercialVehicleRestrictionsWithId,
} = commercialVehicleRestrictionsWithIdFactory;
