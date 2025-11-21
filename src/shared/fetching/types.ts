import type { FetchEndpoint } from "@/apis/types";
import type { FetchStrategy, LoggingMode } from "@/shared/types";

/**
 * Parameters for the fetchDottie function
 *
 * @template TInput - The input parameters type
 * @template TOutput - The output response type
 */
export interface FetchDottieParams<TInput = never, TOutput = unknown> {
  /** Minimal endpoint object containing only fetching-necessary fields */
  endpoint: FetchEndpoint<TInput, TOutput>;
  /** Optional input parameters */
  params?: TInput;
  /** Fetch strategy - how to fetch the data (default: "native") */
  fetchMode?: FetchStrategy;
  /** Logging verbosity level (default: "none") */
  logMode?: LoggingMode;
  /** Whether to validate input/output with Zod schemas (default: false) */
  validate?: boolean;
}
