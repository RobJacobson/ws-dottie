Reference for http://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?AccessCode={ACCESSCODE}&Route={ROUTE}

Method to return Bridge clearances as JSON data. See Disclaimer on API home page (wsdot.wa.gov/traffic/api)

**Url:** http://wsdot.wa.gov/Traffic/api/Bridges/ClearanceREST.svc/GetClearancesAsJson?AccessCode={ACCESSCODE}&Route={ROUTE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfBridgeDataGIS xmlns="http://schemas.datacontract.org/2004/07/">
  <BridgeDataGIS>
    <APILastUpdate>1999-05-31T11:20:00</APILastUpdate>
    <BridgeNumber>String content</BridgeNumber>
    <ControlEntityGuid>1627aea5-8e0a-4371-9022-9b504344e724</ControlEntityGuid>
    <CrossingDescription>String content</CrossingDescription>
    <CrossingLocationId>2147483647</CrossingLocationId>
    <CrossingRecordGuid>1627aea5-8e0a-4371-9022-9b504344e724</CrossingRecordGuid>
    <InventoryDirection>String content</InventoryDirection>
    <Latitude>12678967.543233</Latitude>
    <LocationGuid>1627aea5-8e0a-4371-9022-9b504344e724</LocationGuid>
    <Longitude>12678967.543233</Longitude>
    <RouteDate>1999-05-31T11:20:00</RouteDate>
    <SRMP>12678967.543233</SRMP>
    <SRMPAheadBackIndicator>String content</SRMPAheadBackIndicator>
    <StateRouteID>String content</StateRouteID>
    <StateStructureId>String content</StateStructureId>
    <VerticalClearanceMaximumFeetInch>String content</VerticalClearanceMaximumFeetInch>
    <VerticalClearanceMaximumInches>2147483647</VerticalClearanceMaximumInches>
    <VerticalClearanceMinimumFeetInch>String content</VerticalClearanceMinimumFeetInch>
    <VerticalClearanceMinimumInches>2147483647</VerticalClearanceMinimumInches>
  </BridgeDataGIS>
  <BridgeDataGIS>
    <APILastUpdate>1999-05-31T11:20:00</APILastUpdate>
    <BridgeNumber>String content</BridgeNumber>
    <ControlEntityGuid>1627aea5-8e0a-4371-9022-9b504344e724</ControlEntityGuid>
    <CrossingDescription>String content</CrossingDescription>
    <CrossingLocationId>2147483647</CrossingLocationId>
    <CrossingRecordGuid>1627aea5-8e0a-4371-9022-9b504344e724</CrossingRecordGuid>
    <InventoryDirection>String content</InventoryDirection>
    <Latitude>12678967.543233</Latitude>
    <LocationGuid>1627aea5-8e0a-4371-9022-9b504344e724</LocationGuid>
    <Longitude>12678967.543233</Longitude>
    <RouteDate>1999-05-31T11:20:00</RouteDate>
    <SRMP>12678967.543233</SRMP>
    <SRMPAheadBackIndicator>String content</SRMPAheadBackIndicator>
    <StateRouteID>String content</StateRouteID>
    <StateStructureId>String content</StateStructureId>
    <VerticalClearanceMaximumFeetInch>String content</VerticalClearanceMaximumFeetInch>
    <VerticalClearanceMaximumInches>2147483647</VerticalClearanceMaximumInches>
    <VerticalClearanceMinimumFeetInch>String content</VerticalClearanceMinimumFeetInch>
    <VerticalClearanceMinimumInches>2147483647</VerticalClearanceMinimumInches>
  </BridgeDataGIS>
</ArrayOfBridgeDataGIS>
```

The following is an example response Json body:

```
\[{
	"APILastUpdate":"\\/Date(928174800000-0700)\\/",
	"BridgeNumber":"String content",
	"ControlEntityGuid":"1627aea5-8e0a-4371-9022-9b504344e724",
	"CrossingDescription":"String content",
	"CrossingLocationId":2147483647,
	"CrossingRecordGuid":"1627aea5-8e0a-4371-9022-9b504344e724",
	"InventoryDirection":"String content",
	"Latitude":12678967.543233,
	"LocationGuid":"1627aea5-8e0a-4371-9022-9b504344e724",
	"Longitude":12678967.543233,
	"RouteDate":"\\/Date(928174800000-0700)\\/",
	"SRMP":12678967.543233,
	"SRMPAheadBackIndicator":"String content",
	"StateRouteID":"String content",
	"StateStructureId":"String content",
	"VerticalClearanceMaximumFeetInch":"String content",
	"VerticalClearanceMaximumInches":2147483647,
	"VerticalClearanceMinimumFeetInch":"String content",
	"VerticalClearanceMinimumInches":2147483647
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://schemas.datacontract.org/2004/07/" xmlns:ser="http://schemas.microsoft.com/2003/10/Serialization/" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="ArrayOfBridgeDataGIS">
    <xs:sequence>
      <maxOccurs="unbounded" name="BridgeDataGIS" nillable="true" type="tns:BridgeDataGIS" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfBridgeDataGIS" nillable="true" type="tns:ArrayOfBridgeDataGIS" />
  <xs:complexType name="BridgeDataGIS">
    <xs:sequence>
      <name="APILastUpdate" type="xs:dateTime" />
      <name="BridgeNumber" nillable="true" type="xs:string" />
      <name="ControlEntityGuid" type="ser:guid" />
      <name="CrossingDescription" nillable="true" type="xs:string" />
      <name="CrossingLocationId" type="xs:int" />
      <name="CrossingRecordGuid" type="ser:guid" />
      <name="InventoryDirection" nillable="true" type="xs:string" />
      <name="Latitude" type="xs:decimal" />
      <name="LocationGuid" type="ser:guid" />
      <name="Longitude" type="xs:decimal" />
      <name="RouteDate" type="xs:dateTime" />
      <name="SRMP" type="xs:decimal" />
      <name="SRMPAheadBackIndicator" nillable="true" type="xs:string" />
      <name="StateRouteID" nillable="true" type="xs:string" />
      <name="StateStructureId" nillable="true" type="xs:string" />
      <name="VerticalClearanceMaximumFeetInch" nillable="true" type="xs:string" />
      <name="VerticalClearanceMaximumInches" type="xs:int" />
      <name="VerticalClearanceMinimumFeetInch" nillable="true" type="xs:string" />
      <name="VerticalClearanceMinimumInches" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="BridgeDataGIS" nillable="true" type="tns:BridgeDataGIS" />
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