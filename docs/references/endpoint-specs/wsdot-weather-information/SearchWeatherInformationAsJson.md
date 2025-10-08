Reference for http://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson?AccessCode={ACCESSCODE}&StationID={STATIONID}&SearchStartTime={SEARCHSTARTTIME}&SearchEndTime={SEARCHENDTIME}

Return weather information over given time for specified WSDOT maintained weather station in JSON format

**Url:** http://wsdot.wa.gov/Traffic/api/WeatherInformation/WeatherInformationREST.svc/SearchWeatherInformationAsJson?AccessCode={ACCESSCODE}&StationID={STATIONID}&SearchStartTime={SEARCHSTARTTIME}&SearchEndTime={SEARCHENDTIME}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfWeatherInfo xmlns="http://schemas.datacontract.org/2004/07/">
  <WeatherInfo>
    <BarometricPressure>12678967.543233</BarometricPressure>
    <Latitude>12678967.543233</Latitude>
    <Longitude>12678967.543233</Longitude>
    <PrecipitationInInches>12678967.543233</PrecipitationInInches>
    <ReadingTime>1999-05-31T11:20:00</ReadingTime>
    <RelativeHumidity>12678967.543233</RelativeHumidity>
    <SkyCoverage>String content</SkyCoverage>
    <StationID>2147483647</StationID>
    <StationName>String content</StationName>
    <TemperatureInFahrenheit>12678967.543233</TemperatureInFahrenheit>
    <Visibility>2147483647</Visibility>
    <WindDirection>12678967.543233</WindDirection>
    <WindDirectionCardinal>String content</WindDirectionCardinal>
    <WindGustSpeedInMPH>12678967.543233</WindGustSpeedInMPH>
    <WindSpeedInMPH>12678967.543233</WindSpeedInMPH>
  </WeatherInfo>
  <WeatherInfo>
    <BarometricPressure>12678967.543233</BarometricPressure>
    <Latitude>12678967.543233</Latitude>
    <Longitude>12678967.543233</Longitude>
    <PrecipitationInInches>12678967.543233</PrecipitationInInches>
    <ReadingTime>1999-05-31T11:20:00</ReadingTime>
    <RelativeHumidity>12678967.543233</RelativeHumidity>
    <SkyCoverage>String content</SkyCoverage>
    <StationID>2147483647</StationID>
    <StationName>String content</StationName>
    <TemperatureInFahrenheit>12678967.543233</TemperatureInFahrenheit>
    <Visibility>2147483647</Visibility>
    <WindDirection>12678967.543233</WindDirection>
    <WindDirectionCardinal>String content</WindDirectionCardinal>
    <WindGustSpeedInMPH>12678967.543233</WindGustSpeedInMPH>
    <WindSpeedInMPH>12678967.543233</WindSpeedInMPH>
  </WeatherInfo>
</ArrayOfWeatherInfo>
```

The following is an example response Json body:

```
\[{
	"BarometricPressure":12678967.543233,
	"Latitude":12678967.543233,
	"Longitude":12678967.543233,
	"PrecipitationInInches":12678967.543233,
	"ReadingTime":"\\/Date(928174800000-0700)\\/",
	"RelativeHumidity":12678967.543233,
	"SkyCoverage":"String content",
	"StationID":2147483647,
	"StationName":"String content",
	"TemperatureInFahrenheit":12678967.543233,
	"Visibility":2147483647,
	"WindDirection":12678967.543233,
	"WindDirectionCardinal":"String content",
	"WindGustSpeedInMPH":12678967.543233,
	"WindSpeedInMPH":12678967.543233
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://schemas.datacontract.org/2004/07/" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfWeatherInfo">
    <xs:sequence>
      <maxOccurs="unbounded" name="WeatherInfo" nillable="true" type="tns:WeatherInfo" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfWeatherInfo" nillable="true" type="tns:ArrayOfWeatherInfo" />
  <xs:complexType name="WeatherInfo">
    <xs:sequence>
      <name="BarometricPressure" nillable="true" type="xs:decimal" />
      <name="Latitude" type="xs:decimal" />
      <name="Longitude" type="xs:decimal" />
      <name="PrecipitationInInches" nillable="true" type="xs:decimal" />
      <name="ReadingTime" type="xs:dateTime" />
      <name="RelativeHumidity" nillable="true" type="xs:decimal" />
      <name="SkyCoverage" nillable="true" type="xs:string" />
      <name="StationID" type="xs:int" />
      <name="StationName" nillable="true" type="xs:string" />
      <name="TemperatureInFahrenheit" nillable="true" type="xs:decimal" />
      <name="Visibility" nillable="true" type="xs:int" />
      <name="WindDirection" nillable="true" type="xs:decimal" />
      <name="WindDirectionCardinal" nillable="true" type="xs:string" />
      <name="WindGustSpeedInMPH" nillable="true" type="xs:decimal" />
      <name="WindSpeedInMPH" nillable="true" type="xs:decimal" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="WeatherInfo" nillable="true" type="tns:WeatherInfo" />
</xs:schema>
```

Additional response Xml Schemas:

```
<xs:schema xmlns:tns="http://schemas.microsoft.com/2003/10/Serialization/" attributeFormDefault="qualified" elementFormDefault="qualified" targetNamespace="http://schemas.microsoft.com/2003/10/Serialization/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="anyType" nillable="true" type="xs:anyType" />
  <xs:element name="anyURI" nillable="true" type="xs:anyURI" />
  <xs:element name="base64Binary" nillable="true" type="xs:base64Binary" />
  <xs:element name="boolean" nillable="true" type="xs:boolean" />
  <xs:element name="byte" nillable="true" type="xs:byte" />
  <xs:element name="dateTime" nillable="true" type="xs:dateTime" />
  <xs:element name="decimal" nillable="true" type="xs:decimal" />
  <xs:element name="double" nillable="true" type="xs:double" />
  <xs:element name="float" nillable="true" type="xs:float" />
  <xs:element name="int" nillable="true" type="xs:int" />
  <xs:element name="long" nillable="true" type="xs:long" />
  <xs:element name="QName" nillable="true" type="xs:QName" />
  <xs:element name="short" nillable="true" type="xs:short" />
  <xs:element name="string" nillable="true" type="xs:string" />
  <xs:element name="unsignedByte" nillable="true" type="xs:unsignedByte" />
  <xs:element name="unsignedInt" nillable="true" type="xs:unsignedInt" />
  <xs:element name="unsignedLong" nillable="true" type="xs:unsignedLong" />
  <xs:element name="unsignedShort" nillable="true" type="xs:unsignedShort" />
  <xs:element name="char" nillable="true" type="tns:char" />
  <xs:simpleType name="char">
    <xs:restriction base="xs:int" />
  </xs:simpleType>
  <xs:element name="duration" nillable="true" type="tns:duration" />
  <xs:simpleType name="duration">
    <xs:restriction base="xs:duration">
      <xs:pattern value="\\-?P(\\d\*D)?(T(\\d\*H)?(\\d\*M)?(\\d\*(\\.\\d\*)?S)?)?" />
      <xs:minInclusive value="-P10675199DT2H48M5.4775808S" />
      <xs:maxInclusive value="P10675199DT2H48M5.4775807S" />
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="guid" nillable="true" type="tns:guid" />
  <xs:simpleType name="guid">
    <xs:restriction base="xs:string">
      <xs:pattern value="\[\\da-fA-F\]{8}-\[\\da-fA-F\]{4}-\[\\da-fA-F\]{4}-\[\\da-fA-F\]{4}-\[\\da-fA-F\]{12}" />
    </xs:restriction>
  </xs:simpleType>
  <xs:attribute name="FactoryType" type="xs:QName" />
  <xs:attribute name="Id" type="xs:ID" />
  <xs:attribute name="Ref" type="xs:IDREF" />
</xs:schema>
```

```
<tns:schema targetNamespace="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://www.w3.org/2001/XMLSchema">
  <tns:element name="schema">
    <tns:complexType />
  </tns:element>
</tns:schema>
```