/**
 * WSDOT Highway Cameras API Types
 *
 * Based on cURL validation of:
 * - https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help
 * - https://wsdot.wa.gov/traffic/api/Documentation/group___highway_cameras.html
 */

/**
 * Camera location information
 */
export type CameraLocation = {
  /** Description of the camera location */
  Description: string | null;
  /** Direction the camera is facing (N, S, E, W, B for both) */
  Direction: string | null;
  /** Latitude coordinate */
  Latitude: number;
  /** Longitude coordinate */
  Longitude: number;
  /** Milepost location */
  MilePost: number;
  /** Road name (e.g., "SR 9", "I-405") */
  RoadName: string;
};

/**
 * Individual camera information
 */
export type Camera = {
  /** Unique camera identifier */
  CameraID: number;
  /** Camera location details */
  CameraLocation: CameraLocation;
  /** Camera owner information */
  CameraOwner: string | null;
  /** Camera description */
  Description: string | null;
  /** Display latitude coordinate */
  DisplayLatitude: number;
  /** Display longitude coordinate */
  DisplayLongitude: number;
  /** Image height in pixels */
  ImageHeight: number;
  /** URL to the camera image */
  ImageURL: string;
  /** Image width in pixels */
  ImageWidth: number;
  /** Whether the camera is currently active */
  IsActive: boolean;
  /** Owner URL */
  OwnerURL: string | null;
  /** Region code (NW, NC, SC, SW, ER, OL, OS, WA) */
  Region: string;
  /** Sort order for display */
  SortOrder: number;
  /** Camera title/name */
  Title: string;
};

/**
 * Response type for GetCameraAsJson endpoint
 */
export type GetCameraResponse = Camera;

/**
 * Search parameters for SearchCamerasAsJson endpoint
 */
export type SearchCamerasParams = {
  /** State route number (e.g., "9", "405") */
  StateRoute?: string;
  /** Region code (NW, NC, SC, SW, ER, OL, OS, WA) */
  Region?: string;
  /** Starting milepost for search range */
  StartingMilepost?: number;
  /** Ending milepost for search range */
  EndingMilepost?: number;
};
