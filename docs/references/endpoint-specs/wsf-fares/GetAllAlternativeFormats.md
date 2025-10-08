Reference for http://www.wsdot.wa.gov/Ferries/API/Fares/rest/alternativeformats/{SUBJECTNAME}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Fares/rest/alternativeformats/{SUBJECTNAME}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfAlternativeFormatsResponse xmlns="http://www.wsdot.wa.gov/ferries/fares/">
  <AlternativeFormatsResponse>
    <AltID>2147483647</AltID>
    <SubjectID>2147483647</SubjectID>
    <SubjectName>String content</SubjectName>
    <AltTitle>String content</AltTitle>
    <AltUrl>String content</AltUrl>
    <AltDesc>String content</AltDesc>
    <FileType>String content</FileType>
    <Status>String content</Status>
    <SortSeq>2147483647</SortSeq>
    <FromDate>String content</FromDate>
    <ThruDate>String content</ThruDate>
    <ModifiedDate>String content</ModifiedDate>
    <ModifiedBy>String content</ModifiedBy>
  </AlternativeFormatsResponse>
  <AlternativeFormatsResponse>
    <AltID>2147483647</AltID>
    <SubjectID>2147483647</SubjectID>
    <SubjectName>String content</SubjectName>
    <AltTitle>String content</AltTitle>
    <AltUrl>String content</AltUrl>
    <AltDesc>String content</AltDesc>
    <FileType>String content</FileType>
    <Status>String content</Status>
    <SortSeq>2147483647</SortSeq>
    <FromDate>String content</FromDate>
    <ThruDate>String content</ThruDate>
    <ModifiedDate>String content</ModifiedDate>
    <ModifiedBy>String content</ModifiedBy>
  </AlternativeFormatsResponse>
</ArrayOfAlternativeFormatsResponse>
```

The following is an example response Json body:

```
\[{
	"AltID":2147483647,
	"SubjectID":2147483647,
	"SubjectName":"String content",
	"AltTitle":"String content",
	"AltUrl":"String content",
	"AltDesc":"String content",
	"FileType":"String content",
	"Status":"String content",
	"SortSeq":2147483647,
	"FromDate":"String content",
	"ThruDate":"String content",
	"ModifiedDate":"String content",
	"ModifiedBy":"String content"
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/fares/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/fares/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfAlternativeFormatsResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="AlternativeFormatsResponse" nillable="true" type="tns:AlternativeFormatsResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfAlternativeFormatsResponse" nillable="true" type="tns:ArrayOfAlternativeFormatsResponse" />
  <xs:complexType name="AlternativeFormatsResponse">
    <xs:sequence>
      <name="AltID" type="xs:int" />
      <name="SubjectID" type="xs:int" />
      <name="SubjectName" nillable="true" type="xs:string" />
      <name="AltTitle" nillable="true" type="xs:string" />
      <name="AltUrl" nillable="true" type="xs:string" />
      <name="AltDesc" nillable="true" type="xs:string" />
      <name="FileType" nillable="true" type="xs:string" />
      <name="Status" nillable="true" type="xs:string" />
      <name="SortSeq" type="xs:int" />
      <name="FromDate" nillable="true" type="xs:string" />
      <name="ThruDate" nillable="true" type="xs:string" />
      <name="ModifiedDate" nillable="true" type="xs:string" />
      <name="ModifiedBy" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="AlternativeFormatsResponse" nillable="true" type="tns:AlternativeFormatsResponse" />
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