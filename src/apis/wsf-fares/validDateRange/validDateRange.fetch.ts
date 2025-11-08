import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { createEndpointGroupFetchFunctions } from "@/shared/factories/createEndpointGroupFetchFunctions";
import type { FetchFunctionParams } from "@/shared/factories/fetchFunctionFactory";
import { wsfFaresApi } from "../apiDefinition";
import { validDateRangeGroup } from "./validDateRange.endpoints";
import type { FaresValidDateRangeInput } from "./validDateRange.input";

const fetchFunctions = createEndpointGroupFetchFunctions(
  wsfFaresApi,
  validDateRangeGroup
);

export const fetchFaresValidDateRange: (
  params?: FetchFunctionParams<FaresValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchFaresValidDateRange;
