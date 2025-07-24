// WSF Terminals API types
// Documentation: https://www.wsdot.wa.gov/ferries/api/terminals/documentation/rest.html

/**
 * Terminal basics from WSF Terminals API
 * Based on /terminalbasics endpoint
 */
export type TerminalBasics = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  OverheadPassengerLoading: boolean;
  Elevator: boolean;
  WaitingRoom: boolean;
  FoodService: boolean;
  Restroom: boolean;
};

/**
 * Individual bulletin from WSF Terminals API
 * Based on Bulletins array in /terminalbulletins endpoint
 */
export type TerminalBulletinItem = {
  BulletinTitle: string;
  BulletinText: string;
  BulletinSortSeq: number;
  BulletinLastUpdated?: Date;
  BulletinLastUpdatedSortable?: string;
};

/**
 * Terminal bulletins from WSF Terminals API
 * Based on /terminalbulletins endpoint
 */
export type TerminalBulletin = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  Bulletins: TerminalBulletinItem[];
};

/**
 * Terminal locations from WSF Terminals API
 * Based on /terminallocations endpoint
 */
export type TerminalLocation = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  AddressLineOne: string;
  AddressLineTwo: string | null;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Latitude: number;
  Longitude: number;
  Directions: string | null;
  DispGISZoomLoc: Array<{
    Latitude: number;
    Longitude: number;
    ZoomLevel: number;
  }>;
  MapLink: string | null;
};

/**
 * Space information for arrival terminals from WSF Terminals API
 * Based on SpaceForArrivalTerminals array in /terminalsailingspace endpoint
 */
export type TerminalArrivalSpace = {
  TerminalID: number;
  TerminalName: string;
  VesselID: number;
  VesselName: string;
  DisplayReservableSpace: boolean;
  ReservableSpaceCount: number | null;
  ReservableSpaceHexColor: string | null;
  DisplayDriveUpSpace: boolean;
  DriveUpSpaceCount: number;
  DriveUpSpaceHexColor: string;
  MaxSpaceCount: number;
  ArrivalTerminalIDs: number[];
};

/**
 * Departing space information from WSF Terminals API
 * Based on DepartingSpaces array in /terminalsailingspace endpoint
 */
export type TerminalDepartingSpace = {
  Departure: Date;
  IsCancelled: boolean;
  VesselID: number;
  VesselName: string;
  MaxSpaceCount: number;
  SpaceForArrivalTerminals: TerminalArrivalSpace[];
};

/**
 * Terminal sailing space from WSF Terminals API
 * Based on /terminalsailingspace endpoint
 */
export type TerminalSailingSpace = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  DepartingSpaces: TerminalDepartingSpace[];
  IsNoFareCollected: boolean | null;
  NoFareCollectedMsg: string | null;
};

/**
 * Terminal transport link from WSF Terminals API
 * Based on TransitLinks array in /terminaltransports and /terminalverbose endpoints
 */
export type TerminalTransitLink = {
  LinkName: string;
  LinkURL: string;
  SortSeq: number | null;
};

/**
 * Terminal transports from WSF Terminals API
 * Based on /terminaltransports endpoint
 */
export type TerminalTransport = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  ParkingInfo: string;
  ParkingShuttleInfo: string | null;
  AirportInfo: string;
  AirportShuttleInfo: string;
  MotorcycleInfo: string;
  TruckInfo: string;
  BikeInfo: string;
  TrainInfo: string | null;
  TaxiInfo: string | null;
  HovInfo: string | null;
  TransitLinks: TerminalTransitLink[];
};

/**
 * Terminal wait times from WSF Terminals API
 * Based on /terminalwaittimes endpoint
 */
export type TerminalWaitTime = {
  RouteID: number | null;
  RouteName: string | null;
  WaitTimeIVRNotes: string | null;
  WaitTimeLastUpdated: Date;
  WaitTimeNotes: string | null;
};

/**
 * Terminal wait times container from WSF Terminals API
 * Based on /terminalwaittimes endpoint (parent object containing WaitTimes array)
 */
export type TerminalWaitTimes = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  WaitTimes: TerminalWaitTime[];
};

/**
 * Terminal verbose from WSF Terminals API
 * Based on /terminalverbose endpoint
 */
export type TerminalVerbose = {
  TerminalID: number;
  TerminalSubjectID: number;
  RegionID: number;
  TerminalName: string;
  TerminalAbbrev: string;
  SortSeq: number;
  AddressLineOne: string;
  AddressLineTwo: string | null;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  Latitude: number;
  Longitude: number;
  Directions: string | null;
  DispGISZoomLoc: Array<{
    Latitude: number;
    Longitude: number;
    ZoomLevel: number;
  }>;
  MapLink: string | null;
  Elevator: boolean;
  WaitingRoom: boolean;
  FoodService: boolean;
  Restroom: boolean;
  OverheadPassengerLoading: boolean;
  IsNoFareCollected: boolean | null;
  NoFareCollectedMsg: string | null;
  AdaInfo: string | null;
  AdditionalInfo: string | null;
  AirportInfo: string | null;
  AirportShuttleInfo: string | null;
  BikeInfo: string | null;
  ChamberOfCommerce: string | null;
  ConstructionInfo: string | null;
  FacInfo: string | null;
  FareDiscountInfo: string | null;
  FoodServiceInfo: string | null;
  HovInfo: string | null;
  LostAndFoundInfo: string | null;
  MotorcycleInfo: string | null;
  ParkingInfo: string | null;
  ParkingShuttleInfo: string | null;
  RealtimeShutoffFlag: boolean;
  RealtimeShutoffMessage: string | null;
  RealtimeIntroMsg: string | null;
  ResourceStatus: string | null;
  SecurityInfo: string | null;
  TallySystemInfo: string | null;
  TaxiInfo: string | null;
  TrainInfo: string | null;
  TruckInfo: string | null;
  TypeDesc: string | null;
  VisitorLinks: string | null;
  Bulletins: TerminalBulletinItem[];
  TransitLinks: TerminalTransitLink[];
  WaitTimes: TerminalWaitTime[];
};
