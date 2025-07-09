// WSF Fares hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import {
  getFareById,
  getFareCategories,
  getFareCategoryById,
  getFares,
  getFareTypeById,
  getFareTypes,
  getRouteFares,
  getRouteFaresByRouteId,
  getTerminalFares,
  getTerminalFaresByTerminalId,
} from "./api";
import type {
  Fare,
  FareCategory,
  FareType,
  RouteFare,
  TerminalFare,
} from "./types";

// Main hooks
/**
 * Hook for fetching all fares from WSF Fares API
 *
 * Retrieves comprehensive fare information including fare amounts, categories,
 * types, and effective dates. This endpoint provides current fare information
 * for all Washington State Ferries routes and services.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @returns React Query result containing an array of Fare objects with comprehensive fare information
 */
export const useFares = () => {
  return useQuery({
    queryKey: ["fares"],
    queryFn: getFares,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching a specific fare by ID from WSF Fares API
 *
 * Retrieves comprehensive fare information for a specific fare identified by fare ID,
 * including fare amount, category, type, and effective dates. This endpoint filters
 * the resultset to a single fare, providing detailed information about that specific fare.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @param fareId - The unique identifier for the fare
 * @returns React Query result containing an array of Fare objects with comprehensive information for the specified fare
 */
export const useFareById = (fareId: number) => {
  return useQuery({
    queryKey: ["fares", "byId", fareId],
    queryFn: () => getFareById(fareId),
    enabled: !!fareId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching fare categories from WSF Fares API
 *
 * Retrieves fare category information including category names, descriptions,
 * and types. This endpoint provides information about the different categories
 * of fares available in the WSF system.
 *
 * This data is updated infrequently and provides static category information
 * that changes only when WSF updates their fare structure.
 *
 * @returns React Query result containing an array of FareCategory objects with fare category information
 */
export const useFareCategories = () => {
  return useQuery({
    queryKey: ["fares", "categories"],
    queryFn: getFareCategories,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching a specific fare category by ID from WSF Fares API
 *
 * Retrieves fare category information for a specific category identified by category ID,
 * including category name, description, and type. This endpoint filters the resultset
 * to a single category, providing detailed information about that specific fare category.
 *
 * This data is updated infrequently and provides static category information
 * that changes only when WSF updates their fare structure.
 *
 * @param categoryId - The unique identifier for the fare category
 * @returns React Query result containing an array of FareCategory objects with information for the specified category
 */
export const useFareCategoryById = (categoryId: number) => {
  return useQuery({
    queryKey: ["fares", "categories", "byId", categoryId],
    queryFn: () => getFareCategoryById(categoryId),
    enabled: !!categoryId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching fare types from WSF Fares API
 *
 * Retrieves fare type information including type names, descriptions,
 * and categories. This endpoint provides information about the different types
 * of fares available in the WSF system.
 *
 * This data is updated infrequently and provides static type information
 * that changes only when WSF updates their fare structure.
 *
 * @returns React Query result containing an array of FareType objects with fare type information
 */
export const useFareTypes = () => {
  return useQuery({
    queryKey: ["fares", "types"],
    queryFn: getFareTypes,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching a specific fare type by ID from WSF Fares API
 *
 * Retrieves fare type information for a specific type identified by type ID,
 * including type name, description, and category. This endpoint filters the resultset
 * to a single type, providing detailed information about that specific fare type.
 *
 * This data is updated infrequently and provides static type information
 * that changes only when WSF updates their fare structure.
 *
 * @param typeId - The unique identifier for the fare type
 * @returns React Query result containing an array of FareType objects with information for the specified type
 */
export const useFareTypeById = (typeId: number) => {
  return useQuery({
    queryKey: ["fares", "types", "byId", typeId],
    queryFn: () => getFareTypeById(typeId),
    enabled: !!typeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching route fares from WSF Fares API
 *
 * Retrieves fare information for all routes, including route names, fare amounts,
 * and effective dates. This endpoint provides current fare information for all
 * Washington State Ferries routes.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @returns React Query result containing an array of RouteFare objects with route fare information
 */
export const useRouteFares = () => {
  return useQuery({
    queryKey: ["fares", "routes"],
    queryFn: getRouteFares,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching route fares by route ID from WSF Fares API
 *
 * Retrieves fare information for a specific route identified by route ID,
 * including route name, fare amounts, and effective dates. This endpoint filters
 * the resultset to a single route, providing detailed fare information for that route.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @param routeId - The unique identifier for the route
 * @returns React Query result containing an array of RouteFare objects with fare information for the specified route
 */
export const useRouteFaresByRouteId = (routeId: number) => {
  return useQuery({
    queryKey: ["fares", "routes", "byRouteId", routeId],
    queryFn: () => getRouteFaresByRouteId(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal fares from WSF Fares API
 *
 * Retrieves fare information for all terminals, including terminal names, fare amounts,
 * and effective dates. This endpoint provides current fare information for all
 * Washington State Ferries terminals.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @returns React Query result containing an array of TerminalFare objects with terminal fare information
 */
export const useTerminalFares = () => {
  return useQuery({
    queryKey: ["fares", "terminals"],
    queryFn: getTerminalFares,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal fares by terminal ID from WSF Fares API
 *
 * Retrieves fare information for a specific terminal identified by terminal ID,
 * including terminal name, fare amounts, and effective dates. This endpoint filters
 * the resultset to a single terminal, providing detailed fare information for that terminal.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @param terminalId - The unique identifier for the terminal
 * @returns React Query result containing an array of TerminalFare objects with fare information for the specified terminal
 */
export const useTerminalFaresByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["fares", "terminals", "byTerminalId", terminalId],
    queryFn: () => getTerminalFaresByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};
