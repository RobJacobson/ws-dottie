import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotBridgeClearancesApi } from "./apiDefinition";

export const { fetchBridgeClearances, fetchBridgeClearancesByRoute } =
  createFetchFunctions(wsdotBridgeClearancesApi);
