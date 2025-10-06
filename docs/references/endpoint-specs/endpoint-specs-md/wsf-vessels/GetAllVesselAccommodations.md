Reference for http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselaccommodations?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfVesselAccommodationResponse xmlns="http://www.wsdot.wa.gov/ferries/vessels/">
  <VesselAccommodationResponse>
    <VesselID>2147483647</VesselID>
    <VesselSubjectID>2147483647</VesselSubjectID>
    <VesselName>String content</VesselName>
    <VesselAbbrev>String content</VesselAbbrev>
    <Class>
      <ClassID>2147483647</ClassID>
      <ClassSubjectID>2147483647</ClassSubjectID>
      <ClassName>String content</ClassName>
      <SortSeq>2147483647</SortSeq>
      <DrawingImg>String content</DrawingImg>
      <SilhouetteImg>String content</SilhouetteImg>
      <PublicDisplayName>String content</PublicDisplayName>
    </Class>
    <CarDeckRestroom>true</CarDeckRestroom>
    <CarDeckShelter>true</CarDeckShelter>
    <Elevator>true</Elevator>
    <ADAAccessible>true</ADAAccessible>
    <MainCabinGalley>true</MainCabinGalley>
    <MainCabinRestroom>true</MainCabinRestroom>
    <PublicWifi>true</PublicWifi>
    <ADAInfo>String content</ADAInfo>
    <AdditionalInfo>String content</AdditionalInfo>
  </VesselAccommodationResponse>
  <VesselAccommodationResponse>
    <VesselID>2147483647</VesselID>
    <VesselSubjectID>2147483647</VesselSubjectID>
    <VesselName>String content</VesselName>
    <VesselAbbrev>String content</VesselAbbrev>
    <Class>
      <ClassID>2147483647</ClassID>
      <ClassSubjectID>2147483647</ClassSubjectID>
      <ClassName>String content</ClassName>
      <SortSeq>2147483647</SortSeq>
      <DrawingImg>String content</DrawingImg>
      <SilhouetteImg>String content</SilhouetteImg>
      <PublicDisplayName>String content</PublicDisplayName>
    </Class>
    <CarDeckRestroom>true</CarDeckRestroom>
    <CarDeckShelter>true</CarDeckShelter>
    <Elevator>true</Elevator>
    <ADAAccessible>true</ADAAccessible>
    <MainCabinGalley>true</MainCabinGalley>
    <MainCabinRestroom>true</MainCabinRestroom>
    <PublicWifi>true</PublicWifi>
    <ADAInfo>String content</ADAInfo>
    <AdditionalInfo>String content</AdditionalInfo>
  </VesselAccommodationResponse>
</ArrayOfVesselAccommodationResponse>
```

The following is an example response Json body:

```
\[{
	"VesselID":2147483647,
	"VesselSubjectID":2147483647,
	"VesselName":"String content",
	"VesselAbbrev":"String content",
	"Class":{
		"ClassID":2147483647,
		"ClassSubjectID":2147483647,
		"ClassName":"String content",
		"SortSeq":2147483647,
		"DrawingImg":"String content",
		"SilhouetteImg":"String content",
		"PublicDisplayName":"String content"
	},
	"CarDeckRestroom":true,
	"CarDeckShelter":true,
	"Elevator":true,
	"ADAAccessible":true,
	"MainCabinGalley":true,
	"MainCabinRestroom":true,
	"PublicWifi":true,
	"ADAInfo":"String content",
	"AdditionalInfo":"String content"
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/vessels/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/vessels/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfVesselAccommodationResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="VesselAccommodationResponse" nillable="true" type="tns:VesselAccommodationResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfVesselAccommodationResponse" nillable="true" type="tns:ArrayOfVesselAccommodationResponse" />
  <xs:complexType name="VesselAccommodationResponse">
    <xs:sequence>
      <name="VesselID" type="xs:int" />
      <name="VesselSubjectID" type="xs:int" />
      <name="VesselName" nillable="true" type="xs:string" />
      <name="VesselAbbrev" nillable="true" type="xs:string" />
      <name="Class" nillable="true" type="tns:VesselClass" />
      <name="CarDeckRestroom" type="xs:boolean" />
      <name="CarDeckShelter" type="xs:boolean" />
      <name="Elevator" type="xs:boolean" />
      <name="ADAAccessible" type="xs:boolean" />
      <name="MainCabinGalley" type="xs:boolean" />
      <name="MainCabinRestroom" type="xs:boolean" />
      <name="PublicWifi" type="xs:boolean" />
      <name="ADAInfo" nillable="true" type="xs:string" />
      <name="AdditionalInfo" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="VesselAccommodationResponse" nillable="true" type="tns:VesselAccommodationResponse" />
  <xs:complexType name="VesselClass">
    <xs:sequence>
      <name="ClassID" type="xs:int" />
      <name="ClassSubjectID" type="xs:int" />
      <name="ClassName" nillable="true" type="xs:string" />
      <name="SortSeq" nillable="true" type="xs:int" />
      <name="DrawingImg" nillable="true" type="xs:string" />
      <name="SilhouetteImg" nillable="true" type="xs:string" />
      <name="PublicDisplayName" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="VesselClass" nillable="true" type="tns:VesselClass" />
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