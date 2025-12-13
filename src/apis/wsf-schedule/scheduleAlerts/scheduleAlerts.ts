import type { EndpointMeta } from "@/apis/types";
import { createFetchAndHook } from "@/shared/factories";
import { wsfScheduleApiMeta } from "../apiMeta";
import {
  type ScheduleAlertsInput,
  scheduleAlertsInputSchema,
} from "./shared/scheduleAlerts.input";
import {
  type AlertDetail,
  alertDetailSchema,
} from "./shared/scheduleAlerts.output";

/**
 * Metadata for the fetchScheduleAlerts endpoint
 */
export const scheduleAlertsMeta = {
  functionName: "fetchScheduleAlerts",
  endpoint: "/alerts",
  inputSchema: scheduleAlertsInputSchema,
  outputSchema: alertDetailSchema.array(),
  sampleParams: {},
  endpointDescription: "List all current schedule alerts.",
  toolDescription: {
    purpose:
      "List all current schedule alerts with detailed text in multiple formats for different display contexts.",
    useWhen: [
      "monitoring system-wide alerts and disruptions",
      "building alert displays for multiple routes",
      "accessing alerts in different formats (bulletin, homepage, IVR)",
    ],
    inputsHighlights: "none",
    returns: "array — all current schedule alerts",
    outputHighlights: [
      "IDs: BulletinID, AlertTypeID",
      "Alert types: AlertType, BulletinFlag, CommunicationFlag, RouteAlertFlag",
      "Text formats: BulletinText (HTML), RouteAlertText (compact), HomepageAlertText (HTML), IVRText",
      "Timing: PublishDate (UTC)",
      "Scope: AllRoutesFlag, AffectedRouteIDs array",
      "Metadata: AlertFullTitle, DisruptionDescription, SortSeq for display ordering",
    ],
  },
} satisfies EndpointMeta<ScheduleAlertsInput, AlertDetail[]>;

/**
 * Factory result for schedule alerts
 */
const scheduleAlertsFactory = createFetchAndHook<
  ScheduleAlertsInput,
  AlertDetail[]
>({
  api: wsfScheduleApiMeta,
  endpoint: scheduleAlertsMeta,
  getEndpointGroup: () =>
    require("./shared/scheduleAlerts.endpoints").scheduleAlertsGroup,
});

/**
 * Fetch function and React Query hook for retrieving all current schedule alerts
 */
export const { fetch: fetchScheduleAlerts, hook: useScheduleAlerts } =
  scheduleAlertsFactory;
