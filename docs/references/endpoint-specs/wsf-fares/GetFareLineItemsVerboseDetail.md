Reference for http://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitemsverbose/{TRIPDATE}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Fares/rest/farelineitemsverbose/{TRIPDATE}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<LineItemVerboseResponse xmlns="http://www.wsdot.wa.gov/ferries/fares/">
  <TerminalComboVerbose>
    <TerminalComboVerboseResponse>
      <DepartingTerminalID>2147483647</DepartingTerminalID>
      <DepartingDescription>String content</DepartingDescription>
      <ArrivingTerminalID>2147483647</ArrivingTerminalID>
      <ArrivingDescription>String content</ArrivingDescription>
      <CollectionDescription>String content</CollectionDescription>
    </TerminalComboVerboseResponse>
    <TerminalComboVerboseResponse>
      <DepartingTerminalID>2147483647</DepartingTerminalID>
      <DepartingDescription>String content</DepartingDescription>
      <ArrivingTerminalID>2147483647</ArrivingTerminalID>
      <ArrivingDescription>String content</ArrivingDescription>
      <CollectionDescription>String content</CollectionDescription>
    </TerminalComboVerboseResponse>
  </TerminalComboVerbose>
  <LineItemLookup>
    <LineItemXref>
      <TerminalComboIndex>2147483647</TerminalComboIndex>
      <LineItemIndex>2147483647</LineItemIndex>
      <RoundTripLineItemIndex>2147483647</RoundTripLineItemIndex>
    </LineItemXref>
    <LineItemXref>
      <TerminalComboIndex>2147483647</TerminalComboIndex>
      <LineItemIndex>2147483647</LineItemIndex>
      <RoundTripLineItemIndex>2147483647</RoundTripLineItemIndex>
    </LineItemXref>
  </LineItemLookup>
  <LineItems>
    <ArrayOfLineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
    </ArrayOfLineItemResponse>
    <ArrayOfLineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
    </ArrayOfLineItemResponse>
  </LineItems>
  <RoundTripLineItems>
    <ArrayOfLineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
    </ArrayOfLineItemResponse>
    <ArrayOfLineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
      <LineItemResponse>
        <FareLineItemID>2147483647</FareLineItemID>
        <FareLineItem>String content</FareLineItem>
        <Category>String content</Category>
        <DirectionIndependent>true</DirectionIndependent>
        <Amount>12678967.543233</Amount>
      </LineItemResponse>
    </ArrayOfLineItemResponse>
  </RoundTripLineItems>
</LineItemVerboseResponse>
```

The following is an example response Json body:

```
{
	"TerminalComboVerbose":\[{
		"DepartingTerminalID":2147483647,
		"DepartingDescription":"String content",
		"ArrivingTerminalID":2147483647,
		"ArrivingDescription":"String content",
		"CollectionDescription":"String content"
	}\],
	"LineItemLookup":\[{
		"TerminalComboIndex":2147483647,
		"LineItemIndex":2147483647,
		"RoundTripLineItemIndex":2147483647
	}\],
	"LineItems":\[\[{
		"FareLineItemID":2147483647,
		"FareLineItem":"String content",
		"Category":"String content",
		"DirectionIndependent":true,
		"Amount":12678967.543233
	}\]\],
	"RoundTripLineItems":\[\[{
		"FareLineItemID":2147483647,
		"FareLineItem":"String content",
		"Category":"String content",
		"DirectionIndependent":true,
		"Amount":12678967.543233
	}\]\]
}
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/fares/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/fares/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="LineItemVerboseResponse">
    <xs:sequence>
      <name="TerminalComboVerbose" nillable="true" type="tns:ArrayOfTerminalComboVerboseResponse" />
      <name="LineItemLookup" nillable="true" type="tns:ArrayOfLineItemXref" />
      <name="LineItems" nillable="true" type="tns:ArrayOfArrayOfLineItemResponse" />
      <name="RoundTripLineItems" nillable="true" type="tns:ArrayOfArrayOfLineItemResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="LineItemVerboseResponse" nillable="true" type="tns:LineItemVerboseResponse" />
  <xs:complexType name="ArrayOfTerminalComboVerboseResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="TerminalComboVerboseResponse" nillable="true" type="tns:TerminalComboVerboseResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfTerminalComboVerboseResponse" nillable="true" type="tns:ArrayOfTerminalComboVerboseResponse" />
  <xs:complexType name="TerminalComboVerboseResponse">
    <xs:sequence>
      <name="DepartingTerminalID" type="xs:int" />
      <name="DepartingDescription" nillable="true" type="xs:string" />
      <name="ArrivingTerminalID" type="xs:int" />
      <name="ArrivingDescription" nillable="true" type="xs:string" />
      <name="CollectionDescription" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TerminalComboVerboseResponse" nillable="true" type="tns:TerminalComboVerboseResponse" />
  <xs:complexType name="ArrayOfLineItemXref">
    <xs:sequence>
      <maxOccurs="unbounded" name="LineItemXref" nillable="true" type="tns:LineItemXref" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfLineItemXref" nillable="true" type="tns:ArrayOfLineItemXref" />
  <xs:complexType name="LineItemXref">
    <xs:sequence>
      <name="TerminalComboIndex" type="xs:int" />
      <name="LineItemIndex" type="xs:int" />
      <name="RoundTripLineItemIndex" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="LineItemXref" nillable="true" type="tns:LineItemXref" />
  <xs:complexType name="ArrayOfArrayOfLineItemResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="ArrayOfLineItemResponse" nillable="true" type="tns:ArrayOfLineItemResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfArrayOfLineItemResponse" nillable="true" type="tns:ArrayOfArrayOfLineItemResponse" />
  <xs:complexType name="ArrayOfLineItemResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="LineItemResponse" nillable="true" type="tns:LineItemResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfLineItemResponse" nillable="true" type="tns:ArrayOfLineItemResponse" />
  <xs:complexType name="LineItemResponse">
    <xs:sequence>
      <name="FareLineItemID" type="xs:int" />
      <name="FareLineItem" nillable="true" type="xs:string" />
      <name="Category" nillable="true" type="xs:string" />
      <name="DirectionIndependent" type="xs:boolean" />
      <name="Amount" type="xs:decimal" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="LineItemResponse" nillable="true" type="tns:LineItemResponse" />
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