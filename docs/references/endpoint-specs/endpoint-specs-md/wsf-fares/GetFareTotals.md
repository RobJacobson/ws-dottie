Reference for http://www.wsdot.wa.gov/Ferries/API/Fares/rest/faretotals/{TRIPDATE}/{DEPARTINGTERMINALID}/{ARRIVINGTERMINALID}/{ROUNDTRIP}/{FARELINEITEMID}/{QUANTITY}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Fares/rest/faretotals/{TRIPDATE}/{DEPARTINGTERMINALID}/{ARRIVINGTERMINALID}/{ROUNDTRIP}/{FARELINEITEMID}/{QUANTITY}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfFareTotalResponse xmlns="http://www.wsdot.wa.gov/ferries/fares/">
  <FareTotalResponse>
    <TotalType>Depart</TotalType>
    <Description>String content</Description>
    <BriefDescription>String content</BriefDescription>
    <Amount>12678967.543233</Amount>
  </FareTotalResponse>
  <FareTotalResponse>
    <TotalType>Depart</TotalType>
    <Description>String content</Description>
    <BriefDescription>String content</BriefDescription>
    <Amount>12678967.543233</Amount>
  </FareTotalResponse>
</ArrayOfFareTotalResponse>
```

The following is an example response Json body:

```
\[{
	"TotalType":0,
	"Description":"String content",
	"BriefDescription":"String content",
	"Amount":12678967.543233
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/fares/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/fares/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="ArrayOfFareTotalResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="FareTotalResponse" nillable="true" type="tns:FareTotalResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfFareTotalResponse" nillable="true" type="tns:ArrayOfFareTotalResponse" />
  <xs:complexType name="FareTotalResponse">
    <xs:sequence>
      <name="TotalType" type="tns:FareTotalType" />
      <name="Description" nillable="true" type="xs:string" />
      <name="BriefDescription" nillable="true" type="xs:string" />
      <name="Amount" type="xs:decimal" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="FareTotalResponse" nillable="true" type="tns:FareTotalResponse" />
  <xs:simpleType name="FareTotalType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Depart">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Return">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Either">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">3</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Total">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">4</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="FareTotalType" nillable="true" type="tns:FareTotalType" />
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