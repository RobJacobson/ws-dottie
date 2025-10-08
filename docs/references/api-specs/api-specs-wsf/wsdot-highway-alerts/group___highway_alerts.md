# Highway Alerts

| Column | Column | Column |
| --- | --- | --- |
 | Classes |  | 
 | class | [HighwayAlerts](class_highway_alerts.html) | 
 |  |  | 
 | class | [Alert](class_alert.html) | 
 |  |  | 


| Column | Column | Column |
| --- | --- | --- |
 | Functions |  | 
 | [Alert](class_alert.html)[] | [HighwayAlerts.GetAlerts](group___highway_alerts.html#gac91129b27f2b1aecf4844d5b1e48e567) (string AccessCode) | 
 |  |  | 
 | System.Data.DataSet | [HighwayAlerts.GetAlertsAsDataSet](group___highway_alerts.html#ga7dba7db9b30d3d0c0ac47657cc2b68c8) (string AccessCode) | 
 |  |  | 
 | [Alert](class_alert.html)[] | [HighwayAlerts.SearchAlerts](group___highway_alerts.html#ga4e066d4e34492a227147fa99f188ca8c) (string AccessCode, string StateRoute, string Region, DateTime? SearchTimeStart, DateTime? SearchTimeEnd, decimal? StartingMilepost, decimal? EndingMilepost) | 
 |  |  | 
 | [Alert](class_alert.html) | [HighwayAlerts.GetAlert](group___highway_alerts.html#gaca597a87085e31966f61323b13aafa4b) (string AccessCode, int AlertID) | 
 |  |  | 
 | [Alert](class_alert.html)[] | [HighwayAlerts.GetAlertsForMapArea](group___highway_alerts.html#gac5d656e9cd3b4dfb98b76303d2afa7e6) (string AccessCode, string MapArea) | 
 |  |  | 
 | string[] | [HighwayAlerts.GetEventCategories](group___highway_alerts.html#ga4c27d645e887c2b5a929b5c021870360) () | 
 |  |  | 
 | [Area](class_area.html)[] | [HighwayAlerts.GetMapAreas](group___highway_alerts.html#ga757c281af063270b985bedd1f30f5ef2) () | 
 |  |  | 


## Detailed Description

Information about current alerts on state highways

## Function Documentation

## [◆](#gaca597a87085e31966f61323b13aafa4b)GetAlert()

| Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- |
 | [Alert](class_alert.html) HighwayAlerts.GetAlert | ( | string | *AccessCode*, | 
 |  |  | int | *AlertID* | 
 |  | ) |  |  | 


Retrieves a specific incident.

**Parameters:**

| Parameter | Description |
| --- | --- |
| AccessCode | Your Traveler API Access Code. |
| AlertID | AlertID for a specific incident. |


**Returns:** [Alert](class_alert.html "A Highway Alert.")


## [◆](#gac91129b27f2b1aecf4844d5b1e48e567)GetAlerts()

| Column | Column | Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- | --- | --- |
 | [Alert](class_alert.html)[] HighwayAlerts.GetAlerts | ( | string | *AccessCode* | ) |  | 


Retrieves an array of currently active incidents.

**Parameters:**

| Parameter | Description |
| --- | --- |
| AccessCode | Your Traveler API Access Code. |


**Returns:** [Alert](class_alert.html "A Highway Alert.")[]


## [◆](#ga7dba7db9b30d3d0c0ac47657cc2b68c8)GetAlertsAsDataSet()

| Column | Column | Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- | --- | --- |
 | System.Data.DataSet HighwayAlerts.GetAlertsAsDataSet | ( | string | *AccessCode* | ) |  | 


Retrieves a dataset containing currently active incidents.

**Parameters:**

| Parameter | Description |
| --- | --- |
| AccessCode | Your Traveler API Access Code. |


**Returns:** Dataset


## [◆](#gac5d656e9cd3b4dfb98b76303d2afa7e6)GetAlertsForMapArea()

| Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- |
 | [Alert](class_alert.html)[] HighwayAlerts.GetAlertsForMapArea | ( | string | *AccessCode*, | 
 |  |  | string | *MapArea* | 
 |  | ) |  |  | 


Return alerts for a specific area

**Parameters:**

| Parameter | Description |
| --- | --- |
| AccessCode | Your Traveler API Access Code. |
| MapArea | The area to limit results to |


**Returns:** List of alerts


## [◆](#ga4c27d645e887c2b5a929b5c021870360)GetEventCategories()

| Column | Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- | --- |
 | string[] HighwayAlerts.GetEventCategories | ( |  | ) |  | 


Selects an array of valid categories to use with SearchAlerts.

**Returns:** String array containing Event Categories currently in use


## [◆](#ga757c281af063270b985bedd1f30f5ef2)GetMapAreas()

| Column | Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- | --- |
 | [Area](class_area.html)[] HighwayAlerts.GetMapAreas | ( |  | ) |  | 


Return list of areas and associated IDs

**Returns:** List of map areas available for queries


## [◆](#ga4e066d4e34492a227147fa99f188ca8c)SearchAlerts()

| Column | Column | Column | Column | Column |
| --- | --- | --- | --- | --- |
 | [Alert](class_alert.html)[] HighwayAlerts.SearchAlerts | ( | string | *AccessCode*, | 
 |  |  | string | *StateRoute*, | 
 |  |  | string | *Region*, | 
 |  |  | DateTime? | *SearchTimeStart*, | 
 |  |  | DateTime? | *SearchTimeEnd*, | 
 |  |  | decimal? | *StartingMilepost*, | 
 |  |  | decimal? | *EndingMilepost* | 
 |  | ) |  |  | 


Retrieves an array of incidents that match certain criteria.

**Parameters:**

| Parameter | Description |
| --- | --- |
| AccessCode | Your Traveler API Access Code. |
| StateRoute | Optional. A State Route formatted as a three digit number. I-5 would be 005. |
| Region | Optional. Use the integer code as follows: 8 - North Central, 11 - South Central, 12 - Southwest, 9 - Northwest, 10 - Olympic, 7 - Eastern |
| SearchTimeStart | Optional. Will only find alerts occuring after this time. |
| SearchTimeEnd | Optional. Will only find alerts occuring before this time. |
| StartingMilepost | Optional. Will only find alerts after this milepost. |
| EndingMilepost | Optional. Will only find alerts before this milepost. |


**Returns:** [Alert](class_alert.html "A Highway Alert.")[]


* Generated by [![doxygen](doxygen.svg)](https://www.doxygen.org/index.html) 1.9.5

