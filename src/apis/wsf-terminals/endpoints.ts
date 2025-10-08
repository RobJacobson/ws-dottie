import { z } from "zod";
import type { ApiDefinition, EndpointDefinition } from "@/apis/types";
import * as i from "./original/inputSchemas.original";
import * as o from "./original/outputSchemas.original";

export const wsfTerminalsApi: ApiDefinition = {
  name: "wsf-terminals",
  baseUrl: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  endpoints: [
    /**
     * CacheFlushDate response
     */
    {
      function: "cacheFlushDate",
      endpoint: "/cacheflushdate",
      inputSchema: i.cacheFlushDateSchema,
      outputSchema: o.cacheFlushDateSchema,
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalsCacheFlushDateInput,
      o.TerminalsCacheFlushDate
    >,
    /**
     * TerminalBasic response
     */
    {
      function: "terminalBasics",
      endpoint: "/terminalBasics",
      inputSchema: i.terminalBasicsSchema,
      outputSchema: z.array(o.terminalBasicSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TerminalBasicsInput, o.TerminalBasic[]>,
    {
      function: "terminalBasicsByTerminalId",
      endpoint: "/terminalBasics/{TerminalID}",
      inputSchema: i.terminalBasicsByIdSchema,
      outputSchema: o.terminalBasicSchema,
      sampleParams: { TerminalID: 1 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TerminalBasicsByIdInput, o.TerminalBasic>,
    /**
     * TerminalBulletin response
     */
    {
      function: "terminalBulletins",
      endpoint: "/terminalBulletins",
      inputSchema: i.terminalBulletinsSchema,
      outputSchema: z.array(o.terminalBulletinSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalBulletinsInput,
      o.TerminalBulletin[]
    >,
    {
      function: "terminalBulletinsByTerminalId",
      endpoint: "/terminalBulletins/{TerminalID}",
      inputSchema: i.terminalBulletinsByIdSchema,
      outputSchema: o.terminalBulletinSchema,
      sampleParams: { TerminalID: 3 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalBulletinsByIdInput,
      o.TerminalBulletin
    >,
    /**
     * TerminalLocation response
     */
    {
      function: "terminalLocations",
      endpoint: "/terminalLocations",
      inputSchema: i.terminalLocationsSchema,
      outputSchema: z.array(o.terminalLocationSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalLocationsInput,
      o.TerminalLocation[]
    >,
    {
      function: "terminalLocationsByTerminalId",
      endpoint: "/terminalLocations/{TerminalID}",
      inputSchema: i.terminalLocationsByIdSchema,
      outputSchema: o.terminalLocationSchema,
      sampleParams: { TerminalID: 5 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalLocationsByIdInput,
      o.TerminalLocation
    >,
    /**
     * TerminalSailingSpace response
     */
    {
      function: "terminalSailingSpace",
      endpoint: "/terminalSailingSpace",
      inputSchema: i.terminalSailingSpaceSchema,
      outputSchema: z.array(o.terminalSailingSpaceSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceInput,
      o.TerminalSailingSpace[]
    >,
    {
      function: "terminalSailingSpaceByTerminalId",
      endpoint: "/terminalSailingSpace/{TerminalID}",
      inputSchema: i.terminalSailingSpaceByIdSchema,
      outputSchema: o.terminalSailingSpaceSchema,
      sampleParams: { TerminalID: 7 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalSailingSpaceByIdInput,
      o.TerminalSailingSpace
    >,
    /**
     * TerminalTransportationOption response
     */
    {
      function: "terminalTransports",
      endpoint: "/terminalTransports",
      inputSchema: i.terminalTransportsSchema,
      outputSchema: z.array(o.terminalTransportationOptionSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalTransportsInput,
      o.TerminalTransportationOption[]
    >,
    {
      function: "terminalTransportsByTerminalId",
      endpoint: "/terminalTransports/{TerminalID}",
      inputSchema: i.terminalTransportsByIdSchema,
      outputSchema: o.terminalTransportationOptionSchema,
      sampleParams: { TerminalID: 10 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalTransportsByIdInput,
      o.TerminalTransportationOption
    >,
    /**
     * TerminalVerbose response
     */
    {
      function: "terminalVerbose",
      endpoint: "/terminalVerbose",
      inputSchema: i.terminalVerboseSchema,
      outputSchema: z.array(o.terminalVerboseSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<i.TerminalVerboseInput, o.TerminalVerbose[]>,
    {
      function: "terminalVerboseByTerminalId",
      endpoint: "/terminalVerbose/{TerminalID}",
      inputSchema: i.terminalVerboseByIdSchema,
      outputSchema: o.terminalVerboseSchema,
      sampleParams: { TerminalID: 4 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalVerboseByIdInput,
      o.TerminalVerbose
    >,
    /**
     * TerminalWaitTime response
     */
    {
      function: "terminalWaitTimes",
      endpoint: "/terminalWaitTimes",
      inputSchema: i.terminalWaitTimesSchema,
      outputSchema: z.array(o.terminalWaitTimeSchema),
      sampleParams: {},
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesInput,
      o.TerminalWaitTime[]
    >,
    {
      function: "terminalWaitTimesByTerminalId",
      endpoint: "/terminalWaitTimes/{TerminalID}",
      inputSchema: i.terminalWaitTimesByIdSchema,
      outputSchema: o.terminalWaitTimeSchema,
      sampleParams: { TerminalID: 11 },
      cacheStrategy: "STATIC",
    } satisfies EndpointDefinition<
      i.TerminalWaitTimesByIdInput,
      o.TerminalWaitTime
    >,
  ],
};
