# Handoff: Correct Bruno requests for the twelve WSDOT APIs

> **Task**: Audit and fix `bruno/wsdot-*` request files the same way WSF Schedule, Fares, Terminals, and Vessels were just corrected. Align each `.bru` URL with the official REST Help page **and** the Zod `endpoint:` string in `src/apis/wsdot-*`. Make the Bruno changes. Do not redo WSF.
>
> **Out of scope unless the user asks**: TypeScript, Zod schemas, `docs/guides/endpoints.md`, commits, PRs.

## Why this exists

A prior agent found the Bruno collection was generated with invented resource names, missing path/query parameters, and the wrong ID types. WSF APIs in `bruno/wsf-*` are already fixed and live-tested. The twelve **WSDOT Traveler Information** APIs in `bruno/wsdot-*` have **not** been through that pass.

Index of REST Help pages: [WSDOT Traveler Information API](https://wsdot.wa.gov/traffic/api/)

## Already done (do not repeat)

| API | Bruno folder | Status |
|---|---|---|
| WSF Schedule | `bruno/wsf-schedule/` | Corrected to official lowercase paths; 25/25 wrapped ops |
| WSF Fares | `bruno/wsf-fares/` | Corrected; added missing terminal-mates |
| WSF Terminals | `bruno/wsf-terminals/` | Corrected |
| WSF Vessels | `bruno/wsf-vessels/` | Corrected |

Env vars added during that work (keep; extend as needed): `route_id`, `schedule_id`, `only_remaining_times`, `round_trip`, `fare_line_item_id`, `quantity`. `sched_route_id` was updated to a live value (`2447`).

## Goal

For each of the twelve WSDOT APIs:

1. One Bruno request per Zod-wrapped operation (no extras, no missing).
2. URL path + query params match the official REST Help **operation URI**.
3. Parameter names and types match the Zod input schema (`sampleParams` / `*.input.ts`).
4. Env vars exist for every required parameter, with values that succeed against the live API.
5. File / `meta.name` naming is consistent with siblings and with `functionName` in endpoint meta.

Do **not** wrap official operations that have no Zod endpoint (same rule used for WSF `/alternativeformats`).

---

## Sources of truth (in this order)

When they disagree, **official REST Help wins for the live URL**. If Help and Zod disagree only on casing (`GetX` vs `getX`), follow Help, then live-test; IIS is usually case-insensitive. If they disagree on **resource name, parameter name, or arity**, treat that as a real bug: fix Bruno to the live Help URI, and **report** the Zod mismatch without changing TypeScript unless asked.

1. **Official REST Help** (table below). Fetch the Help page; it lists each operation URI.
2. **Zod `endpoint:`** in `src/apis/<api>/**/*.ts` (also summarized in `docs/guides/endpoints.md`, which can lag).
3. **Input schemas** in `src/apis/<api>/**/shared/*.input.ts` and `sampleParams` on the endpoint meta.
4. **Local doc mirrors** in `docs/official-docs/api-specs/wsdot-*` and the Doxygen HTML links in `docs/official-docs/api-specs/wsdot-links.md`. These are class docs, not always REST URIs — prefer Help for paths.
5. **Live smoke test** of the corrected URL with `AccessCode`.

## The twelve APIs

Help URLs are relative to `https://wsdot.wa.gov/traffic/api/` as listed in the REST column of the index table.

| # | API | Bruno folder | Code | REST Help |
|---|---|---|---|---|
| 1 | Border Crossings | `bruno/wsdot-border-crossings/` | `src/apis/wsdot-border-crossings/` | [BorderCrossingsREST.svc/Help](https://wsdot.wa.gov/traffic/api/BorderCrossings/BorderCrossingsREST.svc/Help) |
| 2 | Bridge Clearances | `bruno/wsdot-bridge-clearances/` | `src/apis/wsdot-bridge-clearances/` | [ClearanceREST.svc/Help](https://wsdot.wa.gov/traffic/api/Bridges/ClearanceREST.svc/Help) |
| 3 | Commercial Vehicle Restrictions | `bruno/wsdot-commercial-vehicle-restrictions/` | `src/apis/wsdot-commercial-vehicle-restrictions/` | [CVRestrictionsREST.svc/Help](https://wsdot.wa.gov/traffic/api/CVRestrictions/CVRestrictionsREST.svc/Help) |
| 4 | Highway Alerts | `bruno/wsdot-highway-alerts/` | `src/apis/wsdot-highway-alerts/` | [HighwayAlertsREST.svc/Help](https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help) |
| 5 | Highway Cameras | `bruno/wsdot-highway-cameras/` | `src/apis/wsdot-highway-cameras/` | [HighwayCamerasREST.svc/Help](https://wsdot.wa.gov/traffic/api/HighwayCameras/HighwayCamerasREST.svc/Help) |
| 6 | Mountain Pass Conditions | `bruno/wsdot-mountain-pass-conditions/` | `src/apis/wsdot-mountain-pass-conditions/` | [MountainPassConditionsREST.svc/Help](https://wsdot.wa.gov/traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/Help) |
| 7 | Toll Rates | `bruno/wsdot-toll-rates/` | `src/apis/wsdot-toll-rates/` | [TollRatesREST.svc/Help](https://wsdot.wa.gov/traffic/api/TollRates/TollRatesREST.svc/Help) |
| 8 | Traffic Flow | `bruno/wsdot-traffic-flow/` | `src/apis/wsdot-traffic-flow/` | [TrafficFlowREST.svc/Help](https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help) |
| 9 | Travel Times | `bruno/wsdot-travel-times/` | `src/apis/wsdot-travel-times/` | [TravelTimesREST.svc/Help](https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help) |
| 10 | Weather Information | `bruno/wsdot-weather-information/` | `src/apis/wsdot-weather-information/` | [WeatherInformationREST.svc/Help](https://wsdot.wa.gov/traffic/api/WeatherInformation/WeatherInformationREST.svc/Help) |
| 11 | Weather Stations | `bruno/wsdot-weather-stations/` | `src/apis/wsdot-weather-stations/` | [WeatherStationsREST.svc/Help](https://wsdot.wa.gov/traffic/api/WeatherStations/WeatherStationsREST.svc/Help) |
| 12 | More Weather Information (Scanweb) | `bruno/wsdot-weather-readings/` | `src/apis/wsdot-weather-readings/` | [api/Scanweb](https://wsdot.wa.gov/traffic/api/api/Scanweb) |

Scanweb is **not** a WCF `*REST.svc` service. Zod base URL is `https://www.wsdot.wa.gov/traffic/api/api` with paths `/Scanweb`, `/Scanweb/SurfaceMeasurements`, `/Scanweb/SubSurfaceMeasurements`.

---

## How WSDOT differs from WSF (do not copy WSF URL style)

| | WSF (already fixed) | WSDOT (this task) |
|---|---|---|
| Auth query param | `apiaccesscode` | `AccessCode` |
| Typical URI | path segments `/scheduletoday/{RouteID}/...` | WCF REST methods `/getAlertsAsJson?AlertID=` |
| Resource casing | official Help is **lowercase concatenated** | Help usually shows **GetXxxAsJson**; Zod mixes `Get` / `get` |
| Env base URL var | `wsf_*_base_url` | `wsdot_*_base_url` in `bruno/environments/ws-dottie-env.bru` |

Bruno `.bru` shape after the WSF cleanup (keep this formatting: 2-space indent):

```
meta {
  name: GetAlerts
  type: http
  seq: 1
}

get {
  url: {{wsdot_highway_alerts_base_url}}/getAlertsAsJson?AccessCode={{WSDOT_ACCESS_TOKEN}}
  body: none
  auth: inherit
}

params:query {
  AccessCode: {{WSDOT_ACCESS_TOKEN}}
}
```

Required query params belong both in the `url:` string and in `params:query`.

---

## Method (per API)

1. Read the REST Help operations table.
2. Grep `endpoint:` under `src/apis/<api>/`.
3. Grep `url:` under `bruno/<api>/`.
4. Diff: missing requests, extra/duplicate files, wrong method name, missing/wrong query params, wrong param names, stale env values.
5. Rename files when the name is wrong or inconsistent with siblings (`get-terminal-bullets` → `get-terminal-bulletins` was the WSF equivalent).
6. Add env vars rather than hardcoding; do not reuse WSF-only vars for WSDOT concepts (`route_id` is a ferry route; `route` / `state_route` are highways).
7. Smoke-test **every** corrected URL against the live API. Print status + byte size + path only — never echo `WSDOT_ACCESS_TOKEN`.
8. If an env sample 404s (stale ID), replace it with a value from a list endpoint, as was done for `schedule_id` / `sched_route_id`.

Sandbox note: `curl` may be missing from `PATH`. Use `/usr/bin/python3` + `urllib` (and `export PATH="/usr/bin:/bin:..."` if needed).

---

## Starting findings (verify against Help; do not assume)

These were spotted while preparing this note. Treat them as a checklist, not a complete audit.

### 1. Border Crossings

- Bruno: `/GetBorderCrossingsAsJson` — likely OK vs Zod `/GetBorderCrossingsAsJson`.
- Confirm Help and that AccessCode is the only required param.

### 2. Bridge Clearances

- List: Bruno `/GetClearancesAsJson` vs Zod `/getClearancesAsJson` (casing only).
- By route: Bruno **`/GetClearancesByRouteAsJson?Route=`** vs Zod **`/getClearancesAsJson?Route={Route}`**. Invented method name is likely wrong. Confirm on Help.

### 3. Commercial Vehicle Restrictions

- Duplicate Bruno files for the “with id” list:
  - `cv-restriction-data/get-commercial-vehicle-restrictions-with-id.bru`
  - `cv-restriction-data-with-id/get-cv-restriction-data-with-id.bru`
- Zod `fetchCommercialVehicleRestrictionsWithId` is **`/getCommercialVehicleRestrictionsWithIdAsJson` with empty input** (returns the full list *including* IDs). Bruno currently appends `&Id={{cv_restriction_id}}`. That param is probably invalid.
- Keep one request that matches Zod; delete or fix the duplicate.

### 4. Highway Alerts

- `search-alerts.bru` is **`/SearchAlertsAsJson?SearchText=`**. Zod is **`/searchAlertsAsJson?StateRoute=&Region=&SearchTimeStart=&SearchTimeEnd=&StartingMilepost=&EndingMilepost=`**. Wrong method arity and params.
- Other alert GETs look closer (`GetAlertAsJson`, `GetAlertsAsJson`, `GetAlertsByMapAreaAsJson`, `GetAlertsByRegionIDAsJson`, `GetMapAreasAsJson`, `GetEventCategoriesAsJson`) — still confirm casing and param names on Help (`AlertID`, `MapArea`, `RegionID`).

### 5. Highway Cameras

- `search-highway-cameras-by-route-and-milepost.bru` is **`/GetCamerasByRouteAndMilepostAsJson?Route=`**. Zod is **`/searchCamerasAsJson`** with optional `StateRoute`, `Region`, `StartingMilepost`, `EndingMilepost`. Invented method; `Route` vs `StateRoute`. Sample in code uses `StateRoute: "I-5"`; env `route: 005` is a different identifier.
- `get-highway-camera-by-camera-id.bru` should be `getCameraAsJson?CameraID=`.

### 6. Mountain Pass Conditions

- Zod endpoint is intentionally **`/getMountainPassConditionAsJon?PassConditionID={PassConditionID}`** (comment: typo in the original URL). Bruno uses **`/GetMountainPassConditionAsJson?MountainPassID=`**. Live-test the official typo **and** the param name (`PassConditionID` vs `MountainPassID`). Prefer whatever Help + live API actually accept.

### 7. Toll Rates

- `get-trip-rates-by-date.bru` is **`?Date={{trip_date}}`**. Zod is **`/getTripRatesByDateAsJson?FromDate={FromDate}&ToDate={ToDate}`**.
- `trip_date` is a ferry trip date (`2026-12-20`). Toll history likely needs its own `from_date` / `to_date` (env already has `date_start` / `date_end` and `search_time_*`).
- Remaining toll ops (`getTollRatesAsJson`, `getTollTripInfoAsJson`, `getTollTripRatesAsJson`, `getTripRatesByVersionAsJson?Version=`, `getTollTripVersionAsJson`) — confirm Help.

### 8. Traffic Flow

- `/GetTrafficFlowsAsJson` and `/GetTrafficFlowAsJson?FlowDataID=` vs Zod `getTrafficFlow(s)AsJson`. Confirm Help; `flow_data_id: 2482` may be stale.

### 9. Travel Times

- `/GetTravelTimesAsJson` and `/GetTravelTimeAsJson?TravelTimeID=` vs Zod `getTravelTime(s)AsJson`. Confirm Help.

### 10. Weather Information

- By station: Bruno calls **`GetCurrentWeatherInformationAsJson?StationID=`** (list method + extra query). Zod is **`/GetCurrentWeatherInformationByStationIDAsJson?StationID=`**.
- Search: Bruno **`SearchWeatherInformationAsJson?SearchText=`**. Zod is **`StationID`, `SearchStartTime`, `SearchEndTime`**.
- Multi-station: Bruno **`GetCurrentWeatherForStationsAsJson` with no `StationList`**. Zod requires `StationList` (comma-separated IDs).
- List-all `GetCurrentWeatherInformationAsJson` is probably fine.

### 11. Weather Stations

- Bruno **`/GetWeatherStationsAsJson`**. Zod **`/GetCurrentStationsAsJson`**. Confirm Help; this is a resource-name mismatch, not just casing.

### 12. Weather Readings (Scanweb) — highest severity

- Bruno env: `wsdot_weather_readings_base_url: https://www.wsdot.wa.gov/traffic/api/weatherreadings/weatherreadingsrest.svc` — **wrong host path**. Zod `apiMeta.baseUrl` is `https://www.wsdot.wa.gov/traffic/api/api`.
- Bruno operations `GetWeatherReadingsAsJson`, `GetSurfaceMeasurementsAsJson`, `GetSubSurfaceMeasurementsAsJson` **do not exist**. Correct paths: `/Scanweb`, `/Scanweb/SurfaceMeasurements`, `/Scanweb/SubSurfaceMeasurements`.
- Confirm on [Scanweb REST](https://wsdot.wa.gov/traffic/api/api/Scanweb) whether `AccessCode` is required (other WSDOT services need it; Scanweb may differ).

---

## Env (`bruno/environments/ws-dottie-env.bru`)

Existing WSDOT-oriented vars: `route`, `alert_id`, `region_id`, `map_area`, `state_route`, `pass_condition_id`, `starting_milepost`, `ending_milepost`, `search_time_start`, `search_time_end`, `date_start`, `date_end`, `flow_data_id`, `travel_time_id`, `station_id`, `camera_id`, `cv_restriction_id`, `search_text`, `version`.

Likely additions (only if a corrected request needs them): `station_list`, `from_date` / `to_date` for tolls (or reuse `date_start` / `date_end`), `search_start_time` / `search_end_time` if the existing `search_time_*` format is wrong for weather (Zod weather search wants ISO-8601 datetimes).

Do **not** use `search_text` for APIs that do not take `SearchText`. Do **not** use ferry `route_id` for highway `StateRoute`.

Fix `wsdot_weather_readings_base_url` to match `src/apis/wsdot-weather-readings/apiMeta.ts`.

---

## Coverage check

`docs/guides/endpoints.md` currently lists **35** WSDOT Zod operations. There are **36** `bruno/wsdot-*/*.bru` files — the extra is almost certainly the duplicate CV “with id” request. After the pass, Bruno file count should equal wrapped Zod endpoints (plus nothing for undocumented Help-only ops).

## Constraints

- Bruno + env only, unless the user explicitly asks to fix Zod.
- Do not skip hooks or commit unless asked.
- Do not print or commit secrets; `WSDOT_ACCESS_TOKEN` is already in the Bruno env (treat as local-only).
- Do not use Context7 (`ctx7`). For live Help pages use Exa MCP (`web_search_exa` / `web_fetch_exa`) or fetch the Help URL directly.
- Prefer official Help URI casing; live-test. Report Help vs Zod disagreements in the wrap-up.

## Done when

- Each of the twelve APIs has Bruno URLs that 200 against the live service (or a documented empty/400 that matches official behavior, e.g. invalid ID).
- Missing wrapped endpoints added; duplicates and invented method names removed.
- Env vars updated and smoke-tested.
- Wrap-up lists what changed, any Help vs Zod mismatches left in code, and ops that exist on Help but are intentionally omitted (no Zod wrapper).
