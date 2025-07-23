// Shared types for API data across the application

export interface ApiItem {
  id?: string | number;
  vesselId?: number;
  terminalId?: number;
  name?: string;
  title?: string;
  description?: string;
  vesselName?: string;
  cameraId?: number;
  cameraName?: string;
  eventId?: string;
  headlineDescription?: string;
  routeId?: number;
  routeName?: string;
  scheduleId?: number;
  scheduleName?: string;
  [key: string]: unknown;
}

export interface ApiData {
  data: ApiItem[] | ApiItem | null | undefined;
  isLoading: boolean;
  error: Error | null;
}
