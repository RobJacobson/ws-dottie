import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Type alias for TanStack Query options to simplify API function signatures
 */
export type TanStackOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  "queryKey" | "queryFn"
>;
