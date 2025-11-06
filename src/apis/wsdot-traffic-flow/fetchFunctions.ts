import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotTrafficFlowApi } from "./apiDefinition";

export const { fetchTrafficFlows, fetchTrafficFlowById } =
  createFetchFunctions(wsdotTrafficFlowApi);
