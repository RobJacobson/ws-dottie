import { createFetchFunctions, type FetchFunctionParams } from "@/shared/factories";
import { wsfFaresApi } from "@/apis/wsf-fares/apiDefinition";
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
