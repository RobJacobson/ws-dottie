Reference for http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/routes/{TRIPDATE}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/routes/{TRIPDATE}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfRouteBriefResponse xmlns="http://www.wsdot.wa.gov/ferries/schedule/">
  <RouteBriefResponse>
    <RouteID>2147483647</RouteID>
    <RouteAbbrev>String content</RouteAbbrev>
    <Description>String content</Description>
    <RegionID>2147483647</RegionID>
    <ServiceDisruptions>
      <RouteBriefAlert>
        <BulletinID>2147483647</BulletinID>
        <BulletinFlag>true</BulletinFlag>
        <PublishDate>1999-05-31T11:20:00</PublishDate>
        <DisruptionDescription>String content</DisruptionDescription>
      </RouteBriefAlert>
      <RouteBriefAlert>
        <BulletinID>2147483647</BulletinID>
        <BulletinFlag>true</BulletinFlag>
        <PublishDate>1999-05-31T11:20:00</PublishDate>
        <DisruptionDescription>String content</DisruptionDescription>
      </RouteBriefAlert>
    </ServiceDisruptions>
  </RouteBriefResponse>
  <RouteBriefResponse>
    <RouteID>2147483647</RouteID>
    <RouteAbbrev>String content</RouteAbbrev>
    <Description>String content</Description>
    <RegionID>2147483647</RegionID>
    <ServiceDisruptions>
      <RouteBriefAlert>
        <BulletinID>2147483647</BulletinID>
        <BulletinFlag>true</BulletinFlag>
        <PublishDate>1999-05-31T11:20:00</PublishDate>
        <DisruptionDescription>String content</DisruptionDescription>
      </RouteBriefAlert>
      <RouteBriefAlert>
        <BulletinID>2147483647</BulletinID>
        <BulletinFlag>true</BulletinFlag>
        <PublishDate>1999-05-31T11:20:00</PublishDate>
        <DisruptionDescription>String content</DisruptionDescription>
      </RouteBriefAlert>
    </ServiceDisruptions>
  </RouteBriefResponse>
</ArrayOfRouteBriefResponse>
```

The following is an example response Json body:

```
\[{
	"RouteID":2147483647,
	"RouteAbbrev":"String content",
	"Description":"String content",
	"RegionID":2147483647,
	"ServiceDisruptions":\[{
		"BulletinID":2147483647,
		"BulletinFlag":true,
		"PublishDate":"\\/Date(928174800000-0700)\\/",
		"DisruptionDescription":"String content"
	}\]
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/schedule/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/schedule/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfRouteBriefResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="RouteBriefResponse" nillable="true" type="tns:RouteBriefResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfRouteBriefResponse" nillable="true" type="tns:ArrayOfRouteBriefResponse" />
  <xs:complexType name="RouteBriefResponse">
    <xs:sequence>
      <name="RouteID" type="xs:int" />
      <name="RouteAbbrev" nillable="true" type="xs:string" />
      <name="Description" nillable="true" type="xs:string" />
      <name="RegionID" type="xs:int" />
      <name="ServiceDisruptions" nillable="true" type="tns:ArrayOfRouteBriefAlert" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="RouteBriefResponse" nillable="true" type="tns:RouteBriefResponse" />
  <xs:complexType name="ArrayOfRouteBriefAlert">
    <xs:sequence>
      <maxOccurs="unbounded" name="RouteBriefAlert" nillable="true" type="tns:RouteBriefAlert" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfRouteBriefAlert" nillable="true" type="tns:ArrayOfRouteBriefAlert" />
  <xs:complexType name="RouteBriefAlert">
    <xs:sequence>
      <name="BulletinID" type="xs:int" />
      <name="BulletinFlag" type="xs:boolean" />
      <name="PublishDate" nillable="true" type="xs:dateTime" />
      <name="DisruptionDescription" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="RouteBriefAlert" nillable="true" type="tns:RouteBriefAlert" />
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