import { createFetchFunctions } from "@/shared/utils/createFetchFunctions";
import { wsdotBorderCrossingsApi } from "./apiDefinition";

export const { fetchBorderCrossings } = createFetchFunctions(
  wsdotBorderCrossingsApi
);
