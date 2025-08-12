import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Options for WS‑Dottie hooks that map to TanStack Query's UseQueryOptions,
 * excluding 'queryKey' and 'queryFn' which are provided by the hooks.
 */
export type TanStackOptions<TData, TError = Error> = Omit<
  UseQueryOptions<TData, TError>,
  "queryKey" | "queryFn"
>;
