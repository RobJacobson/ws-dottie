# BridgeDataGIS Class Reference

[Commercial Vehicle Information](group___commercial_vehicle.html)

|  |  |
| --- | --- |
| Properties | |
| int | [CrossingLocationId](class_bridge_data_g_i_s.html#af5dd44f891354ca82fc827d90f6ceebf) `[get, set]` |
|  | |
| string | [StateStructureId](class_bridge_data_g_i_s.html#aedf302476e2868d7f660e7582d3aabe2) `[get, set]` |
|  | |
| string | [BridgeNumber](class_bridge_data_g_i_s.html#a1a165f66e6c8b4834d0a0c250d17c2b9) `[get, set]` |
|  | |
| string | [CrossingDescription](class_bridge_data_g_i_s.html#af485112ae6518619772528dbe585e03e) `[get, set]` |
|  | |
| string | [StateRouteID](class_bridge_data_g_i_s.html#a5fd45c7a79ba83477d966707e262c4a2) `[get, set]` |
|  | |
| decimal | [SRMP](class_bridge_data_g_i_s.html#a9a60b2f91a68a4985f295d10810e9c10) `[get, set]` |
|  | |
| string | [InventoryDirection](class_bridge_data_g_i_s.html#aeaf11528b8a8ec0fd6863ffd69a398eb) `[get, set]` |
|  | |
| string | [SRMPAheadBackIndicator](class_bridge_data_g_i_s.html#ad4afa3d183cc021b62bcba8b559ccbfd) `[get, set]` |
|  | |
| DateTime | [RouteDate](class_bridge_data_g_i_s.html#adcf561f8831fc55749f314f4b92e4c3b) `[get, set]` |
|  | |
| int | [VerticalClearanceMinimumInches](class_bridge_data_g_i_s.html#a26975e1488e388b05896dcdd276bb1f0) `[get, set]` |
|  | |
| int | [VerticalClearanceMaximumInches](class_bridge_data_g_i_s.html#a0d4d91e45abef0bf57a9f6e33f6cb298) `[get, set]` |
|  | |
| string | [VerticalClearanceMinimumFeetInch](class_bridge_data_g_i_s.html#aa8f8719fda63bc07af2dec2c1d3096f0) `[get, set]` |
|  | |
| string | [VerticalClearanceMaximumFeetInch](class_bridge_data_g_i_s.html#a548edb4279e463cbc77ebd08b22d2c9e) `[get, set]` |
|  | |
| decimal | [Latitude](class_bridge_data_g_i_s.html#aa4866ba11d382e3baf1aaf471a32545d) `[get, set]` |
|  | |
| decimal | [Longitude](class_bridge_data_g_i_s.html#a9ae2676faf18732b1f462c69d34116b6) `[get, set]` |
|  | |
| DateTime | [APILastUpdate](class_bridge_data_g_i_s.html#a586d09fbfa9efe182398f16ef08170fe) `[get, set]` |
|  | |
| Guid | [ControlEntityGuid](class_bridge_data_g_i_s.html#a76472c2ff15232f8fae4a8b30a451a79) `[get, set]` |
|  | |
| Guid | [CrossingRecordGuid](class_bridge_data_g_i_s.html#aaf1d7dee23b3b1986634328ba56a1795) `[get, set]` |
|  | |
| Guid | [LocationGuid](class_bridge_data_g_i_s.html#aed2e79c82cc61fdb931432bec098ab5f) `[get, set]` |
|  | |

## Detailed Description

A record containing the location and clearance information of a bridge structure

Attention
:   DISCLAIMER: This Bridge Vertical [Clearance](class_clearance.html "Bridge clearance information, see disclaimer") Trip Planner is a guide for vertical clearances, but because of physical changes to highways and other possible inconsistencies due to natural phenomena (expansion and contraction of highway facilities due to temperature, natural or unnatural material deposition on the pavement, other transient and lasting unforeseen events, etc.), new construction, pavement overlays, lane reconfiguration, etc, it cannot be guaranteed. As stated on all permits in accordance with state law, the operator is responsible to identify, navigate and clear all obstructions. WAC 468-38-070 states it is the responsibility of the permit applicant to check, or prerun, the proposed route and provide for safe maneuvers around the obstruction or detours as necessary. Note that the lane in which the maximum and minimum clearances occur are not listed. This must be determined by the operator. In accordance with state law, the owner or operator of a vehicle or combination of vehicles shall exercise due care in determining that sufficient vertical clearance is provided upon the public highways where the vehicle or combination of vehicles is being operated. Also note that the clearances displayed are approximately three inches less than the actual measured clearances. This adjustment is intended to enhance safety and increase the margin of error for judgments made by highway users hauling oversize loads. For that reason, and due to the variations in structure clearance partially cataloged above, such users should not assume that clearance is in excess of what is published, and should utilize check and prerun methods to assure safe passage.

## Property Documentation

## [◆](#a586d09fbfa9efe182398f16ef08170fe)APILastUpdate

|  |  |  |
| --- | --- | --- |
| |  | | --- | | DateTime BridgeDataGIS.APILastUpdate | | getset |

Date record was last updated

## [◆](#a1a165f66e6c8b4834d0a0c250d17c2b9)BridgeNumber

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.BridgeNumber | | getset |

A 2 part identifier that has a unique set of up to 10 alphanumeric characters. The first part of the Bridge Number is the State Route associated with the bridge, either as a part of the route, or the route is under or adjacent to the bridge. The second part of the Bridge Number is the number or number and alpha character combination assigned to the bridge. If a Bridge is less than 20 feet in length, the sequence number is carried to the 100th (0.01)

## [◆](#a76472c2ff15232f8fae4a8b30a451a79)ControlEntityGuid

|  |  |  |
| --- | --- | --- |
| |  | | --- | | Guid BridgeDataGIS.ControlEntityGuid | | getset |

An identifier for bridge

## [◆](#af485112ae6518619772528dbe585e03e)CrossingDescription

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.CrossingDescription | | getset |

The

## [◆](#af5dd44f891354ca82fc827d90f6ceebf)CrossingLocationId

|  |  |  |
| --- | --- | --- |
| |  | | --- | | int BridgeDataGIS.CrossingLocationId | | getset |

Unique identifier for bridge

## [◆](#aaf1d7dee23b3b1986634328ba56a1795)CrossingRecordGuid

|  |  |  |
| --- | --- | --- |
| |  | | --- | | Guid BridgeDataGIS.CrossingRecordGuid | | getset |

An identifier for bridge

## [◆](#aeaf11528b8a8ec0fd6863ffd69a398eb)InventoryDirection

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.InventoryDirection | | getset |

A code that represents whether the transportation asset or project is located in the (I) Increasing Milepost Direction of Travel, (D) Decreasing Milepost Direction of Travel or, (B) Both Milepost Directions of Travel.

## [◆](#aa4866ba11d382e3baf1aaf471a32545d)Latitude

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal BridgeDataGIS.Latitude | | getset |

Latitude is a north-south measurement of position on the Earth.

## [◆](#aed2e79c82cc61fdb931432bec098ab5f)LocationGuid

|  |  |  |
| --- | --- | --- |
| |  | | --- | | Guid BridgeDataGIS.LocationGuid | | getset |

An identifier for bridge

## [◆](#a9ae2676faf18732b1f462c69d34116b6)Longitude

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal BridgeDataGIS.Longitude | | getset |

Longitude is a west-east measurement of position on the Earth.

## [◆](#adcf561f8831fc55749f314f4b92e4c3b)RouteDate

|  |  |  |
| --- | --- | --- |
| |  | | --- | | DateTime BridgeDataGIS.RouteDate | | getset |

## [◆](#a9a60b2f91a68a4985f295d10810e9c10)SRMP

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal BridgeDataGIS.SRMP | | getset |

A logical number, assigned by a Linear Referencing Method, to a given point along a State Route.

## [◆](#ad4afa3d183cc021b62bcba8b559ccbfd)SRMPAheadBackIndicator

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.SRMPAheadBackIndicator | | getset |

An indicator that denotes if the Milepost is within a back mileage equation area. A back mileage equation area occurs when a segment of a route is added at any point other than the end of an existing route, or when a realignment occurs.

## [◆](#a5fd45c7a79ba83477d966707e262c4a2)StateRouteID

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.StateRouteID | | getset |

The Number assigned to the State Route and enacted into law by the Washington State Legislature

## [◆](#aedf302476e2868d7f660e7582d3aabe2)StateStructureId

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.StateStructureId | | getset |

A unique permanent 8 digit code assigned by the WSDOT Bridge Office and does not change for the life of the bridge.

## [◆](#a548edb4279e463cbc77ebd08b22d2c9e)VerticalClearanceMaximumFeetInch

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.VerticalClearanceMaximumFeetInch | | getset |

Maximum expected clearance of bridge as feet and inches

## [◆](#a0d4d91e45abef0bf57a9f6e33f6cb298)VerticalClearanceMaximumInches

|  |  |  |
| --- | --- | --- |
| |  | | --- | | int BridgeDataGIS.VerticalClearanceMaximumInches | | getset |

Maximum expected clearance of bridge in inches

## [◆](#aa8f8719fda63bc07af2dec2c1d3096f0)VerticalClearanceMinimumFeetInch

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string BridgeDataGIS.VerticalClearanceMinimumFeetInch | | getset |

Minimum expected clearance of bridge as feet and inches

## [◆](#a26975e1488e388b05896dcdd276bb1f0)VerticalClearanceMinimumInches

|  |  |  |
| --- | --- | --- |
| |  | | --- | | int BridgeDataGIS.VerticalClearanceMinimumInches | | getset |

Minimum expected clearance of bridge in inches

* [BridgeDataGIS](class_bridge_data_g_i_s.html)
* Generated by [![doxygen](doxygen.svg)](https://www.doxygen.org/index.html) 1.9.5

