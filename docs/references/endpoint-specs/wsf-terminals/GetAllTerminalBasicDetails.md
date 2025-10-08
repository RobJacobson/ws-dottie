Reference for http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminalbasics?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfTerminalBasicResponse xmlns="http://www.wsdot.wa.gov/ferries/terminals/">
  <TerminalBasicResponse>
    <TerminalID>2147483647</TerminalID>
    <TerminalSubjectID>2147483647</TerminalSubjectID>
    <RegionID>2147483647</RegionID>
    <TerminalName>String content</TerminalName>
    <TerminalAbbrev>String content</TerminalAbbrev>
    <SortSeq>2147483647</SortSeq>
    <OverheadPassengerLoading>true</OverheadPassengerLoading>
    <Elevator>true</Elevator>
    <WaitingRoom>true</WaitingRoom>
    <FoodService>true</FoodService>
    <Restroom>true</Restroom>
  </TerminalBasicResponse>
  <TerminalBasicResponse>
    <TerminalID>2147483647</TerminalID>
    <TerminalSubjectID>2147483647</TerminalSubjectID>
    <RegionID>2147483647</RegionID>
    <TerminalName>String content</TerminalName>
    <TerminalAbbrev>String content</TerminalAbbrev>
    <SortSeq>2147483647</SortSeq>
    <OverheadPassengerLoading>true</OverheadPassengerLoading>
    <Elevator>true</Elevator>
    <WaitingRoom>true</WaitingRoom>
    <FoodService>true</FoodService>
    <Restroom>true</Restroom>
  </TerminalBasicResponse>
</ArrayOfTerminalBasicResponse>
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
	"OverheadPassengerLoading":true,
	"Elevator":true,
	"WaitingRoom":true,
	"FoodService":true,
	"Restroom":true
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/terminals/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/terminals/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfTerminalBasicResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="TerminalBasicResponse" nillable="true" type="tns:TerminalBasicResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfTerminalBasicResponse" nillable="true" type="tns:ArrayOfTerminalBasicResponse" />
  <xs:complexType name="TerminalBasicResponse">
    <xs:sequence>
      <name="TerminalID" type="xs:int" />
      <name="TerminalSubjectID" type="xs:int" />
      <name="RegionID" type="xs:int" />
      <name="TerminalName" nillable="true" type="xs:string" />
      <name="TerminalAbbrev" nillable="true" type="xs:string" />
      <name="SortSeq" type="xs:int" />
      <name="OverheadPassengerLoading" type="xs:boolean" />
      <name="Elevator" type="xs:boolean" />
      <name="WaitingRoom" type="xs:boolean" />
      <name="FoodService" type="xs:boolean" />
      <name="Restroom" type="xs:boolean" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TerminalBasicResponse" nillable="true" type="tns:TerminalBasicResponse" />
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