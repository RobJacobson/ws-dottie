import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import { datesHelper } from "@/shared/utils";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsfScheduleApi: ApiDefinition = {
  name: "wsf-schedule",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/schedule/rest",
  endpoints: [
    /**
     * ScheduleBase response
     */
    {
      function: "activeSeasons",
      endpoint: "/activeseasons",
      inputSchema: i.activeScheduledSeasonsSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.ActiveScheduledSeasonsInput,
      o.ScheduleBase[]
    >,
    /**
     * Sailing response
     */
    {
      function: "allSailings",
      endpoint: "/allsailings/{SchedRouteID}",
      inputSchema: i.allSchedSailingsBySchedRouteSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.AllSchedSailingsBySchedRouteInput,
      o.Sailing[]
    >,
    /**
     * CacheFlushDate response
     */
    {
      function: "cacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.ValidDateRangeInput,
      o.SchedulesCacheFlushDate
    >,
    /**
     * RouteDetail response
     */
    {
      function: "routeDetailsByTripDate",
      endpoint: "/routedetails/{TripDate}",
      inputSchema: i.routeDetailsByTripDateSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateInput,
      o.RouteDetail[]
    >,
    {
      function: "routeDetailsByTripDateAndRouteId",
      endpoint: "/routedetails/{TripDate}/{RouteID}",
      inputSchema: i.routeDetailsByTripDateAndRouteIdSchema,
      outputSchema: o.routeDetailSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndRouteIdInput,
      o.RouteDetail
    >,
    {
      function: "routeDetailsByTripDateAndTerminals",
      endpoint:
        "/routedetails/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routeDetailsByTripDateAndTerminalsSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndTerminalsInput,
      o.RouteDetail[]
    >,
    /**
     * RouteBase response
     */
    {
      function: "routesByTripDate",
      endpoint: "/routes/{TripDate}",
      inputSchema: i.routesSchema,
      outputSchema: z.array(o.routeBaseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.RoutesInput, o.RouteBase[]>,
    {
      function: "routesByTerminals",
      endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routesByTerminalsSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.RoutesByTerminalsInput, o.Route[]>,
    /**
     * ServiceDisruption response
     */
    {
      function: "routesHavingServiceDisruptions",
      endpoint: "/routeshavingservicedisruptions/{TripDate}",
      inputSchema: i.routesHavingServiceDisruptionsSchema,
      outputSchema: z.array(o.serviceDisruptionSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.RoutesHavingServiceDisruptionsInput,
      o.ServiceDisruption[]
    >,
    {
      function: "sailings",
      endpoint: "/sailings/{SchedRouteID}",
      inputSchema: i.sailingsByRouteIdSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.SailingsByRouteIdInput, o.Sailing[]>,
    /**
     * Alert response
     */
    {
      function: "scheduleAlerts",
      endpoint: "/alerts",
      inputSchema: i.allAlertsSchema,
      outputSchema: z.array(o.alertSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.AllAlertsInput, o.Alert[]>,
    {
      function: "scheduleByRoute",
      endpoint: "/schedule/{TripDate}/{RouteID}",
      inputSchema: i.scheduleByRouteSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.ScheduleByRouteInput, o.ScheduleBase[]>,
    {
      function: "scheduleByTerminals",
      endpoint:
        "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.scheduleByTerminalComboSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.ScheduleByTerminalComboInput,
      o.ScheduleBase[]
    >,
    /**
     * SchedRoute response
     */
    {
      function: "scheduledRoutes",
      endpoint: "/schedroutes",
      inputSchema: i.scheduledRoutesSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.ScheduledRoutesInput, o.Route[]>,
    {
      function: "scheduledRoutesById",
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: i.scheduledRoutesByScheduleIdSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.ScheduledRoutesByScheduleIdInput,
      o.Route[]
    >,
    {
      function: "scheduleTodayByRoute",
      endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
      inputSchema: i.scheduleTodayByRouteSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.ScheduleTodayByRouteInput,
      o.ScheduleBase[]
    >,
    {
      function: "scheduleTodayByTerminals",
      endpoint:
        "/scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}",
      inputSchema: i.todaysScheduleByTerminalComboSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        OnlyRemainingTimes: false,
      },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TodaysScheduleByTerminalComboInput,
      o.ScheduleBase[]
    >,
    /**
     * ValidDateRange response
     */
    {
      function: "scheduleValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.ValidDateRangeInput, o.ValidDateRange>,
    /**
     * TerminalMate response
     */
    {
      function: "terminalMates",
      endpoint: "/terminalmates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TerminalMatesInput, o.TerminalMate[]>,
    /**
     * Terminal response
     */
    {
      function: "terminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TerminalsInput, o.Terminal[]>,
    {
      function: "terminalsAndMates",
      endpoint: "/terminalsandmates/{TripDate}",
      inputSchema: i.terminalsAndMatesSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TerminalsAndMatesInput, o.TerminalMate[]>,
    {
      function: "terminalsAndMatesByRoute",
      endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
      inputSchema: i.terminalsAndMatesByRouteSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalsAndMatesByRouteInput,
      o.TerminalMate[]
    >,
    /**
     * TimeAdjustment response
     */
    {
      function: "timeAdjustments",
      endpoint: "/timeadj",
      inputSchema: i.timeAdjSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TimeAdjInput, o.TimeAdjustment[]>,
    {
      function: "timeAdjustmentsByRoute",
      endpoint: "/timeadjbyroute/{RouteID}",
      inputSchema: i.timeAdjByRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { RouteID: 1 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TimeAdjByRouteInput, o.TimeAdjustment[]>,
    {
      function: "timeAdjustmentsBySchedRoute",
      endpoint: "/timeadjbyschedroute/{SchedRouteID}",
      inputSchema: i.timeAdjBySchedRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TimeAdjBySchedRouteInput,
      o.TimeAdjustment[]
    >,
  ],
};
