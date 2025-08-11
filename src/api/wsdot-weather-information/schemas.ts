import { z } from "zod";

import {
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/validation";

export const weatherInfoSchema = z
  .object({
    BarometricPressure: zNullableNumber(),
    Latitude: z.number(),
    Longitude: z.number(),
    PrecipitationInInches: zNullableNumber(),
    ReadingTime: zWsdotDate(),
    RelativeHumidity: zNullableNumber(),
    SkyCoverage: zNullableString(),
    StationID: z.number(),
    StationName: z.string(),
    TemperatureInFahrenheit: zNullableNumber(),
    Visibility: zNullableNumber(),
    WindDirection: zNullableNumber(),
    WindDirectionCardinal: zNullableString(),
    WindGustSpeedInMPH: zNullableNumber(),
    WindSpeedInMPH: zNullableNumber(),
  })
  .catchall(z.unknown());

export const weatherInfoArraySchema = z.array(weatherInfoSchema);

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;
export type WeatherInformationResponse = z.infer<typeof weatherInfoArraySchema>;
