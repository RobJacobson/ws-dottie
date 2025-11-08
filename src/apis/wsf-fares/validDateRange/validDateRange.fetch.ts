import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import {
  createFetchFunctions,
  type FetchFunctionParams,
} from "@/shared/factories";
import { validDateRangeGroup } from "./validDateRange.endpoints";
import type { FaresValidDateRangeInput } from "./validDateRange.input";

const fetchFunctions = createFetchFunctions(wsfFaresApi, validDateRangeGroup);

export const fetchFaresValidDateRange: (
  params?: FetchFunctionParams<FaresValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchFaresValidDateRange;
