// WSF Fares API Types

/**
 * Fare information from WSF Fares API
 * Based on /fares endpoint
 */
export type Fare = {
  fareId: number;
  fareName: string;
  fareDescription: string;
  fareType: string;
  fareCategory: string;
  fareAmount: number;
  fareCurrency: string;
  isActive: boolean;
  effectiveDate: Date;
  expirationDate?: Date;
  lastUpdated: Date;
};

/**
 * Fare category information from WSF Fares API
 * Based on /farecategories endpoint
 */
export type FareCategory = {
  categoryId: number;
  categoryName: string;
  categoryDescription: string;
  categoryType: string;
  isActive: boolean;
  lastUpdated: Date;
};

/**
 * Fare type information from WSF Fares API
 * Based on /faretypes endpoint
 */
export type FareType = {
  typeId: number;
  typeName: string;
  typeDescription: string;
  typeCategory: string;
  isActive: boolean;
  lastUpdated: Date;
};

/**
 * Route fare information from WSF Fares API
 * Based on /routefares endpoint
 */
export type RouteFare = {
  routeId: number;
  routeName: string;
  fareId: number;
  fareName: string;
  fareAmount: number;
  fareCurrency: string;
  isActive: boolean;
  effectiveDate: Date;
  expirationDate?: Date;
  lastUpdated: Date;
};

/**
 * Terminal fare information from WSF Fares API
 * Based on /terminalfares endpoint
 */
export type TerminalFare = {
  terminalId: number;
  terminalName: string;
  fareId: number;
  fareName: string;
  fareAmount: number;
  fareCurrency: string;
  isActive: boolean;
  effectiveDate: Date;
  expirationDate?: Date;
  lastUpdated: Date;
};

/**
 * Fares cache flush date response
 */
export type FaresCacheFlushDate = {
  lastUpdated: Date;
  source: string;
};
