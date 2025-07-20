// WSF Fares API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html
// API Help: https://www.wsdot.wa.gov/ferries/api/fares/rest/help

/**
 * Cache flush date response from WSF Fares API
 * Based on /cacheflushdate endpoint
 * Returns: "/Date(timestamp)/" format
 */
export type FaresCacheFlushDate = Date;

/**
 * Valid date range for fares data from WSF Fares API
 * Based on /validdaterange endpoint
 */
export type FaresValidDateRange = {
  DateFrom: Date; // WSF date format: "/Date(timestamp)/"
  DateThru: Date; // WSF date format: "/Date(timestamp)/"
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
 * Same structure as FaresTerminal
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
  DepartingDescription: string;
  ArrivingDescription: string;
  CollectionDescription: string;
};

/**
 * Terminal combination verbose from WSF Fares API
 * Based on /terminalcomboverbose/{TripDate} endpoint
 */
export type TerminalComboVerbose = {
  DepartingTerminalID: number;
  DepartingDescription: string;
  ArrivingTerminalID: number;
  ArrivingDescription: string;
  CollectionDescription: string;
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
 * Same structure as FareLineItem
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
  DepartingDescription: string;
  ArrivingTerminalID: number;
  ArrivingDescription: string;
  FareLineItemID: number;
  FareLineItem: string;
  Category: string;
  DirectionIndependent: boolean;
  Amount: number;
  RoundTrip: boolean;
};

/**
 * Fare line items verbose response from WSF Fares API
 * Based on /farelineitemsverbose/{TripDate} endpoint
 * This is the actual response structure from the API
 */
export type FareLineItemsVerboseResponse = {
  TerminalComboVerbose: TerminalComboVerbose[];
  LineItemLookup: Array<{
    TerminalComboIndex: number;
    LineItemIndex: number;
    RoundTripLineItemIndex: number;
  }>;
  LineItems: FareLineItem[][];
  RoundTripLineItems: FareLineItem[][];
};

/**
 * Fare total calculation response from WSF Fares API
 * Based on /faretotals endpoint
 */
export type FareTotal = {
  TotalType: number; // 0 = Depart, 1 = Return, etc.
  Description: string;
  BriefDescription: string;
  Amount: number;
};
