/**
 * Schema construction utilities
 *
 * This module provides utilities for constructing Zod schemas that are used
 * by API clients to define their input/output validation requirements.
 * These schemas are consumed by the validation core functions during pipeline execution.
 */

// Export all schema construction utilities
export * from "./dates";
export * from "./fields";
// Note: templates.ts has been cleaned up and no longer exports anything
