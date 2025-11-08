import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfFaresApi } from "../apiDefinition";
import { validDateRangeGroup } from "./validDateRange.endpoints";
import type { FaresValidDateRangeInput } from "./validDateRange.input";

const fetchFunctions = createFetchFunctions(wsfFaresApi, validDateRangeGroup);

export const fetchFaresValidDateRange: (
  params?: FetchFunctionParams<FaresValidDateRangeInput>
) => Promise<ValidDateRange> = fetchFunctions.fetchFaresValidDateRange;
