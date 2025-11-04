Reference for http://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson?AccessCode={ACCESSCODE}

Method to return current Commercial Vehicle restrictions in JSON format including an Unique Id

**Url:** http://wsdot.wa.gov/Traffic/api/CVRestrictions/CVRestrictionsREST.svc/GetCommercialVehicleRestrictionsWithIdAsJson?AccessCode={ACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfCVRestrictionDataWithId xmlns="http://schemas.datacontract.org/2004/07/">
  <CVRestrictionDataWithId>
    <BLMaxAxle>2147483647</BLMaxAxle>
    <BridgeName>String content</BridgeName>
    <BridgeNumber>String content</BridgeNumber>
    <CL8MaxAxle>2147483647</CL8MaxAxle>
    <DateEffective>1999-05-31T11:20:00</DateEffective>
    <DateExpires>1999-05-31T11:20:00</DateExpires>
    <DatePosted>1999-05-31T11:20:00</DatePosted>
    <EndRoadwayLocation>
      <Description>String content</Description>
      <Direction>String content</Direction>
      <Latitude>12678967.543233</Latitude>
      <Longitude>12678967.543233</Longitude>
      <MilePost>12678967.543233</MilePost>
      <RoadName>String content</RoadName>
    </EndRoadwayLocation>
    <IsDetourAvailable>true</IsDetourAvailable>
    <IsExceptionsAllowed>true</IsExceptionsAllowed>
    <IsPermanentRestriction>true</IsPermanentRestriction>
    <IsWarning>true</IsWarning>
    <Latitude>1.26743233E+15</Latitude>
    <LocationDescription>String content</LocationDescription>
    <LocationName>String content</LocationName>
    <Longitude>1.26743233E+15</Longitude>
    <MaximumGrossVehicleWeightInPounds>2147483647</MaximumGrossVehicleWeightInPounds>
    <RestrictionComment>String content</RestrictionComment>
    <RestrictionHeightInInches>2147483647</RestrictionHeightInInches>
    <RestrictionLengthInInches>2147483647</RestrictionLengthInInches>
    <RestrictionType>BridgeRestriction</RestrictionType>
    <RestrictionWeightInPounds>2147483647</RestrictionWeightInPounds>
    <RestrictionWidthInInches>2147483647</RestrictionWidthInInches>
    <SAMaxAxle>2147483647</SAMaxAxle>
    <StartRoadwayLocation>
      <Description>String content</Description>
      <Direction>String content</Direction>
      <Latitude>12678967.543233</Latitude>
      <Longitude>12678967.543233</Longitude>
      <MilePost>12678967.543233</MilePost>
      <RoadName>String content</RoadName>
    </StartRoadwayLocation>
    <State>String content</State>
    <StateRouteID>String content</StateRouteID>
    <TDMaxAxle>2147483647</TDMaxAxle>
    <VehicleType>String content</VehicleType>
    <UniqueID>String content</UniqueID>
  </CVRestrictionDataWithId>
  <CVRestrictionDataWithId>
    <BLMaxAxle>2147483647</BLMaxAxle>
    <BridgeName>String content</BridgeName>
    <BridgeNumber>String content</BridgeNumber>
    <CL8MaxAxle>2147483647</CL8MaxAxle>
    <DateEffective>1999-05-31T11:20:00</DateEffective>
    <DateExpires>1999-05-31T11:20:00</DateExpires>
    <DatePosted>1999-05-31T11:20:00</DatePosted>
    <EndRoadwayLocation>
      <Description>String content</Description>
      <Direction>String content</Direction>
      <Latitude>12678967.543233</Latitude>
      <Longitude>12678967.543233</Longitude>
      <MilePost>12678967.543233</MilePost>
      <RoadName>String content</RoadName>
    </EndRoadwayLocation>
    <IsDetourAvailable>true</IsDetourAvailable>
    <IsExceptionsAllowed>true</IsExceptionsAllowed>
    <IsPermanentRestriction>true</IsPermanentRestriction>
    <IsWarning>true</IsWarning>
    <Latitude>1.26743233E+15</Latitude>
    <LocationDescription>String content</LocationDescription>
    <LocationName>String content</LocationName>
    <Longitude>1.26743233E+15</Longitude>
    <MaximumGrossVehicleWeightInPounds>2147483647</MaximumGrossVehicleWeightInPounds>
    <RestrictionComment>String content</RestrictionComment>
    <RestrictionHeightInInches>2147483647</RestrictionHeightInInches>
    <RestrictionLengthInInches>2147483647</RestrictionLengthInInches>
    <RestrictionType>BridgeRestriction</RestrictionType>
    <RestrictionWeightInPounds>2147483647</RestrictionWeightInPounds>
    <RestrictionWidthInInches>2147483647</RestrictionWidthInInches>
    <SAMaxAxle>2147483647</SAMaxAxle>
    <StartRoadwayLocation>
      <Description>String content</Description>
      <Direction>String content</Direction>
      <Latitude>12678967.543233</Latitude>
      <Longitude>12678967.543233</Longitude>
      <MilePost>12678967.543233</MilePost>
      <RoadName>String content</RoadName>
    </StartRoadwayLocation>
    <State>String content</State>
    <StateRouteID>String content</StateRouteID>
    <TDMaxAxle>2147483647</TDMaxAxle>
    <VehicleType>String content</VehicleType>
    <UniqueID>String content</UniqueID>
  </CVRestrictionDataWithId>
</ArrayOfCVRestrictionDataWithId>
```

The following is an example response Json body:

```
\[{
	"BLMaxAxle":2147483647,
	"BridgeName":"String content",
	"BridgeNumber":"String content",
	"CL8MaxAxle":2147483647,
	"DateEffective":"\\/Date(928174800000-0700)\\/",
	"DateExpires":"\\/Date(928174800000-0700)\\/",
	"DatePosted":"\\/Date(928174800000-0700)\\/",
	"EndRoadwayLocation":{
		"Description":"String content",
		"Direction":"String content",
		"Latitude":12678967.543233,
		"Longitude":12678967.543233,
		"MilePost":12678967.543233,
		"RoadName":"String content"
	},
	"IsDetourAvailable":true,
	"IsExceptionsAllowed":true,
	"IsPermanentRestriction":true,
	"IsWarning":true,
	"Latitude":1.26743233E+15,
	"LocationDescription":"String content",
	"LocationName":"String content",
	"Longitude":1.26743233E+15,
	"MaximumGrossVehicleWeightInPounds":2147483647,
	"RestrictionComment":"String content",
	"RestrictionHeightInInches":2147483647,
	"RestrictionLengthInInches":2147483647,
	"RestrictionType":0,
	"RestrictionWeightInPounds":2147483647,
	"RestrictionWidthInInches":2147483647,
	"SAMaxAxle":2147483647,
	"StartRoadwayLocation":{
		"Description":"String content",
		"Direction":"String content",
		"Latitude":12678967.543233,
		"Longitude":12678967.543233,
		"MilePost":12678967.543233,
		"RoadName":"String content"
	},
	"State":"String content",
	"StateRouteID":"String content",
	"TDMaxAxle":2147483647,
	"VehicleType":"String content",
	"UniqueID":"String content"
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://schemas.datacontract.org/2004/07/" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfCVRestrictionDataWithId">
    <xs:sequence>
      <maxOccurs="unbounded" name="CVRestrictionDataWithId" nillable="true" type="tns:CVRestrictionDataWithId" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfCVRestrictionDataWithId" nillable="true" type="tns:ArrayOfCVRestrictionDataWithId" />
  <xs:complexType name="CVRestrictionDataWithId">
    <xs:complexContent mixed="false">
      <xs:extension base="tns:CVRestrictionData">
        <xs:sequence>
          <name="UniqueID" nillable="true" type="xs:string" />
        </xs:sequence>
      </xs:extension>
    </xs:complexContent>
  </xs:complexType>
  <xs:element name="CVRestrictionDataWithId" nillable="true" type="tns:CVRestrictionDataWithId" />
  <xs:complexType name="CVRestrictionData">
    <xs:sequence>
      <name="BLMaxAxle" nillable="true" type="xs:int" />
      <name="BridgeName" nillable="true" type="xs:string" />
      <name="BridgeNumber" nillable="true" type="xs:string" />
      <name="CL8MaxAxle" nillable="true" type="xs:int" />
      <name="DateEffective" type="xs:dateTime" />
      <name="DateExpires" type="xs:dateTime" />
      <name="DatePosted" type="xs:dateTime" />
      <name="EndRoadwayLocation" nillable="true" type="tns:RoadwayLocation" />
      <name="IsDetourAvailable" type="xs:boolean" />
      <name="IsExceptionsAllowed" type="xs:boolean" />
      <name="IsPermanentRestriction" type="xs:boolean" />
      <name="IsWarning" type="xs:boolean" />
      <name="Latitude" type="xs:double" />
      <name="LocationDescription" nillable="true" type="xs:string" />
      <name="LocationName" nillable="true" type="xs:string" />
      <name="Longitude" type="xs:double" />
      <name="MaximumGrossVehicleWeightInPounds" nillable="true" type="xs:int" />
      <name="RestrictionComment" nillable="true" type="xs:string" />
      <name="RestrictionHeightInInches" nillable="true" type="xs:int" />
      <name="RestrictionLengthInInches" nillable="true" type="xs:int" />
      <name="RestrictionType" type="tns:CommercialVehicleRestrictionType" />
      <name="RestrictionWeightInPounds" nillable="true" type="xs:int" />
      <name="RestrictionWidthInInches" nillable="true" type="xs:int" />
      <name="SAMaxAxle" nillable="true" type="xs:int" />
      <name="StartRoadwayLocation" nillable="true" type="tns:RoadwayLocation" />
      <name="State" nillable="true" type="xs:string" />
      <name="StateRouteID" nillable="true" type="xs:string" />
      <name="TDMaxAxle" nillable="true" type="xs:int" />
      <name="VehicleType" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="CVRestrictionData" nillable="true" type="tns:CVRestrictionData" />
  <xs:complexType name="RoadwayLocation">
    <xs:sequence>
      <name="Description" nillable="true" type="xs:string" />
      <name="Direction" nillable="true" type="xs:string" />
      <name="Latitude" type="xs:decimal" />
      <name="Longitude" type="xs:decimal" />
      <name="MilePost" type="xs:decimal" />
      <name="RoadName" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="RoadwayLocation" nillable="true" type="tns:RoadwayLocation" />
  <xs:simpleType name="CommercialVehicleRestrictionType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="BridgeRestriction" />
      <xs:enumeration value="RoadRestriction" />
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="CommercialVehicleRestrictionType" nillable="true" type="tns:CommercialVehicleRestrictionType" />
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