export const VESSEL_DESCRIPTIONS = {
  VesselAccommodation:
    "Each VesselAccommodation item represents detailed information about vessel amenities including accessibility features (ADA restrooms, elevators), galley availability, restroom locations, and WiFi access. Data updates infrequently.",
  VesselBasic:
    "Each VesselBasic item represents essential vessel details including vessel identification (name and ID), operational status (in service, maintenance, out of service), and ownership information. Data updates infrequently.",
  VesselLocation:
    "Each VesselLocation item represents real-time vessel tracking data including current position (latitude and longitude), speed and heading information, whether or not the vessel is at dock, departure and arrival terminal details, and estimated time of arrival. Data is real time, updated every few seconds.",
  VesselStat:
    "Each VesselStat item represents detailed vessel specifications including physical dimensions (length, beam, draft), engine specifications (count, horsepower, propulsion type), capacity information (passenger count, vehicle space), and historical details (year built, vessel history). Data updates infrequently.",
  VesselVerbose:
    "Each VesselVerbose item represents comprehensive vessel information combining all available data from basic details, accommodations, and specifications in a single response. Data updates infrequently.",
  VesselHistory:
    "Each VesselHistory item represents a historical record for a single sailing between terminals, including the vessel, the departure details (including departure terminal, scheduled departure time, and actual departure time), and the arrival details (including arrival terminal and estimated arrival time). Data updates infrequently.",
  CacheFlushDate:
    "Returns the date and time when the WSF vessel data was last updated. This operation helps applications coordinate caching of vessel data that changes infrequently. When the returned date changes, applications should refresh their cached data. Data updates infrequently.",
} as const;
