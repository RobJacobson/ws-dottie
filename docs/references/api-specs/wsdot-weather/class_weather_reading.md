# WeatherReading Class Reference

[Current Weather](group___weather.html)

|  |  |
| --- | --- |
| Public Member Functions | |
|  | [WeatherReading](class_weather_reading.html#a07d0f524e8dc07824b43a154538c7356) (string \_StationId, int \_Elevation, decimal \_Latitude, decimal \_Longitude, string \_StationName) |
|  | |

|  |  |
| --- | --- |
| Properties | |
| string | [StationId](class_weather_reading.html#ab5130793f939888a89a19278c403af68) `[get, set]` |
|  | |
| string | [StationName](class_weather_reading.html#a76e33a84991fbbb97e80691d809f5f03) `[get, set]` |
|  | |
| decimal | [Latitude](class_weather_reading.html#ad82e15b11e54daa39555b201ca97e039) `[get, set]` |
|  | |
| decimal | [Longitude](class_weather_reading.html#afc933f46688d59f163b159e4f461ba43) `[get, set]` |
|  | |
| int | [Elevation](class_weather_reading.html#a6bbb6582bbca55a16e539bf8e4c283ce) `[get, set]` |
|  | |
| DateTime? | [ReadingTime](class_weather_reading.html#ae3d7ccfd568a5680558400d21dabc363) `[get, set]` |
|  | |
| decimal? | [AirTemperature](class_weather_reading.html#af60f2c1bc42e4c2a635e1c192497e577) `[get, set]` |
|  | |
| byte? | [RelativeHumidty](class_weather_reading.html#a334a3b2693ea2eb4962a3d5afd5974c4) `[get, set]` |
|  | |
| byte? | [AverageWindSpeed](class_weather_reading.html#a79859bdaa825614126813fa3212de1d1) `[get, set]` |
|  | |
| short? | [AverageWindDirection](class_weather_reading.html#a1ff3ac42800969b815a015c8649ae389) `[get, set]` |
|  | |
| byte? | [WindGust](class_weather_reading.html#a6495207fcbb2d70283c89e101653e604) `[get, set]` |
|  | |
| short? | [Visibility](class_weather_reading.html#aa28dd7204c7960601f08f0b07016accb) `[get, set]` |
|  | |
| byte? | [PrecipitationIntensity](class_weather_reading.html#aa541a620e25a6e45e34618f284f5f0de) `[get, set]` |
|  | |
| byte? | [PrecipitationType](class_weather_reading.html#af3fa2c2cb3e71345b82e77f8507b8726) `[get, set]` |
|  | |
| decimal? | [PrecipitationPast1Hour](class_weather_reading.html#abd39849a528ebe553619b61ebfa5297b) `[get, set]` |
|  | |
| decimal? | [PrecipitationPast3Hours](class_weather_reading.html#a8709a149fd7c064e49b23d7c558ccbc7) `[get, set]` |
|  | |
| decimal? | [PrecipitationPast6Hours](class_weather_reading.html#abba1cce1009156c9a4ed8f2bdbee8228) `[get, set]` |
|  | |
| decimal? | [PrecipitationPast12Hours](class_weather_reading.html#a33c3a856758926fea65aaa95cc696eea) `[get, set]` |
|  | |
| decimal? | [PrecipitationPast24Hours](class_weather_reading.html#a9bad265343992bea76880afe84feea36) `[get, set]` |
|  | |
| decimal? | [PrecipitationAccumulation](class_weather_reading.html#ad50a1db882bba7989021c763b447af27) `[get, set]` |
|  | |
| int? | [BarometricPressure](class_weather_reading.html#a7390240be164c67cf391b09f853626b7) `[get, set]` |
|  | |
| int? | [SnowDepth](class_weather_reading.html#a7158f25a3489a3d75ab5da6f07f2fbbd) `[get, set]` |
|  | |
| List< [ScanwebSurfaceMeasurements](class_scanweb_surface_measurements.html) > | [SurfaceMeasurements](class_weather_reading.html#a3013cbd11334077973b37f4b51d6a540) `[get, set]` |
|  | |
| List< [ScanwebSubSurfaceMeasurements](class_scanweb_sub_surface_measurements.html) > | [SubSurfaceMeasurements](class_weather_reading.html#acd9047a94ac84c84f40cc94adc974659) `[get, set]` |
|  | |

## Detailed Description

Information from a weather station

## Constructor & Destructor Documentation

## [◆](#a07d0f524e8dc07824b43a154538c7356)WeatherReading()

|  |  |  |  |
| --- | --- | --- | --- |
| WeatherReading.WeatherReading | ( | string | *\_StationId*, |
|  |  | int | *\_Elevation*, |
|  |  | decimal | *\_Latitude*, |
|  |  | decimal | *\_Longitude*, |
|  |  | string | *\_StationName* |
|  | ) |  |  |

## Property Documentation

## [◆](#af60f2c1bc42e4c2a635e1c192497e577)AirTemperature

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.AirTemperature | | getset |

Air temperature at the site in Celcius.

## [◆](#a1ff3ac42800969b815a015c8649ae389)AverageWindDirection

|  |  |  |
| --- | --- | --- |
| |  | | --- | | short? WeatherReading.AverageWindDirection | | getset |

Average wind direction during an evaluation cycle in degrees.

## [◆](#a79859bdaa825614126813fa3212de1d1)AverageWindSpeed

|  |  |  |
| --- | --- | --- |
| |  | | --- | | byte? WeatherReading.AverageWindSpeed | | getset |

Average speed of the wind during an evaluation cycle in Kilometers per hour.

## [◆](#a7390240be164c67cf391b09f853626b7)BarometricPressure

|  |  |  |
| --- | --- | --- |
| |  | | --- | | int? WeatherReading.BarometricPressure | | getset |

The force per unit area exerted by the atmosphere in millibars. This reading is not adjusted for site elevation.

## [◆](#a6bbb6582bbca55a16e539bf8e4c283ce)Elevation

|  |  |  |
| --- | --- | --- |
| |  | | --- | | int WeatherReading.Elevation | | getset |

Elevation from sea level in meters

## [◆](#ad82e15b11e54daa39555b201ca97e039)Latitude

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal WeatherReading.Latitude | | getset |

Latitude of station

## [◆](#afc933f46688d59f163b159e4f461ba43)Longitude

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal WeatherReading.Longitude | | getset |

Longitude of station

## [◆](#ad50a1db882bba7989021c763b447af27)PrecipitationAccumulation

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.PrecipitationAccumulation | | getset |

Rainfall amount or snowfall liquid equivalent for the period from midnight GMT to the current time. At midnight GMT the total accumulation is reset to zero. Measured in millimeters.

## [◆](#aa541a620e25a6e45e34618f284f5f0de)PrecipitationIntensity

|  |  |  |
| --- | --- | --- |
| |  | | --- | | byte? WeatherReading.PrecipitationIntensity | | getset |

Intensity of the precipitation as derived from the precipitation rate.

## [◆](#a33c3a856758926fea65aaa95cc696eea)PrecipitationPast12Hours

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.PrecipitationPast12Hours | | getset |

Rainfall amount or snowfall liquid equivalent for the previous 12 hour period. Measured in millimeters.

## [◆](#abd39849a528ebe553619b61ebfa5297b)PrecipitationPast1Hour

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.PrecipitationPast1Hour | | getset |

Rainfall amount or snowfall liquid equivalent for the previous 1 hour period. Measured in millimeters.

## [◆](#a9bad265343992bea76880afe84feea36)PrecipitationPast24Hours

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.PrecipitationPast24Hours | | getset |

Rainfall amount or snowfall liquid equivalent for the previous 24 hour period. Measured in millimeters.

## [◆](#a8709a149fd7c064e49b23d7c558ccbc7)PrecipitationPast3Hours

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.PrecipitationPast3Hours | | getset |

Rainfall amount or snowfall liquid equivalent for the previous 3 hour period. Measured in millimeters.

## [◆](#abba1cce1009156c9a4ed8f2bdbee8228)PrecipitationPast6Hours

|  |  |  |
| --- | --- | --- |
| |  | | --- | | decimal? WeatherReading.PrecipitationPast6Hours | | getset |

Rainfall amount or snowfall liquid equivalent for the previous 6 hour period. Measured in millimeters.

## [◆](#af3fa2c2cb3e71345b82e77f8507b8726)PrecipitationType

|  |  |  |
| --- | --- | --- |
| |  | | --- | | byte? WeatherReading.PrecipitationType | | getset |

Type of precipitation detected by a precipitation sensor, if one is available. Certain types of precipitation sensors can only detect the presence or absence of precipitation and will display Yes or No (1 or 0 respectively).

## [◆](#ae3d7ccfd568a5680558400d21dabc363)ReadingTime

|  |  |  |
| --- | --- | --- |
| |  | | --- | | DateTime? WeatherReading.ReadingTime | | getset |

Date and Time reading was taken

## [◆](#a334a3b2693ea2eb4962a3d5afd5974c4)RelativeHumidty

|  |  |  |
| --- | --- | --- |
| |  | | --- | | byte? WeatherReading.RelativeHumidty | | getset |

Percent of moisture in the air. A relative humidity of 0% shows that the air contains no moisture and 100% shows that the air is completely saturated and cannot absorb more moisture.

## [◆](#a7158f25a3489a3d75ab5da6f07f2fbbd)SnowDepth

|  |  |  |
| --- | --- | --- |
| |  | | --- | | int? WeatherReading.SnowDepth | | getset |

The depth of snow on representative areas other than the highway pavement, avoiding drifts and plowed areas in centimeters.

## [◆](#ab5130793f939888a89a19278c403af68)StationId

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string WeatherReading.StationId | | getset |

NWS assigned name for station

## [◆](#a76e33a84991fbbb97e80691d809f5f03)StationName

|  |  |  |
| --- | --- | --- |
| |  | | --- | | string WeatherReading.StationName | | getset |

WSDOT assigned name

## [◆](#acd9047a94ac84c84f40cc94adc974659)SubSurfaceMeasurements

|  |  |  |
| --- | --- | --- |
| |  | | --- | | List<[ScanwebSubSurfaceMeasurements](class_scanweb_sub_surface_measurements.html)> WeatherReading.SubSurfaceMeasurements | | getset |

## [◆](#a3013cbd11334077973b37f4b51d6a540)SurfaceMeasurements

|  |  |  |
| --- | --- | --- |
| |  | | --- | | List<[ScanwebSurfaceMeasurements](class_scanweb_surface_measurements.html)> WeatherReading.SurfaceMeasurements | | getset |

## [◆](#aa28dd7204c7960601f08f0b07016accb)Visibility

|  |  |  |
| --- | --- | --- |
| |  | | --- | | short? WeatherReading.Visibility | | getset |

Average distance that you can see, both day and night, computed every three minutes in meters.

## [◆](#a6495207fcbb2d70283c89e101653e604)WindGust

|  |  |  |
| --- | --- | --- |
| |  | | --- | | byte? WeatherReading.WindGust | | getset |

Maximum wind speed measured during an evaluation cycle. The time period over which wind gust speed is monitored can vary based on the type and manufacturer of the RWIS site.

* [WeatherReading](class_weather_reading.html)
* Generated by [![doxygen](doxygen.svg)](https://www.doxygen.org/index.html) 1.9.5
