// WSF Fares API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html

/**
 * Cache flush date response from WSF Fares API
 * Based on /cacheflushdate endpoint
 * Returns: "/Date(timestamp)/"
 */
export type FaresCacheFlushDate = Date;

/**
 * Valid date range for fares data from WSF Fares API
 * Based on /validdaterange endpoint
 */
export type FaresValidDateRange = {
  DateFrom: string; // WSF date format: "/Date(timestamp)/"
  DateThru: string; // WSF date format: "/Date(timestamp)/"
};

/**
 * Terminal information from WSF Fares API
 * Based on /terminals/{TripDate} endpoint
 */
export type FaresTerminal = {
  TerminalID: number;
  Description: string;
};

/**
 * Terminal mate (arriving terminal) from WSF Fares API
 * Based on /terminalmates/{TripDate}/{TerminalID} endpoint
 */
export type TerminalMate = {
  TerminalID: number;
  Description: string;
};

/**
 * Terminal combination fare collection description from WSF Fares API
 * Based on /terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID} endpoint
 */
export type TerminalCombo = {
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  FareCollectionDescription: string;
  IsActive: boolean;
};

/**
 * Terminal combination verbose from WSF Fares API
 * Based on /terminalcomboverbose/{TripDate} endpoint
 */
export type TerminalComboVerbose = {
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  FareCollectionDescription: string;
  IsActive: boolean;
  RouteID: number;
  RouteName: string;
};

/**
 * Fare line item from WSF Fares API
 * Based on /farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip} endpoint
 */
export type FareLineItem = {
  FareLineItemID: number;
  FareLineItem: string;
  Category: string;
  DirectionIndependent: boolean;
  Amount: number;
};

/**
 * Fare line item basic (most popular fares) from WSF Fares API
 * Based on /farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip} endpoint
 */
export type FareLineItemBasic = {
  FareLineItemID: number;
  FareLineItem: string;
  Category: string;
  DirectionIndependent: boolean;
  Amount: number;
};

/**
 * Fare line item verbose from WSF Fares API
 * Based on /farelineitemsverbose/{TripDate} endpoint
 */
export type FareLineItemVerbose = {
  DepartingTerminalID: number;
  DepartingTerminalName: string;
  ArrivingTerminalID: number;
  ArrivingTerminalName: string;
  RouteID: number;
  RouteName: string;
  FareLineItemID: number;
  FareLineItem: string;
  Category: string;
  DirectionIndependent: boolean;
  Amount: number;
  RoundTrip: boolean;
};

/**
 * Fare total calculation request parameters
 * For /faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity} endpoint
 */
export type FareTotalRequest = {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
  roundTrip: boolean;
  fareLineItemIDs: number[];
  quantities: number[];
};

/**
 * Fare total calculation response from WSF Fares API
 * Based on /faretotals endpoint
 */
export type FareTotal = {
  Subtotal: number;
  Tax: number;
  Total: number;
  Currency: string;
  Breakdown: Array<{
    FareLineItemID: number;
    FareLineItem: string;
    Quantity: number;
    UnitPrice: number;
    TotalPrice: number;
  }>;
};

/**
 * Parameters for fare line items queries
 */
export type FareLineItemsParams = {
  tripDate: Date;
  departingTerminalID: number;
  arrivingTerminalID: number;
  roundTrip: boolean;
};

/**
 * Parameters for terminal queries
 */
export type TerminalParams = {
  tripDate: Date;
  terminalID?: number;
};

/**
 * Parameters for terminal mates queries
 */
export type TerminalMatesParams = {
  tripDate: Date;
  terminalID: number;
};
