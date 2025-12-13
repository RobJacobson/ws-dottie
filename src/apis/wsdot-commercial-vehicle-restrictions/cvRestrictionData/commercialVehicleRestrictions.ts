import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsdotCommercialVehicleRestrictionsApiMeta } from "../apiMeta";
import {
  type CommercialVehicleRestrictionsInput,
  commercialVehicleRestrictionsInputSchema,
} from "./shared/cvRestrictionData.input";
import {
  type CVRestriction,
  cvRestrictionSchema,
} from "./shared/cvRestrictionData.output";

/**
 * Metadata for the fetchCommercialVehicleRestrictions endpoint
 */
export const commercialVehicleRestrictionsMeta = {
  functionName: "fetchCommercialVehicleRestrictions",
  endpoint: "/getCommercialVehicleRestrictionsAsJson",
  inputSchema: commercialVehicleRestrictionsInputSchema,
  outputSchema: cvRestrictionSchema.array(),
  sampleParams: {},
  endpointDescription:
    "List commercial vehicle restrictions for all Washington State highways.",
  toolDescription: {
    purpose:
      "List commercial vehicle restrictions for all Washington State highways.",
    useWhen: [
      "statewide commercial vehicle routing analysis",
      "bulk restriction data export",
      "comprehensive restriction database queries",
    ],
    avoidWhen: [
      "you need unique identifiers for restrictions (prefer fetchCommercialVehicleRestrictionsWithId)",
    ],
    inputsHighlights: "none",
    returns: "array — one item per commercial vehicle restriction",
    outputHighlights: [
      "Location: StateRouteID, Latitude/Longitude, StartRoadwayLocation/EndRoadwayLocation, LocationDescription",
      "Restrictions: MaximumGrossVehicleWeightInPounds, RestrictionHeightInInches/WidthInInches/LengthInInches, RestrictionWeightInPounds",
      "Vehicle classes: BLMaxAxle, CL8MaxAxle, SAMaxAxle, TDMaxAxle (weight limits by vehicle classification)",
      "Bridge info: BridgeName, BridgeNumber, RestrictionType (0=bridge, 1=road)",
      "Dates: DateEffective, DateExpires, DatePosted",
      "Status: IsPermanentRestriction, IsWarning, IsDetourAvailable, IsExceptionsAllowed",
      "Large dataset: thousands of restrictions with detailed weight/height limits and location data",
    ],
  },
} satisfies EndpointMeta<CommercialVehicleRestrictionsInput, CVRestriction[]>;

/**
 * Factory result for commercial vehicle restrictions
 */
const commercialVehicleRestrictionsFactory = createFetchAndHook<
  CommercialVehicleRestrictionsInput,
  CVRestriction[]
>({
  api: wsdotCommercialVehicleRestrictionsApiMeta,
  endpoint: commercialVehicleRestrictionsMeta,
  getEndpointGroup: () =>
    require("./shared/cvRestrictionData.endpoints").cvRestrictionDataGroup,
});

/**
 * Fetch function and React Query hook for retrieving commercial vehicle restrictions for all Washington State highways
 */
export const {
  fetch: fetchCommercialVehicleRestrictions,
  hook: useCommercialVehicleRestrictions,
} = commercialVehicleRestrictionsFactory;
