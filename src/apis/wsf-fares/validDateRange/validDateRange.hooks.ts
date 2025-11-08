import type { UseQueryResult } from "@tanstack/react-query";
import type { ValidDateRange } from "@/apis/shared/validDateRange.output";
import { createHooks, type FetchFunctionParams, type QueryHookOptions } from "@/shared/factories";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
import { validDateRangeGroup } from "./validDateRange.endpoints";
import * as fetchFunctions from "./validDateRange.fetch";
import type { FaresValidDateRangeInput } from "./validDateRange.input";

const hooks = createHooks(wsfFaresApi, validDateRangeGroup, fetchFunctions);

export const useFaresValidDateRange: (
  params?: FetchFunctionParams<FaresValidDateRangeInput>,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error> = hooks.useFaresValidDateRange;
