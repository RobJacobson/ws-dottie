Reference for http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson?AccessCode={ACCESSCODE}

**Url:** http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollTripRatesAsJson?AccessCode={ACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<TollTrips xmlns="http://schemas.datacontract.org/2004/07/">
  <LastUpdated>1999-05-31T11:20:00</LastUpdated>
  <Trips>
    <TripRate>
      <Message>String content</Message>
      <MessageUpdateTime>1999-05-31T11:20:00</MessageUpdateTime>
      <Toll>12678967.543233</Toll>
      <TripName>String content</TripName>
    </TripRate>
    <TripRate>
      <Message>String content</Message>
      <MessageUpdateTime>1999-05-31T11:20:00</MessageUpdateTime>
      <Toll>12678967.543233</Toll>
      <TripName>String content</TripName>
    </TripRate>
  </Trips>
  <Version>2147483647</Version>
</TollTrips>
```

The following is an example response Json body:

```
{
	"LastUpdated":"\\/Date(928174800000-0700)\\/",
	"Trips":\[{
		"Message":"String content",
		"MessageUpdateTime":"\\/Date(928174800000-0700)\\/",
		"Toll":12678967.543233,
		"TripName":"String content"
	}\],
	"Version":2147483647
}
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://schemas.datacontract.org/2004/07/" elementFormDefault="qualified" targetNamespace="http://schemas.datacontract.org/2004/07/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="TollTrips">
    <xs:sequence>
      <name="LastUpdated" type="xs:dateTime" />
      <name="Trips" nillable="true" type="tns:ArrayOfTripRate" />
      <name="Version" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TollTrips" nillable="true" type="tns:TollTrips" />
  <xs:complexType name="ArrayOfTripRate">
    <xs:sequence>
      <maxOccurs="unbounded" name="TripRate" nillable="true" type="tns:TripRate" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfTripRate" nillable="true" type="tns:ArrayOfTripRate" />
  <xs:complexType name="TripRate">
    <xs:sequence>
      <name="Message" nillable="true" type="xs:string" />
      <name="MessageUpdateTime" type="xs:dateTime" />
      <name="Toll" type="xs:decimal" />
      <name="TripName" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TripRate" nillable="true" type="tns:TripRate" />
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