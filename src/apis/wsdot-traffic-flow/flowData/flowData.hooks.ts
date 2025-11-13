import { fetchTrafficFlowById, fetchTrafficFlows } from "./flowData.endpoints";

export const useTrafficFlows = fetchTrafficFlows.useQuery;

export const useTrafficFlowById = fetchTrafficFlowById.useQuery;
