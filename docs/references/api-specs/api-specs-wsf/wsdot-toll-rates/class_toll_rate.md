# TollRate Class Reference

[Toll Rates](group___tolling.html)

| Column | Column | Column |
| --- | --- | --- |
 | Properties |  | 
 | string | [SignName](class_toll_rate.html#a097dd7a166c5ac2e94279d5bc4077131) `[get, set]` | 
 |  |  | 
 | string | [TripName](class_toll_rate.html#a722f4dbf15c990c8445b27d36f88c492) `[get, set]` | 
 |  |  | 
 | decimal | [CurrentToll](class_toll_rate.html#abea4bbd11fe0e09a03fcdbbda693d181) `[get, set]` | 
 |  |  | 
 | string | [CurrentMessage](class_toll_rate.html#a9cd630d75cd33c6ae04bbf98cc54f4f7) `[get, set]` | 
 |  |  | 
 | string | [StateRoute](class_toll_rate.html#ac8045a8bc5baf80d0ee5b0f52b1ec020) `[get, set]` | 
 |  |  | 
 | string | [TravelDirection](class_toll_rate.html#a56dc6537f82bd5805209987d2021133c) `[get, set]` | 
 |  |  | 
 | decimal | [StartMilepost](class_toll_rate.html#a7c8f9ddd69094a181d1ce13f5aa4e6ef) `[get, set]` | 
 |  |  | 
 | string | [StartLocationName](class_toll_rate.html#a6019a744240f2c94f6dea66bacdbe282) `[get, set]` | 
 |  |  | 
 | decimal | [StartLatitude](class_toll_rate.html#a15da9c7faee3453dd1cf8c2414a94ac3) `[get, set]` | 
 |  |  | 
 | decimal | [StartLongitude](class_toll_rate.html#a8af3b5f815a6e11fc354aaf9a4ad5536) `[get, set]` | 
 |  |  | 
 | decimal | [EndMilepost](class_toll_rate.html#a724e932f408e4b4ba55f92ce0ad497df) `[get, set]` | 
 |  |  | 
 | string | [EndLocationName](class_toll_rate.html#a5406515aac0b7aebbbaa074483a49a1e) `[get, set]` | 
 |  |  | 
 | decimal | [EndLatitude](class_toll_rate.html#a2d58a9daeb6c094214652acdcf4fd658) `[get, set]` | 
 |  |  | 
 | decimal | [EndLongitude](class_toll_rate.html#aaa15d88c21ca9f36d659f8cc31545c7d) `[get, set]` | 
 |  |  | 
 | DateTime | [TimeUpdated](class_toll_rate.html#a746c129bc02515b2db24a62491f81e45) `[get, set]` | 
 |  |  | 


## Detailed Description

Toll information for HOV toll lanes

Attention
:   *The tolls reported here may not match what is currently displayed on the road signs due to timing issues between WSDOT and the tolling contractor.*

## Property Documentation

## [◆](#a9cd630d75cd33c6ae04bbf98cc54f4f7)CurrentMessage

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.CurrentMessage |  | getset | 


Message displayed on the sign in place of a toll

## [◆](#abea4bbd11fe0e09a03fcdbbda693d181)CurrentToll

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.CurrentToll |  | getset | 


The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available

## [◆](#a2d58a9daeb6c094214652acdcf4fd658)EndLatitude

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.EndLatitude |  | getset | 


Approximate geographical latitude of the end location

## [◆](#a5406515aac0b7aebbbaa074483a49a1e)EndLocationName

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.EndLocationName |  | getset | 


Common name of the end location

## [◆](#aaa15d88c21ca9f36d659f8cc31545c7d)EndLongitude

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.EndLongitude |  | getset | 


Approximate geographical longitude of the end location

## [◆](#a724e932f408e4b4ba55f92ce0ad497df)EndMilepost

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.EndMilepost |  | getset | 


The end milepost for a toll trip

## [◆](#a097dd7a166c5ac2e94279d5bc4077131)SignName

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.SignName |  | getset | 


## [◆](#a15da9c7faee3453dd1cf8c2414a94ac3)StartLatitude

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.StartLatitude |  | getset | 


Approximate geographical latitude of the start location

## [◆](#a6019a744240f2c94f6dea66bacdbe282)StartLocationName

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.StartLocationName |  | getset | 


Common name of the start location

## [◆](#a8af3b5f815a6e11fc354aaf9a4ad5536)StartLongitude

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.StartLongitude |  | getset | 


Approximate geographical longitude of the start location

## [◆](#a7c8f9ddd69094a181d1ce13f5aa4e6ef)StartMilepost

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | decimal TollRate.StartMilepost |  | getset | 


The start milepost for a toll trip

## [◆](#ac8045a8bc5baf80d0ee5b0f52b1ec020)StateRoute

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.StateRoute |  | getset | 


Route the toll applies to

## [◆](#a746c129bc02515b2db24a62491f81e45)TimeUpdated

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | DateTime TollRate.TimeUpdated |  | getset | 


Last time updated for this toll trip

## [◆](#a56dc6537f82bd5805209987d2021133c)TravelDirection

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.TravelDirection |  | getset | 


Travel direction the toll applies to

## [◆](#a722f4dbf15c990c8445b27d36f88c492)TripName

| Column | Column | Column | Column |
| --- | --- | --- | --- |
 |  |  |  | --- |  | string TollRate.TripName |  | getset | 


Name for the toll trip

* [TollRate](class_toll_rate.html)
* Generated by [![doxygen](doxygen.svg)](https://www.doxygen.org/index.html) 1.9.5

