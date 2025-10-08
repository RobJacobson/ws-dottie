Reference for http://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode={ACCESSCODE}

**Url:** http://wsdot.wa.gov/Traffic/api/MountainPassConditions/MountainPassConditionsREST.svc/GetMountainPassConditionsAsJson?AccessCode={ACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfPassCondition xmlns="http://schemas.datacontract.org/2004/07/">
  <PassCondition>
    <DateUpdated>1999-05-31T11:20:00</DateUpdated>
    <ElevationInFeet>2147483647</ElevationInFeet>
    <Latitude>1.26743233E+15</Latitude>
    <Longitude>1.26743233E+15</Longitude>
    <MountainPassId>2147483647</MountainPassId>
    <MountainPassName>String content</MountainPassName>
    <RestrictionOne>
      <RestrictionText>String content</RestrictionText>
      <TravelDirection>String content</TravelDirection>
    </RestrictionOne>
    <RestrictionTwo>
      <RestrictionText>String content</RestrictionText>
      <TravelDirection>String content</TravelDirection>
    </RestrictionTwo>
    <RoadCondition>String content</RoadCondition>
    <TemperatureInFahrenheit>2147483647</TemperatureInFahrenheit>
    <TravelAdvisoryActive>true</TravelAdvisoryActive>
    <WeatherCondition>String content</WeatherCondition>
  </PassCondition>
  <PassCondition>
    <DateUpdated>1999-05-31T11:20:00</DateUpdated>
    <ElevationInFeet>2147483647</ElevationInFeet>
    <Latitude>1.26743233E+15</Latitude>
    <Longitude>1.26743233E+15</Longitude>
    <MountainPassId>2147483647</MountainPassId>
    <MountainPassName>String content</MountainPassName>
    <RestrictionOne>
      <RestrictionText>String content</RestrictionText>
      <TravelDirection>String content</TravelDirection>
    </RestrictionOne>
    <RestrictionTwo>
      <RestrictionText>String content</RestrictionText>
      <TravelDirection>String content</TravelDirection>
    </RestrictionTwo>
    <RoadCondition>String content</RoadCondition>
    <TemperatureInFahrenheit>2147483647</TemperatureInFahrenheit>
    <TravelAdvisoryActive>true</TravelAdvisoryActive>
    <WeatherCondition>String content</WeatherCondition>
  </PassCondition>
</ArrayOfPassCondition>
```

The following is an example response Json body:

```
\[{
	"DateUpdated":"\\/Date(928174800000-0700)\\/",
	"ElevationInFeet":2147483647,
	"Latitude":1.26743233E+15,
	"Longitude":1.26743233E+15,
	"MountainPassId":2147483647,
	"MountainPassName":"String content",
	"RestrictionOne":{
		"RestrictionText":"String content",
		"TravelDirection":"String content"
	},
	"RestrictionTwo":{
		"RestrictionText":"String content",
		"TravelDirection":"String content"
	},
	"RoadCondition":"String content",
	"TemperatureInFahrenheit":2147483647,
	"TravelAdvisoryActive":true,
	"WeatherCondition":"String content"
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://schemas.datacontract.org/2004/07/" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfPassCondition">
    <xs:sequence>
      <maxOccurs="unbounded" name="PassCondition" nillable="true" type="tns:PassCondition" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfPassCondition" nillable="true" type="tns:ArrayOfPassCondition" />
  <xs:complexType name="PassCondition">
    <xs:sequence>
      <name="DateUpdated" type="xs:dateTime" />
      <name="ElevationInFeet" type="xs:int" />
      <name="Latitude" type="xs:double" />
      <name="Longitude" type="xs:double" />
      <name="MountainPassId" type="xs:int" />
      <name="MountainPassName" nillable="true" type="xs:string" />
      <name="RestrictionOne" nillable="true" type="tns:TravelRestriction" />
      <name="RestrictionTwo" nillable="true" type="tns:TravelRestriction" />
      <name="RoadCondition" nillable="true" type="xs:string" />
      <name="TemperatureInFahrenheit" nillable="true" type="xs:int" />
      <name="TravelAdvisoryActive" type="xs:boolean" />
      <name="WeatherCondition" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="PassCondition" nillable="true" type="tns:PassCondition" />
  <xs:complexType name="TravelRestriction">
    <xs:sequence>
      <name="RestrictionText" nillable="true" type="xs:string" />
      <name="TravelDirection" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TravelRestriction" nillable="true" type="tns:TravelRestriction" />
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