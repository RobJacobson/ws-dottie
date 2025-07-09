// WSF Fares API functions

import { buildWsfUrl } from "@/shared/fetching/dateUtils";
import { fetchWsfArray } from "@/shared/fetching/fetch";

import type {
  Fare,
  FareCategory,
  FareType,
  RouteFare,
  TerminalFare,
} from "./types";

// Main API functions
/**
 * API function for fetching all fares from WSF Fares API
 *
 * Retrieves comprehensive fare information including fare amounts, categories,
 * types, and effective dates. This endpoint provides current fare information
 * for all Washington State Ferries routes and services.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @returns Promise resolving to an array of Fare objects containing comprehensive fare information
 */
export const getFares = (): Promise<Fare[]> =>
  fetchWsfArray<Fare>("fares", "/fares");

/**
 * API function for fetching a specific fare by ID from WSF Fares API
 *
 * Retrieves comprehensive fare information for a specific fare identified by fare ID,
 * including fare amount, category, type, and effective dates. This endpoint filters
 * the resultset to a single fare, providing detailed information about that specific fare.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @param fareId - The unique identifier for the fare
 * @returns Promise resolving to an array of Fare objects containing comprehensive information for the specified fare
 */
export const getFareById = (fareId: number): Promise<Fare[]> =>
  fetchWsfArray<Fare>("fares", buildWsfUrl("/fares/{fareId}", { fareId }));

/**
 * API function for fetching fare categories from WSF Fares API
 *
 * Retrieves fare category information including category names, descriptions,
 * and types. This endpoint provides information about the different categories
 * of fares available in the WSF system.
 *
 * This data is updated infrequently and provides static category information
 * that changes only when WSF updates their fare structure.
 *
 * @returns Promise resolving to an array of FareCategory objects containing fare category information
 */
export const getFareCategories = (): Promise<FareCategory[]> =>
  fetchWsfArray<FareCategory>("fares", "/farecategories");

/**
 * API function for fetching a specific fare category by ID from WSF Fares API
 *
 * Retrieves fare category information for a specific category identified by category ID,
 * including category name, description, and type. This endpoint filters the resultset
 * to a single category, providing detailed information about that specific fare category.
 *
 * This data is updated infrequently and provides static category information
 * that changes only when WSF updates their fare structure.
 *
 * @param categoryId - The unique identifier for the fare category
 * @returns Promise resolving to an array of FareCategory objects containing information for the specified category
 */
export const getFareCategoryById = (
  categoryId: number
): Promise<FareCategory[]> =>
  fetchWsfArray<FareCategory>(
    "fares",
    buildWsfUrl("/farecategories/{categoryId}", { categoryId })
  );

/**
 * API function for fetching fare types from WSF Fares API
 *
 * Retrieves fare type information including type names, descriptions,
 * and categories. This endpoint provides information about the different types
 * of fares available in the WSF system.
 *
 * This data is updated infrequently and provides static type information
 * that changes only when WSF updates their fare structure.
 *
 * @returns Promise resolving to an array of FareType objects containing fare type information
 */
export const getFareTypes = (): Promise<FareType[]> =>
  fetchWsfArray<FareType>("fares", "/faretypes");

/**
 * API function for fetching a specific fare type by ID from WSF Fares API
 *
 * Retrieves fare type information for a specific type identified by type ID,
 * including type name, description, and category. This endpoint filters the resultset
 * to a single type, providing detailed information about that specific fare type.
 *
 * This data is updated infrequently and provides static type information
 * that changes only when WSF updates their fare structure.
 *
 * @param typeId - The unique identifier for the fare type
 * @returns Promise resolving to an array of FareType objects containing information for the specified type
 */
export const getFareTypeById = (typeId: number): Promise<FareType[]> =>
  fetchWsfArray<FareType>(
    "fares",
    buildWsfUrl("/faretypes/{typeId}", { typeId })
  );

/**
 * API function for fetching route fares from WSF Fares API
 *
 * Retrieves fare information for all routes, including route names, fare amounts,
 * and effective dates. This endpoint provides current fare information for all
 * Washington State Ferries routes.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @returns Promise resolving to an array of RouteFare objects containing route fare information
 */
export const getRouteFares = (): Promise<RouteFare[]> =>
  fetchWsfArray<RouteFare>("fares", "/routefares");

/**
 * API function for fetching route fares by route ID from WSF Fares API
 *
 * Retrieves fare information for a specific route identified by route ID,
 * including route name, fare amounts, and effective dates. This endpoint filters
 * the resultset to a single route, providing detailed fare information for that route.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @param routeId - The unique identifier for the route
 * @returns Promise resolving to an array of RouteFare objects containing fare information for the specified route
 */
export const getRouteFaresByRouteId = (routeId: number): Promise<RouteFare[]> =>
  fetchWsfArray<RouteFare>(
    "fares",
    buildWsfUrl("/routefares/{routeId}", { routeId })
  );

/**
 * API function for fetching terminal fares from WSF Fares API
 *
 * Retrieves fare information for all terminals, including terminal names, fare amounts,
 * and effective dates. This endpoint provides current fare information for all
 * Washington State Ferries terminals.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @returns Promise resolving to an array of TerminalFare objects containing terminal fare information
 */
export const getTerminalFares = (): Promise<TerminalFare[]> =>
  fetchWsfArray<TerminalFare>("fares", "/terminalfares");

/**
 * API function for fetching terminal fares by terminal ID from WSF Fares API
 *
 * Retrieves fare information for a specific terminal identified by terminal ID,
 * including terminal name, fare amounts, and effective dates. This endpoint filters
 * the resultset to a single terminal, providing detailed fare information for that terminal.
 *
 * This data is updated infrequently and provides static fare information
 * that changes only when WSF updates their fare structure.
 *
 * @param terminalId - The unique identifier for the terminal
 * @returns Promise resolving to an array of TerminalFare objects containing fare information for the specified terminal
 */
export const getTerminalFaresByTerminalId = (
  terminalId: number
): Promise<TerminalFare[]> =>
  fetchWsfArray<TerminalFare>(
    "fares",
    buildWsfUrl("/terminalfares/{terminalId}", { terminalId })
  );
