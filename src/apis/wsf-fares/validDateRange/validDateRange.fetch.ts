import { createEndpointGroupFetchFunctions } from "@/shared/utils/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/utils/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { validDateRangeGroup } from "./validDateRange.endpoints";
import type { FaresValidDateRangeInput } from "./validDateRange.input";
import type { ValidDateRange } from "./validDateRange.output";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  validDateRangeGroup
);

export const fetchFaresValidDateRange =
  fetchFunctions.fetchFaresValidDateRange as (
    params?: FetchFunctionParams<FaresValidDateRangeInput>
  ) => Promise<ValidDateRange>;
