import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Utility type for React Query options that excludes the queryKey
 * since hooks handle the queryKey internally
 */
export type QueryOptionsWithoutKey<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  "queryKey"
>;
