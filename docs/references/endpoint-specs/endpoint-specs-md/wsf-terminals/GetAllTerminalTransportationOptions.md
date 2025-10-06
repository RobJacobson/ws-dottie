Reference for http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminaltransports?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfTerminalTransportationResponse xmlns="http://www.wsdot.wa.gov/ferries/terminals/">
  <TerminalTransportationResponse>
    <TerminalID>2147483647</TerminalID>
    <TerminalSubjectID>2147483647</TerminalSubjectID>
    <RegionID>2147483647</RegionID>
    <TerminalName>String content</TerminalName>
    <TerminalAbbrev>String content</TerminalAbbrev>
    <SortSeq>2147483647</SortSeq>
    <ParkingInfo>String content</ParkingInfo>
    <ParkingShuttleInfo>String content</ParkingShuttleInfo>
    <AirportInfo>String content</AirportInfo>
    <AirportShuttleInfo>String content</AirportShuttleInfo>
    <MotorcycleInfo>String content</MotorcycleInfo>
    <TruckInfo>String content</TruckInfo>
    <BikeInfo>String content</BikeInfo>
    <TrainInfo>String content</TrainInfo>
    <TaxiInfo>String content</TaxiInfo>
    <HovInfo>String content</HovInfo>
    <TransitLinks>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
    </TransitLinks>
  </TerminalTransportationResponse>
  <TerminalTransportationResponse>
    <TerminalID>2147483647</TerminalID>
    <TerminalSubjectID>2147483647</TerminalSubjectID>
    <RegionID>2147483647</RegionID>
    <TerminalName>String content</TerminalName>
    <TerminalAbbrev>String content</TerminalAbbrev>
    <SortSeq>2147483647</SortSeq>
    <ParkingInfo>String content</ParkingInfo>
    <ParkingShuttleInfo>String content</ParkingShuttleInfo>
    <AirportInfo>String content</AirportInfo>
    <AirportShuttleInfo>String content</AirportShuttleInfo>
    <MotorcycleInfo>String content</MotorcycleInfo>
    <TruckInfo>String content</TruckInfo>
    <BikeInfo>String content</BikeInfo>
    <TrainInfo>String content</TrainInfo>
    <TaxiInfo>String content</TaxiInfo>
    <HovInfo>String content</HovInfo>
    <TransitLinks>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
    </TransitLinks>
  </TerminalTransportationResponse>
</ArrayOfTerminalTransportationResponse>
```

The following is an example response Json body:

```
\[{
	"TerminalID":2147483647,
	"TerminalSubjectID":2147483647,
	"RegionID":2147483647,
	"TerminalName":"String content",
	"TerminalAbbrev":"String content",
	"SortSeq":2147483647,
	"ParkingInfo":"String content",
	"ParkingShuttleInfo":"String content",
	"AirportInfo":"String content",
	"AirportShuttleInfo":"String content",
	"MotorcycleInfo":"String content",
	"TruckInfo":"String content",
	"BikeInfo":"String content",
	"TrainInfo":"String content",
	"TaxiInfo":"String content",
	"HovInfo":"String content",
	"TransitLinks":\[{
		"LinkURL":"String content",
		"LinkName":"String content",
		"SortSeq":2147483647
	}\]
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/terminals/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/terminals/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfTerminalTransportationResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="TerminalTransportationResponse" nillable="true" type="tns:TerminalTransportationResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfTerminalTransportationResponse" nillable="true" type="tns:ArrayOfTerminalTransportationResponse" />
  <xs:complexType name="TerminalTransportationResponse">
    <xs:sequence>
      <name="TerminalID" type="xs:int" />
      <name="TerminalSubjectID" type="xs:int" />
      <name="RegionID" type="xs:int" />
      <name="TerminalName" nillable="true" type="xs:string" />
      <name="TerminalAbbrev" nillable="true" type="xs:string" />
      <name="SortSeq" type="xs:int" />
      <name="ParkingInfo" nillable="true" type="xs:string" />
      <name="ParkingShuttleInfo" nillable="true" type="xs:string" />
      <name="AirportInfo" nillable="true" type="xs:string" />
      <name="AirportShuttleInfo" nillable="true" type="xs:string" />
      <name="MotorcycleInfo" nillable="true" type="xs:string" />
      <name="TruckInfo" nillable="true" type="xs:string" />
      <name="BikeInfo" nillable="true" type="xs:string" />
      <name="TrainInfo" nillable="true" type="xs:string" />
      <name="TaxiInfo" nillable="true" type="xs:string" />
      <name="HovInfo" nillable="true" type="xs:string" />
      <name="TransitLinks" nillable="true" type="tns:ArrayOfLink" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TerminalTransportationResponse" nillable="true" type="tns:TerminalTransportationResponse" />
  <xs:complexType name="ArrayOfLink">
    <xs:sequence>
      <maxOccurs="unbounded" name="Link" nillable="true" type="tns:Link" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfLink" nillable="true" type="tns:ArrayOfLink" />
  <xs:complexType name="Link">
    <xs:sequence>
      <name="LinkURL" nillable="true" type="xs:string" />
      <name="LinkName" nillable="true" type="xs:string" />
      <name="SortSeq" nillable="true" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="Link" nillable="true" type="tns:Link" />
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