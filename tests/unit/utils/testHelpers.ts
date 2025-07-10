import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import React from "react";
import { expect, vi } from "vitest";

/**
 * Creates a test QueryClient with optimized settings for testing
 */
export const createTestQueryClient = (options?: {
  retry?: boolean;
  gcTime?: number;
  staleTime?: number;
}) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: options?.retry ?? false,
        gcTime: options?.gcTime ?? 0,
        staleTime: options?.staleTime ?? 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

/**
 * Creates a React Query wrapper component for testing hooks
 */
export const createQueryWrapper = (queryClient?: QueryClient) => {
  const client = queryClient ?? createTestQueryClient();

  return ({ children }: { children: ReactNode }) => {
    return React.createElement(QueryClientProvider, { client }, children);
  };
};

/**
 * Waits for a hook to reach a specific state
 */
export const waitForHookState = async (
  result: any,
  condition: (result: any) => boolean,
  timeout = 5000
) => {
  await waitFor(
    () => {
      expect(condition(result.current)).toBe(true);
    },
    { timeout }
  );
};

/**
 * Waits for a hook to be in success state
 */
export const waitForSuccess = async (result: any, timeout = 5000) => {
  await waitForHookState(result, (current) => current.isSuccess, timeout);
};

/**
 * Waits for a hook to be in loading state
 */
export const waitForLoading = async (result: any, timeout = 5000) => {
  await waitForHookState(result, (current) => current.isLoading, timeout);
};

/**
 * Waits for a hook to be in error state
 */
export const waitForError = async (result: any, timeout = 5000) => {
  await waitForHookState(result, (current) => current.isError, timeout);
};

/**
 * Creates realistic mock data for testing
 */
export const createMockData = {
  fare: (overrides = {}) => ({
    fareId: 1,
    fareName: "Test Fare",
    fareAmount: 10.5,
    fareDescription: "Test fare description",
    fareType: "Adult",
    fareCategory: "Vehicle",
    fareCurrency: "USD",
    isActive: true,
    lastUpdated: new Date(),
    effectiveDate: new Date(),
    ...overrides,
  }),

  vesselLocation: (overrides = {}) => ({
    vesselId: 1,
    vesselName: "Walla Walla",
    latitude: 47.6062,
    longitude: -122.3321,
    speed: 12.5,
    heading: 180,
    lastUpdated: new Date("2024-01-01T12:00:00Z"),
    ...overrides,
  }),

  terminalBasics: (overrides = {}) => ({
    terminalId: 7,
    terminalName: "Anacortes",
    terminalAbbrev: "ANA",
    latitude: 48.5123,
    longitude: -122.6123,
    address: "Test Address",
    city: "Anacortes",
    state: "WA",
    zipCode: "98221",
    phone: "360-293-8154",
    hasWaitTime: true,
    hasSpaceAvailable: true,
    isActive: true,
    lastUpdated: new Date(),
    ...overrides,
  }),

  route: (overrides = {}) => ({
    routeId: 1,
    routeName: "Test Route",
    routeAbbrev: "TR",
    routeDescription: "Test route description",
    routeColor: "#123456",
    sortSeq: 1,
    isActive: true,
    lastUpdated: new Date(),
    effectiveDate: new Date(),
    crossingTime: 60,
    distance: 10.5,
    serviceRoutes: [],
    ...overrides,
  }),
};

/**
 * Asserts that a mock function was called with specific parameters
 * Handles React Query's additional parameters (client, meta, queryKey, signal)
 */
export const expectMockCalledWith = (
  mockFn: any,
  expectedParams: any[],
  callIndex = 0
) => {
  expect(mockFn).toHaveBeenCalled();
  const calls = mockFn.mock.calls;
  expect(calls.length).toBeGreaterThan(callIndex);

  const actualCall = calls[callIndex];
  // Only check the first N parameters where N is the length of expectedParams
  for (let i = 0; i < expectedParams.length; i++) {
    expect(actualCall[i]).toEqual(expectedParams[i]);
  }
};

/**
 * Asserts that a query key matches the expected structure
 */
export const expectQueryKey = (
  queryKey: any[],
  expectedStructure: (string | number | boolean | null)[]
) => {
  expect(queryKey).toEqual(expectedStructure);
};

/**
 * Finds a query in the cache by key structure
 */
export const findQueryByKey = (
  queryClient: QueryClient,
  keyMatcher: (key: any[]) => boolean
) => {
  const queries = queryClient.getQueryCache().getAll();
  return queries.find((q) => keyMatcher(q.queryKey));
};

/**
 * Clears all mocks and resets test state
 */
export const resetTestState = () => {
  vi.clearAllMocks();
  vi.clearAllTimers();
};

/**
 * Creates a mock API response with error handling
 */
export const createMockApiResponse = {
  success: <T>(data: T) => Promise.resolve(data),
  error: (error: Error) => Promise.reject(error),
  empty: () => Promise.resolve([]),
};

/**
 * Test constants for consistent values across tests
 */
export const TEST_CONSTANTS = {
  FARE_ID: 1,
  VESSEL_ID: 1,
  TERMINAL_ID: 7,
  ROUTE_ID: 1,
  CATEGORY_ID: 1,
  TYPE_ID: 1,
  SEASON_ID: 1,
  SCHED_ROUTE_ID: 1,
  SAILING_ID: 1,
  WAIT_TIME_ID: 1,
  ALERT_ID: 1,
  DATE: new Date("2024-04-01"),
} as const;
