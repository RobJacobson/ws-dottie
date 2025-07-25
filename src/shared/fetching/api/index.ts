/**
 * API client creation and configuration utilities
 *
 * This module provides the core functionality for creating and configuring
 * API clients for WSDOT and WSF APIs, including:
 * - API client creation with platform-specific fetching strategies
 * - Factory functions for creating pre-configured fetch functions
 */

export { createApiClient } from "./createApiClient";
export { createFetchFactory } from "./createFetchFactory";
