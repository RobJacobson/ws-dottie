# CVRestrictionData Class Reference

[Commercial Vehicle Information](group___commercial_vehicle.html)

![+](closed.png) Inheritance diagram for CVRestrictionData:

![](class_c_v_restriction_data.png)

| Column | Column | Column |
| --- | --- | --- |
 | Public Attributes |  | 
 | string | [StateRouteID](class_c_v_restriction_data.html#aa7b80c84802856a8f5cd72f750d22c0f) | 
 |  |  | 
 | string | [State](class_c_v_restriction_data.html#ad0fa779c109444c714959f5c72265ad5) | 
 |  |  | 
 | int? | [RestrictionWidthInInches](class_c_v_restriction_data.html#af5d2a65be33934055e7f253875977e57) | 
 |  |  | 
 | int? | [RestrictionHeightInInches](class_c_v_restriction_data.html#a4b031e445c3735ffc71dbd7f977d6745) | 
 |  |  | 
 | int? | [RestrictionLengthInInches](class_c_v_restriction_data.html#a05ae387ccb19e865b09618453533af46) | 
 |  |  | 
 | int? | [RestrictionWeightInPounds](class_c_v_restriction_data.html#a1afcfcc687f4dd8333c151b79c2a0f3b) | 
 |  |  | 
 | bool | [IsDetourAvailable](class_c_v_restriction_data.html#ab4d3ac5bb9e6943735789615e0fd09d7) | 
 |  |  | 
 | bool | [IsPermanentRestriction](class_c_v_restriction_data.html#a50482f16a741937fd42f74bc96fbbc8f) | 
 |  |  | 
 | bool | [IsExceptionsAllowed](class_c_v_restriction_data.html#aa2418209a63efd25a9ea29e9084b8c3f) | 
 |  |  | 
 | bool | [IsWarning](class_c_v_restriction_data.html#ad10547a8c6748ee3fa9f7e8293451e65) | 
 |  |  | 
 | DateTime | [DatePosted](class_c_v_restriction_data.html#a2cd82be8a04c437345f7bfde0f546590) | 
 |  |  | 
 | DateTime | [DateEffective](class_c_v_restriction_data.html#a66eb43a6374356a56bb03b76fae4bd00) | 
 |  |  | 
 | DateTime | [DateExpires](class_c_v_restriction_data.html#ad683782d99cd0a1e31e3f24c45d636a9) | 
 |  |  | 
 | string | [LocationName](class_c_v_restriction_data.html#a7e50f0a28e9c9e51ab8ad015c7692e7f) | 
 |  |  | 
 | string | [LocationDescription](class_c_v_restriction_data.html#ae950db990ab0ac6de65d79c83d62ecad) | 
 |  |  | 
 | string | [RestrictionComment](class_c_v_restriction_data.html#a71c953d5fee9f2fe5589b45460db90f6) | 
 |  |  | 
 | double | [Latitude](class_c_v_restriction_data.html#acd63a6e717103627f5f0aafb82574496) | 
 |  |  | 
 | double | [Longitude](class_c_v_restriction_data.html#a9f9781b769ff154f8318d4475337a81a) | 
 |  |  | 
 | string | [BridgeNumber](class_c_v_restriction_data.html#a5df9884b3f2d14c2faffa943ab5554a2) | 
 |  |  | 
 | int? | [MaximumGrossVehicleWeightInPounds](class_c_v_restriction_data.html#ad749f26e592ff2dcb93f249fcfbe271a) | 
 |  |  | 
 | string | [BridgeName](class_c_v_restriction_data.html#a153df778a0b8e9cb7ea6fd3b2481ce8f) | 
 |  |  | 
 | int? | [BLMaxAxle](class_c_v_restriction_data.html#a7e02e55da4cc8bbba3cd2a8dd83b2422) | 
 |  |  | 
 | int? | [CL8MaxAxle](class_c_v_restriction_data.html#aa5fe2fa6683be5766fcb61a8620c7e2c) | 
 |  |  | 
 | int? | [SAMaxAxle](class_c_v_restriction_data.html#acdcc3476246b2b3cf5226361963d5b66) | 
 |  |  | 
 | int? | [TDMaxAxle](class_c_v_restriction_data.html#a0f5f3161a68d98ddb81fe0d41d0b27aa) | 
 |  |  | 
 | string | [VehicleType](class_c_v_restriction_data.html#a25882aec8f97b69abee741957af6dad6) | 
 |  |  | 
 | [CommercialVehicleRestrictionType](group___commercial_vehicle.html#ga0cbe780a1d29b370f1cb4bc706894628) | [RestrictionType](class_c_v_restriction_data.html#a4b757ad1b4e626b2c5b31f0d409e8258) | 
 |  |  | 


| Column | Column | Column |
| --- | --- | --- |
 | Properties |  | 
 | [RoadwayLocation](class_roadway_location.html) | [StartRoadwayLocation](class_c_v_restriction_data.html#ad39730b41c8722998bdb577d57790929) `[get, set]` | 
 |  |  | 
 | [RoadwayLocation](class_roadway_location.html) | [EndRoadwayLocation](class_c_v_restriction_data.html#ac256a2b5cd3db733475866a39f0f1d44) `[get, set]` | 
 |  |  | 


## Detailed Description

Represents a Commercial Vehicle Restriction

## Member Data Documentation

## [◆](#a7e02e55da4cc8bbba3cd2a8dd83b2422)BLMaxAxle

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.BLMaxAxle | 


## [◆](#a153df778a0b8e9cb7ea6fd3b2481ce8f)BridgeName

| Column | Column |
| --- | --- |
 | string CVRestrictionData.BridgeName | 


## [◆](#a5df9884b3f2d14c2faffa943ab5554a2)BridgeNumber

| Column | Column |
| --- | --- |
 | string CVRestrictionData.BridgeNumber | 


WSDOT Idenfier for bridge

## [◆](#aa5fe2fa6683be5766fcb61a8620c7e2c)CL8MaxAxle

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.CL8MaxAxle | 


## [◆](#a66eb43a6374356a56bb03b76fae4bd00)DateEffective

| Column | Column |
| --- | --- |
 | DateTime CVRestrictionData.DateEffective | 


Date when the restriction comes into effect

## [◆](#ad683782d99cd0a1e31e3f24c45d636a9)DateExpires

| Column | Column |
| --- | --- |
 | DateTime CVRestrictionData.DateExpires | 


Date when the restriction is no longer in force

## [◆](#a2cd82be8a04c437345f7bfde0f546590)DatePosted

| Column | Column |
| --- | --- |
 | DateTime CVRestrictionData.DatePosted | 


Date when the restriction was first posted

## [◆](#ab4d3ac5bb9e6943735789615e0fd09d7)IsDetourAvailable

| Column | Column |
| --- | --- |
 | bool CVRestrictionData.IsDetourAvailable | 


Indicates if a detour is available

## [◆](#aa2418209a63efd25a9ea29e9084b8c3f)IsExceptionsAllowed

| Column | Column |
| --- | --- |
 | bool CVRestrictionData.IsExceptionsAllowed | 


## [◆](#a50482f16a741937fd42f74bc96fbbc8f)IsPermanentRestriction

| Column | Column |
| --- | --- |
 | bool CVRestrictionData.IsPermanentRestriction | 


Indicates whether the restriction is permanent

## [◆](#ad10547a8c6748ee3fa9f7e8293451e65)IsWarning

| Column | Column |
| --- | --- |
 | bool CVRestrictionData.IsWarning | 


## [◆](#acd63a6e717103627f5f0aafb82574496)Latitude

| Column | Column |
| --- | --- |
 | double CVRestrictionData.Latitude | 


Latitude of location of bridge

## [◆](#ae950db990ab0ac6de65d79c83d62ecad)LocationDescription

| Column | Column |
| --- | --- |
 | string CVRestrictionData.LocationDescription | 


Description of the location

## [◆](#a7e50f0a28e9c9e51ab8ad015c7692e7f)LocationName

| Column | Column |
| --- | --- |
 | string CVRestrictionData.LocationName | 


Name of the location

## [◆](#a9f9781b769ff154f8318d4475337a81a)Longitude

| Column | Column |
| --- | --- |
 | double CVRestrictionData.Longitude | 


Longitude of location of bridge

## [◆](#ad749f26e592ff2dcb93f249fcfbe271a)MaximumGrossVehicleWeightInPounds

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.MaximumGrossVehicleWeightInPounds | 


## [◆](#a71c953d5fee9f2fe5589b45460db90f6)RestrictionComment

| Column | Column |
| --- | --- |
 | string CVRestrictionData.RestrictionComment | 


More details concerning the restriction

## [◆](#a4b031e445c3735ffc71dbd7f977d6745)RestrictionHeightInInches

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.RestrictionHeightInInches | 


The maximum height for a load in inches

## [◆](#a05ae387ccb19e865b09618453533af46)RestrictionLengthInInches

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.RestrictionLengthInInches | 


The maximum length for a load in inches

## [◆](#a4b757ad1b4e626b2c5b31f0d409e8258)RestrictionType

| Column | Column |
| --- | --- |
 | [CommercialVehicleRestrictionType](group___commercial_vehicle.html#ga0cbe780a1d29b370f1cb4bc706894628) CVRestrictionData.RestrictionType | 


The type of restriction, bridge or road

## [◆](#a1afcfcc687f4dd8333c151b79c2a0f3b)RestrictionWeightInPounds

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.RestrictionWeightInPounds | 


The maximum weight for a load in pounds

## [◆](#af5d2a65be33934055e7f253875977e57)RestrictionWidthInInches

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.RestrictionWidthInInches | 


The maximum width for a load in inches

## [◆](#acdcc3476246b2b3cf5226361963d5b66)SAMaxAxle

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.SAMaxAxle | 


## [◆](#ad0fa779c109444c714959f5c72265ad5)State

| Column | Column |
| --- | --- |
 | string CVRestrictionData.State | 


State where restriction is located

## [◆](#aa7b80c84802856a8f5cd72f750d22c0f)StateRouteID

| Column | Column |
| --- | --- |
 | string CVRestrictionData.StateRouteID | 


State route restriction is located on

## [◆](#a0f5f3161a68d98ddb81fe0d41d0b27aa)TDMaxAxle

| Column | Column |
| --- | --- |
 | int? CVRestrictionData.TDMaxAxle | 


## [◆](#a25882aec8f97b69abee741957af6dad6)VehicleType

| Column | Column |
| --- | --- |
 | string CVRestrictionData.VehicleType | 


## Property Documentation

## [◆](#ac256a2b5cd3db733475866a39f0f1d44)EndRoadwayLocation

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | [RoadwayLocation](class_roadway_location.html) CVRestrictionData.EndRoadwayLocation |  | getset | 


End location for the alert on the roadway

## [◆](#ad39730b41c8722998bdb577d57790929)StartRoadwayLocation

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | [RoadwayLocation](class_roadway_location.html) CVRestrictionData.StartRoadwayLocation |  | getset | 


Start location for the alert on the roadway

* [CVRestrictionData](class_c_v_restriction_data.html)
* Generated by [![doxygen](doxygen.svg)](https://www.doxygen.org/index.html) 1.9.5

