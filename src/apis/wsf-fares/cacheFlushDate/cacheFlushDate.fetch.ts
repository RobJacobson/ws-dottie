import type { FetchFunctionParams } from "@/shared/factories/createFetchFunctions";
import { createFetchFunctions } from "@/shared/factories/createFetchFunctions";
import { wsfFaresApi } from "../apiDefinition";
import {
  type CacheFlushDateFares,
  type CacheFlushDateFaresInput,
  cacheFlushDateFaresGroup,
} from "./cacheFlushDate.endpoints";

const fetchFunctions = createFetchFunctions(
  wsfFaresApi,
  cacheFlushDateFaresGroup
);

export const fetchCacheFlushDateFares: (
  params?: FetchFunctionParams<CacheFlushDateFaresInput>
) => Promise<CacheFlushDateFares> = fetchFunctions.fetchCacheFlushDateFares as (
  params?: FetchFunctionParams<CacheFlushDateFaresInput>
) => Promise<CacheFlushDateFares>;
