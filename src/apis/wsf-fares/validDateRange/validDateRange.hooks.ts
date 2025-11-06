import type { UseQueryResult } from "@tanstack/react-query";
import type { QueryHookOptions } from "@/shared/utils/createEndpointGroupHooks";
import { createEndpointGroupHooks } from "@/shared/utils/createEndpointGroupHooks";
import { wsfFaresApi } from "../apiDefinition";
import { validDateRangeGroup } from "./validDateRange.endpoints";
import * as fetchFunctions from "./validDateRange.fetch";
import type { FaresValidDateRangeInput } from "./validDateRange.input";
import type { ValidDateRange } from "./validDateRange.output";

const hooks = createEndpointGroupHooks(
  wsfFaresApi,
  validDateRangeGroup,
  fetchFunctions
);

export const useFaresValidDateRange = hooks.useFaresValidDateRange as (
  params?: FaresValidDateRangeInput,
  options?: QueryHookOptions<ValidDateRange>
) => UseQueryResult<ValidDateRange, Error>;
