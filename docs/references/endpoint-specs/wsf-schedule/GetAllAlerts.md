Reference for http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/alerts?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/alerts?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfAlertResponse xmlns="http://www.wsdot.wa.gov/ferries/schedule/">
  <AlertResponse>
    <BulletinID>2147483647</BulletinID>
    <BulletinFlag>true</BulletinFlag>
    <BulletinText>String content</BulletinText>
    <CommunicationFlag>true</CommunicationFlag>
    <CommunicationText>String content</CommunicationText>
    <RouteAlertFlag>true</RouteAlertFlag>
    <RouteAlertText>String content</RouteAlertText>
    <HomepageAlertText>String content</HomepageAlertText>
    <PublishDate>1999-05-31T11:20:00</PublishDate>
    <DisruptionDescription>String content</DisruptionDescription>
    <AllRoutesFlag>true</AllRoutesFlag>
    <SortSeq>2147483647</SortSeq>
    <AlertTypeID>2147483647</AlertTypeID>
    <AlertType>String content</AlertType>
    <AlertFullTitle>String content</AlertFullTitle>
    <AffectedRouteIDs>
      <int>2147483647</int>
      <int>2147483647</int>
    </AffectedRouteIDs>
    <IVRText>String content</IVRText>
  </AlertResponse>
  <AlertResponse>
    <BulletinID>2147483647</BulletinID>
    <BulletinFlag>true</BulletinFlag>
    <BulletinText>String content</BulletinText>
    <CommunicationFlag>true</CommunicationFlag>
    <CommunicationText>String content</CommunicationText>
    <RouteAlertFlag>true</RouteAlertFlag>
    <RouteAlertText>String content</RouteAlertText>
    <HomepageAlertText>String content</HomepageAlertText>
    <PublishDate>1999-05-31T11:20:00</PublishDate>
    <DisruptionDescription>String content</DisruptionDescription>
    <AllRoutesFlag>true</AllRoutesFlag>
    <SortSeq>2147483647</SortSeq>
    <AlertTypeID>2147483647</AlertTypeID>
    <AlertType>String content</AlertType>
    <AlertFullTitle>String content</AlertFullTitle>
    <AffectedRouteIDs>
      <int>2147483647</int>
      <int>2147483647</int>
    </AffectedRouteIDs>
    <IVRText>String content</IVRText>
  </AlertResponse>
</ArrayOfAlertResponse>
```

The following is an example response Json body:

```
\[{
	"BulletinID":2147483647,
	"BulletinFlag":true,
	"BulletinText":"String content",
	"CommunicationFlag":true,
	"CommunicationText":"String content",
	"RouteAlertFlag":true,
	"RouteAlertText":"String content",
	"HomepageAlertText":"String content",
	"PublishDate":"\\/Date(928174800000-0700)\\/",
	"DisruptionDescription":"String content",
	"AllRoutesFlag":true,
	"SortSeq":2147483647,
	"AlertTypeID":2147483647,
	"AlertType":"String content",
	"AlertFullTitle":"String content",
	"AffectedRouteIDs":\[2147483647\],
	"IVRText":"String content"
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/schedule/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/schedule/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfAlertResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="AlertResponse" nillable="true" type="tns:AlertResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfAlertResponse" nillable="true" type="tns:ArrayOfAlertResponse" />
  <xs:complexType name="AlertResponse">
    <xs:sequence>
      <name="BulletinID" type="xs:int" />
      <name="BulletinFlag" type="xs:boolean" />
      <name="BulletinText" nillable="true" type="xs:string" />
      <name="CommunicationFlag" type="xs:boolean" />
      <name="CommunicationText" nillable="true" type="xs:string" />
      <name="RouteAlertFlag" type="xs:boolean" />
      <name="RouteAlertText" nillable="true" type="xs:string" />
      <name="HomepageAlertText" nillable="true" type="xs:string" />
      <name="PublishDate" nillable="true" type="xs:dateTime" />
      <name="DisruptionDescription" nillable="true" type="xs:string" />
      <name="AllRoutesFlag" type="xs:boolean" />
      <name="SortSeq" type="xs:int" />
      <name="AlertTypeID" type="xs:int" />
      <name="AlertType" nillable="true" type="xs:string" />
      <name="AlertFullTitle" nillable="true" type="xs:string" />
      <name="AffectedRouteIDs" nillable="true" type="tns:ArrayOfInt" />
      <name="IVRText" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="AlertResponse" nillable="true" type="tns:AlertResponse" />
  <xs:complexType name="ArrayOfInt">
    <xs:sequence>
      <maxOccurs="unbounded" name="int" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfInt" nillable="true" type="tns:ArrayOfInt" />
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