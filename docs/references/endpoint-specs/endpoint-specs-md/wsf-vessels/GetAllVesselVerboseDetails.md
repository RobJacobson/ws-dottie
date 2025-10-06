Reference for http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselverbose?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Vessels/rest/vesselverbose?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfVesselVerboseResponse xmlns="http://www.wsdot.wa.gov/ferries/vessels/">
  <VesselVerboseResponse>
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
    <Status>InService</Status>
    <OwnedByWSF>true</OwnedByWSF>
    <CarDeckRestroom>true</CarDeckRestroom>
    <CarDeckShelter>true</CarDeckShelter>
    <Elevator>true</Elevator>
    <ADAAccessible>true</ADAAccessible>
    <MainCabinGalley>true</MainCabinGalley>
    <MainCabinRestroom>true</MainCabinRestroom>
    <PublicWifi>true</PublicWifi>
    <ADAInfo>String content</ADAInfo>
    <AdditionalInfo>String content</AdditionalInfo>
    <VesselNameDesc>String content</VesselNameDesc>
    <VesselHistory>String content</VesselHistory>
    <Beam>String content</Beam>
    <CityBuilt>String content</CityBuilt>
    <SpeedInKnots>2147483647</SpeedInKnots>
    <Draft>String content</Draft>
    <EngineCount>2147483647</EngineCount>
    <Horsepower>2147483647</Horsepower>
    <Length>String content</Length>
    <MaxPassengerCount>2147483647</MaxPassengerCount>
    <PassengerOnly>true</PassengerOnly>
    <FastFerry>true</FastFerry>
    <PropulsionInfo>String content</PropulsionInfo>
    <TallDeckClearance>2147483647</TallDeckClearance>
    <RegDeckSpace>2147483647</RegDeckSpace>
    <TallDeckSpace>2147483647</TallDeckSpace>
    <Tonnage>2147483647</Tonnage>
    <Displacement>2147483647</Displacement>
    <YearBuilt>2147483647</YearBuilt>
    <YearRebuilt>2147483647</YearRebuilt>
    <VesselDrawingImg>String content</VesselDrawingImg>
    <SolasCertified>true</SolasCertified>
    <MaxPassengerCountForInternational>2147483647</MaxPassengerCountForInternational>
  </VesselVerboseResponse>
  <VesselVerboseResponse>
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
    <Status>InService</Status>
    <OwnedByWSF>true</OwnedByWSF>
    <CarDeckRestroom>true</CarDeckRestroom>
    <CarDeckShelter>true</CarDeckShelter>
    <Elevator>true</Elevator>
    <ADAAccessible>true</ADAAccessible>
    <MainCabinGalley>true</MainCabinGalley>
    <MainCabinRestroom>true</MainCabinRestroom>
    <PublicWifi>true</PublicWifi>
    <ADAInfo>String content</ADAInfo>
    <AdditionalInfo>String content</AdditionalInfo>
    <VesselNameDesc>String content</VesselNameDesc>
    <VesselHistory>String content</VesselHistory>
    <Beam>String content</Beam>
    <CityBuilt>String content</CityBuilt>
    <SpeedInKnots>2147483647</SpeedInKnots>
    <Draft>String content</Draft>
    <EngineCount>2147483647</EngineCount>
    <Horsepower>2147483647</Horsepower>
    <Length>String content</Length>
    <MaxPassengerCount>2147483647</MaxPassengerCount>
    <PassengerOnly>true</PassengerOnly>
    <FastFerry>true</FastFerry>
    <PropulsionInfo>String content</PropulsionInfo>
    <TallDeckClearance>2147483647</TallDeckClearance>
    <RegDeckSpace>2147483647</RegDeckSpace>
    <TallDeckSpace>2147483647</TallDeckSpace>
    <Tonnage>2147483647</Tonnage>
    <Displacement>2147483647</Displacement>
    <YearBuilt>2147483647</YearBuilt>
    <YearRebuilt>2147483647</YearRebuilt>
    <VesselDrawingImg>String content</VesselDrawingImg>
    <SolasCertified>true</SolasCertified>
    <MaxPassengerCountForInternational>2147483647</MaxPassengerCountForInternational>
  </VesselVerboseResponse>
</ArrayOfVesselVerboseResponse>
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
	"Status":0,
	"OwnedByWSF":true,
	"CarDeckRestroom":true,
	"CarDeckShelter":true,
	"Elevator":true,
	"ADAAccessible":true,
	"MainCabinGalley":true,
	"MainCabinRestroom":true,
	"PublicWifi":true,
	"ADAInfo":"String content",
	"AdditionalInfo":"String content",
	"VesselNameDesc":"String content",
	"VesselHistory":"String content",
	"Beam":"String content",
	"CityBuilt":"String content",
	"SpeedInKnots":2147483647,
	"Draft":"String content",
	"EngineCount":2147483647,
	"Horsepower":2147483647,
	"Length":"String content",
	"MaxPassengerCount":2147483647,
	"PassengerOnly":true,
	"FastFerry":true,
	"PropulsionInfo":"String content",
	"TallDeckClearance":2147483647,
	"RegDeckSpace":2147483647,
	"TallDeckSpace":2147483647,
	"Tonnage":2147483647,
	"Displacement":2147483647,
	"YearBuilt":2147483647,
	"YearRebuilt":2147483647,
	"VesselDrawingImg":"String content",
	"SolasCertified":true,
	"MaxPassengerCountForInternational":2147483647
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/vessels/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/vessels/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="ArrayOfVesselVerboseResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="VesselVerboseResponse" nillable="true" type="tns:VesselVerboseResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfVesselVerboseResponse" nillable="true" type="tns:ArrayOfVesselVerboseResponse" />
  <xs:complexType name="VesselVerboseResponse">
    <xs:sequence>
      <name="VesselID" type="xs:int" />
      <name="VesselSubjectID" type="xs:int" />
      <name="VesselName" nillable="true" type="xs:string" />
      <name="VesselAbbrev" nillable="true" type="xs:string" />
      <name="Class" nillable="true" type="tns:VesselClass" />
      <name="Status" nillable="true" type="tns:VesselStatus" />
      <name="OwnedByWSF" type="xs:boolean" />
      <name="CarDeckRestroom" type="xs:boolean" />
      <name="CarDeckShelter" type="xs:boolean" />
      <name="Elevator" type="xs:boolean" />
      <name="ADAAccessible" type="xs:boolean" />
      <name="MainCabinGalley" type="xs:boolean" />
      <name="MainCabinRestroom" type="xs:boolean" />
      <name="PublicWifi" type="xs:boolean" />
      <name="ADAInfo" nillable="true" type="xs:string" />
      <name="AdditionalInfo" nillable="true" type="xs:string" />
      <name="VesselNameDesc" nillable="true" type="xs:string" />
      <name="VesselHistory" nillable="true" type="xs:string" />
      <name="Beam" nillable="true" type="xs:string" />
      <name="CityBuilt" nillable="true" type="xs:string" />
      <name="SpeedInKnots" nillable="true" type="xs:int" />
      <name="Draft" nillable="true" type="xs:string" />
      <name="EngineCount" nillable="true" type="xs:int" />
      <name="Horsepower" nillable="true" type="xs:int" />
      <name="Length" nillable="true" type="xs:string" />
      <name="MaxPassengerCount" nillable="true" type="xs:int" />
      <name="PassengerOnly" type="xs:boolean" />
      <name="FastFerry" type="xs:boolean" />
      <name="PropulsionInfo" nillable="true" type="xs:string" />
      <name="TallDeckClearance" nillable="true" type="xs:int" />
      <name="RegDeckSpace" nillable="true" type="xs:int" />
      <name="TallDeckSpace" nillable="true" type="xs:int" />
      <name="Tonnage" nillable="true" type="xs:int" />
      <name="Displacement" nillable="true" type="xs:int" />
      <name="YearBuilt" nillable="true" type="xs:int" />
      <name="YearRebuilt" nillable="true" type="xs:int" />
      <name="VesselDrawingImg" nillable="true" type="xs:string" />
      <name="SolasCertified" type="xs:boolean" />
      <name="MaxPassengerCountForInternational" nillable="true" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="VesselVerboseResponse" nillable="true" type="tns:VesselVerboseResponse" />
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
  <xs:simpleType name="VesselStatus">
    <xs:restriction base="xs:string">
      <xs:enumeration value="InService">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Maintenance">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="OutOfService">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">3</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="VesselStatus" nillable="true" type="tns:VesselStatus" />
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