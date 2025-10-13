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
      function: "getActiveSeasons",
      endpoint: "/activeseasons",
      inputSchema: i.activeScheduledSeasonsSchema,
      outputSchema: z.array(o.scheduleBaseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.ActiveScheduledSeasonsInput,
      o.ScheduleBase[]
    >,
    /**
     * Sailing response
     */
    {
      function: "getSailingsBySchedRouteID",
      endpoint: "/allsailings/{SchedRouteID}",
      inputSchema: i.allSchedSailingsBySchedRouteSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.AllSchedSailingsBySchedRouteInput,
      o.Sailing[]
    >,
    /**
     * CacheFlushDate response
     */
    {
      function: "getCacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.ValidDateRangeInput,
      o.SchedulesCacheFlushDate
    >,
    /**
     * RouteDetail response
     */
    {
      function: "getRouteDetailsByTripDate",
      endpoint: "/routedetails/{TripDate}",
      inputSchema: i.routeDetailsByTripDateSchema,
      outputSchema: z.array(o.routeDetailSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateInput,
      o.RouteDetail[]
    >,
    {
      function: "getRouteDetailsByTripDateAndRouteId",
      endpoint: "/routedetails/{TripDate}/{RouteID}",
      inputSchema: i.routeDetailsByTripDateAndRouteIdSchema,
      outputSchema: o.routeDetailSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 1 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndRouteIdInput,
      o.RouteDetail
    >,
    {
      function: "getRouteDetailsByTripDateAndTerminals",
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
      description: "",
    } satisfies EndpointDefinition<
      i.RouteDetailsByTripDateAndTerminalsInput,
      o.RouteDetail[]
    >,
    /**
     * RouteBase response
     */
    {
      function: "getRoutesByTripDate",
      endpoint: "/routes/{TripDate}",
      inputSchema: i.routesSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.RoutesInput, o.Route[]>,
    {
      function: "getRoutesByTripDateAndTerminals",
      endpoint: "/routes/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.routesByTerminalsSchema,
      outputSchema: z.array(o.routeSchema),
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.RoutesByTerminalsInput, o.Route[]>,
    /**
     * ServiceDisruption response
     */
    {
      function: "getRoutesHavingServiceDisruptionsByTripDate",
      endpoint: "/routeshavingservicedisruptions/{TripDate}",
      inputSchema: i.routesHavingServiceDisruptionsSchema,
      outputSchema: z.array(o.serviceDisruptionSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.RoutesHavingServiceDisruptionsInput,
      o.ServiceDisruption[]
    >,
    {
      function: "getSailingsBySchedRouteID",
      endpoint: "/sailings/{SchedRouteID}",
      inputSchema: i.sailingsByRouteIdSchema,
      outputSchema: z.array(o.sailingSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.SailingsByRouteIdInput, o.Sailing[]>,
    /**
     * Alert response
     */
    {
      function: "getScheduleAlerts",
      endpoint: "/alerts",
      inputSchema: i.allAlertsSchema,
      outputSchema: z.array(o.alertDetailSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.AllAlertsInput, o.AlertDetail[]>,
    {
      function: "getScheduleByTripDateAndRouteId",
      endpoint: "/schedule/{TripDate}/{RouteID}",
      inputSchema: i.scheduleByRouteSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.ScheduleByRouteInput, o.Schedule>,
    {
      function: "getScheduleByTripDateAndDepartingTerminalIdAndTerminalIds",
      endpoint:
        "/schedule/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}",
      inputSchema: i.scheduleByTerminalComboSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: {
        TripDate: datesHelper.tomorrow(),
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.ScheduleByTerminalComboInput, o.Schedule>,
    /**
     * SchedRoute response
     */
    {
      function: "getScheduledRoutes",
      endpoint: "/schedroutes",
      inputSchema: i.scheduledRoutesSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.ScheduledRoutesInput, o.Route[]>,
    {
      function: "getScheduledRoutesById",
      endpoint: "/schedroutes/{ScheduleID}",
      inputSchema: i.scheduledRoutesByScheduleIdSchema,
      outputSchema: z.array(o.schedRouteSchema),
      sampleParams: { ScheduleID: 193 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.ScheduledRoutesByScheduleIdInput,
      o.Route[]
    >,
    {
      function: "getScheduleTodayByRoute",
      endpoint: "/scheduletoday/{RouteID}/{OnlyRemainingTimes}",
      inputSchema: i.scheduleTodayByRouteSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: { RouteID: 9, OnlyRemainingTimes: false },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.ScheduleTodayByRouteInput, o.Schedule>,
    {
      function: "getScheduleTodayByTerminals",
      endpoint:
        "/scheduletoday/{DepartingTerminalID}/{ArrivingTerminalID}/{OnlyRemainingTimes}",
      inputSchema: i.todaysScheduleByTerminalComboSchema,
      outputSchema: o.scheduleSchema,
      sampleParams: {
        DepartingTerminalID: 1,
        ArrivingTerminalID: 10,
        OnlyRemainingTimes: false,
      },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.TodaysScheduleByTerminalComboInput,
      o.Schedule
    >,
    /**
     * ValidDateRange response
     */
    {
      function: "getScheduleValidDateRange",
      endpoint: "/validdaterange",
      inputSchema: i.validDateRangeSchema,
      outputSchema: o.validDateRangeSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.ValidDateRangeInput, o.ValidDateRange>,
    /**
     * Terminal response (terminal mates actually returns simple terminals)
     */
    {
      function: "getTerminalMates",
      endpoint: "/terminalmates/{TripDate}/{TerminalID}",
      inputSchema: i.terminalMatesSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), TerminalID: 1 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TerminalMatesInput, o.Terminal[]>,
    /**
     * Terminal response
     */
    {
      function: "getTerminals",
      endpoint: "/terminals/{TripDate}",
      inputSchema: i.terminalsSchema,
      outputSchema: z.array(o.terminalSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TerminalsInput, o.Terminal[]>,
    {
      function: "getTerminalsAndMates",
      endpoint: "/terminalsandmates/{TripDate}",
      inputSchema: i.terminalsAndMatesSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow() },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TerminalsAndMatesInput, o.TerminalMate[]>,
    {
      function: "getTerminalsAndMatesByRoute",
      endpoint: "/terminalsandmatesbyroute/{TripDate}/{RouteID}",
      inputSchema: i.terminalsAndMatesByRouteSchema,
      outputSchema: z.array(o.terminalMateSchema),
      sampleParams: { TripDate: datesHelper.tomorrow(), RouteID: 9 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.TerminalsAndMatesByRouteInput,
      o.TerminalMate[]
    >,
    /**
     * TimeAdjustment response
     */
    {
      function: "getTimeAdjustments",
      endpoint: "/timeadj",
      inputSchema: i.timeAdjSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TimeAdjInput, o.TimeAdjustment[]>,
    {
      function: "getTimeAdjustmentsByRoute",
      endpoint: "/timeadjbyroute/{RouteID}",
      inputSchema: i.timeAdjByRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { RouteID: 1 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<i.TimeAdjByRouteInput, o.TimeAdjustment[]>,
    {
      function: "getTimeAdjustmentsBySchedRoute",
      endpoint: "/timeadjbyschedroute/{SchedRouteID}",
      inputSchema: i.timeAdjBySchedRouteSchema,
      outputSchema: z.array(o.timeAdjustmentSchema),
      sampleParams: { SchedRouteID: 2401 },
      cacheStrategy: "STATIC",
      description: "",
    } satisfies EndpointDefinition<
      i.TimeAdjBySchedRouteInput,
      o.TimeAdjustment[]
    >,
  ],
};
