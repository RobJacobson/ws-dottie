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
  toolDescription: {
    purpose:
      "List commercial vehicle restrictions with unique identifiers for all Washington State highways.",
    useWhen: [
      "statewide commercial vehicle routing analysis with unique tracking",
      "bulk restriction data export with identifiers",
      "comprehensive restriction database queries requiring unique IDs",
    ],
    avoidWhen: [
      "you don't need unique restriction identifiers (prefer fetchCommercialVehicleRestrictions)",
    ],
    inputs: [],
    returns: "array — one item per commercial vehicle restriction",
    outputHighlights: [
      "IDs: UniqueID (format 'Type-State-Route-Sequence', e.g., 'B-WA-010-1')",
      "Location: StateRouteID, Latitude/Longitude, StartRoadwayLocation/EndRoadwayLocation, LocationDescription",
      "Restrictions: MaximumGrossVehicleWeightInPounds, RestrictionHeightInInches/WidthInInches/LengthInInches, RestrictionWeightInPounds",
      "Vehicle classes: BLMaxAxle, CL8MaxAxle, SAMaxAxle, TDMaxAxle (weight limits by vehicle classification)",
      "Bridge info: BridgeName, BridgeNumber, RestrictionType (0=bridge, 1=road)",
      "Dates: DateEffective, DateExpires, DatePosted",
      "Status: IsPermanentRestriction, IsWarning, IsDetourAvailable, IsExceptionsAllowed",
      "Large dataset: thousands of restrictions with detailed weight/height limits, location data, and unique identifiers",
    ],
  },
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
