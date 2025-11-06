import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotTravelTimesApi } from "./apiDefinition";

export const { fetchTravelTimeById, fetchTravelTimes } =
  createFetchFunctions(wsdotTravelTimesApi);
