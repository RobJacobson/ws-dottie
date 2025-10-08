Reference for http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations/{VESSELID}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vessellocations/{VESSELID}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<VesselLocationResponse xmlns="http://www.wsdot.wa.gov/ferries/vessels/">
  <VesselID>2147483647</VesselID>
  <VesselName>String content</VesselName>
  <Mmsi>2147483647</Mmsi>
  <DepartingTerminalID>2147483647</DepartingTerminalID>
  <DepartingTerminalName>String content</DepartingTerminalName>
  <DepartingTerminalAbbrev>String content</DepartingTerminalAbbrev>
  <ArrivingTerminalID>2147483647</ArrivingTerminalID>
  <ArrivingTerminalName>String content</ArrivingTerminalName>
  <ArrivingTerminalAbbrev>String content</ArrivingTerminalAbbrev>
  <Latitude>1.26743233E+15</Latitude>
  <Longitude>1.26743233E+15</Longitude>
  <Speed>1.26743233E+15</Speed>
  <Heading>2147483647</Heading>
  <InService>true</InService>
  <AtDock>true</AtDock>
  <LeftDock>1999-05-31T11:20:00</LeftDock>
  <Eta>1999-05-31T11:20:00</Eta>
  <EtaBasis>String content</EtaBasis>
  <ScheduledDeparture>1999-05-31T11:20:00</ScheduledDeparture>
  <OpRouteAbbrev>
    <string>String content</string>
    <string>String content</string>
  </OpRouteAbbrev>
  <VesselPositionNum>2147483647</VesselPositionNum>
  <SortSeq>2147483647</SortSeq>
  <ManagedBy>WSF</ManagedBy>
  <TimeStamp>1999-05-31T11:20:00</TimeStamp>
  <VesselWatchShutID>2147483647</VesselWatchShutID>
  <VesselWatchShutMsg>String content</VesselWatchShutMsg>
  <VesselWatchShutFlag>String content</VesselWatchShutFlag>
  <VesselWatchStatus>String content</VesselWatchStatus>
  <VesselWatchMsg>String content</VesselWatchMsg>
</VesselLocationResponse>
```

The following is an example response Json body:

```
{
	"VesselID":2147483647,
	"VesselName":"String content",
	"Mmsi":2147483647,
	"DepartingTerminalID":2147483647,
	"DepartingTerminalName":"String content",
	"DepartingTerminalAbbrev":"String content",
	"ArrivingTerminalID":2147483647,
	"ArrivingTerminalName":"String content",
	"ArrivingTerminalAbbrev":"String content",
	"Latitude":1.26743233E+15,
	"Longitude":1.26743233E+15,
	"Speed":1.26743233E+15,
	"Heading":2147483647,
	"InService":true,
	"AtDock":true,
	"LeftDock":"\\/Date(928174800000-0700)\\/",
	"Eta":"\\/Date(928174800000-0700)\\/",
	"EtaBasis":"String content",
	"ScheduledDeparture":"\\/Date(928174800000-0700)\\/",
	"OpRouteAbbrev":\["String content"\],
	"VesselPositionNum":2147483647,
	"SortSeq":2147483647,
	"ManagedBy":0,
	"TimeStamp":"\\/Date(928174800000-0700)\\/",
	"VesselWatchShutID":2147483647,
	"VesselWatchShutMsg":"String content",
	"VesselWatchShutFlag":"String content",
	"VesselWatchStatus":"String content",
	"VesselWatchMsg":"String content"
}
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/vessels/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/vessels/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="VesselLocationResponse">
    <xs:sequence>
      <name="VesselID" type="xs:int" />
      <name="VesselName" nillable="true" type="xs:string" />
      <name="Mmsi" nillable="true" type="xs:int" />
      <name="DepartingTerminalID" type="xs:int" />
      <name="DepartingTerminalName" nillable="true" type="xs:string" />
      <name="DepartingTerminalAbbrev" nillable="true" type="xs:string" />
      <name="ArrivingTerminalID" nillable="true" type="xs:int" />
      <name="ArrivingTerminalName" nillable="true" type="xs:string" />
      <name="ArrivingTerminalAbbrev" nillable="true" type="xs:string" />
      <name="Latitude" type="xs:double" />
      <name="Longitude" type="xs:double" />
      <name="Speed" type="xs:double" />
      <name="Heading" type="xs:int" />
      <name="InService" type="xs:boolean" />
      <name="AtDock" type="xs:boolean" />
      <name="LeftDock" nillable="true" type="xs:dateTime" />
      <name="Eta" nillable="true" type="xs:dateTime" />
      <name="EtaBasis" nillable="true" type="xs:string" />
      <name="ScheduledDeparture" nillable="true" type="xs:dateTime" />
      <name="OpRouteAbbrev" nillable="true" type="tns:ArrayOfString" />
      <name="VesselPositionNum" nillable="true" type="xs:int" />
      <name="SortSeq" type="xs:int" />
      <name="ManagedBy" type="tns:VesselManagement" />
      <name="TimeStamp" type="xs:dateTime" />
      <name="VesselWatchShutID" type="xs:int" />
      <name="VesselWatchShutMsg" nillable="true" type="xs:string" />
      <name="VesselWatchShutFlag" nillable="true" type="xs:string" />
      <name="VesselWatchStatus" nillable="true" type="xs:string" />
      <name="VesselWatchMsg" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="VesselLocationResponse" nillable="true" type="tns:VesselLocationResponse" />
  <xs:complexType name="ArrayOfString">
    <xs:sequence>
      <maxOccurs="unbounded" name="string" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfString" nillable="true" type="tns:ArrayOfString" />
  <xs:simpleType name="VesselManagement">
    <xs:restriction base="xs:string">
      <xs:enumeration value="WSF">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="KCM">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="VesselManagement" nillable="true" type="tns:VesselManagement" />
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