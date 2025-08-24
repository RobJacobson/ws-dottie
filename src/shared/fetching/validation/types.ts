/**
 * Validation-related type definitions
 *
 * This module contains type definitions that are shared across the validation
 * system, including both schema construction and validation execution.
 */

/**
 * Validation mode for different validation strategies
 */
export type ValidationMode = "strict" | "lenient" | "none";

/**
 * Validation context information
 */
export interface ValidationContext {
  /** The API endpoint being validated */
  endpoint?: string;
  /** The operation type (input validation, response validation, etc.) */
  operation: "input" | "output" | "parameter";
  /** Additional context for error messages */
  context?: Record<string, unknown>;
}

/**
 * Validation result structure
 */
export interface ValidationResult<T = unknown> {
  /** Whether validation passed */
  success: boolean;
  /** The validated data if successful */
  data?: T;
  /** Validation errors if failed */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
}
