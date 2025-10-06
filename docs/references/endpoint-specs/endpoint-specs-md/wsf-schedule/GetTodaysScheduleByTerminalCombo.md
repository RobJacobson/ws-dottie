Reference for http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/scheduletoday/{DEPARTINGTERMINALID}/{ARRIVINGTERMINALID}/{ONLYREMAININGTIMES}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/scheduletoday/{DEPARTINGTERMINALID}/{ARRIVINGTERMINALID}/{ONLYREMAININGTIMES}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<SchedResponse xmlns="http://www.wsdot.wa.gov/ferries/schedule/">
  <ScheduleID>2147483647</ScheduleID>
  <ScheduleName>String content</ScheduleName>
  <ScheduleSeason>Spring</ScheduleSeason>
  <SchedulePDFUrl>String content</SchedulePDFUrl>
  <ScheduleStart>1999-05-31T11:20:00</ScheduleStart>
  <ScheduleEnd>1999-05-31T11:20:00</ScheduleEnd>
  <AllRoutes>
    <int>2147483647</int>
    <int>2147483647</int>
  </AllRoutes>
  <TerminalCombos>
    <SchedTerminalCombo>
      <DepartingTerminalID>2147483647</DepartingTerminalID>
      <DepartingTerminalName>String content</DepartingTerminalName>
      <ArrivingTerminalID>2147483647</ArrivingTerminalID>
      <ArrivingTerminalName>String content</ArrivingTerminalName>
      <SailingNotes>String content</SailingNotes>
      <Annotations>
        <string>String content</string>
        <string>String content</string>
      </Annotations>
      <Times>
        <SchedTime>
          <DepartingTime>1999-05-31T11:20:00</DepartingTime>
          <ArrivingTime>1999-05-31T11:20:00</ArrivingTime>
          <LoadingRule>Passenger</LoadingRule>
          <VesselID>2147483647</VesselID>
          <VesselName>String content</VesselName>
          <VesselHandicapAccessible>true</VesselHandicapAccessible>
          <VesselPositionNum>2147483647</VesselPositionNum>
          <Routes>
            <int>2147483647</int>
            <int>2147483647</int>
          </Routes>
          <AnnotationIndexes>
            <int>2147483647</int>
            <int>2147483647</int>
          </AnnotationIndexes>
        </SchedTime>
        <SchedTime>
          <DepartingTime>1999-05-31T11:20:00</DepartingTime>
          <ArrivingTime>1999-05-31T11:20:00</ArrivingTime>
          <LoadingRule>Passenger</LoadingRule>
          <VesselID>2147483647</VesselID>
          <VesselName>String content</VesselName>
          <VesselHandicapAccessible>true</VesselHandicapAccessible>
          <VesselPositionNum>2147483647</VesselPositionNum>
          <Routes>
            <int>2147483647</int>
            <int>2147483647</int>
          </Routes>
          <AnnotationIndexes>
            <int>2147483647</int>
            <int>2147483647</int>
          </AnnotationIndexes>
        </SchedTime>
      </Times>
      <AnnotationsIVR>
        <string>String content</string>
        <string>String content</string>
      </AnnotationsIVR>
    </SchedTerminalCombo>
    <SchedTerminalCombo>
      <DepartingTerminalID>2147483647</DepartingTerminalID>
      <DepartingTerminalName>String content</DepartingTerminalName>
      <ArrivingTerminalID>2147483647</ArrivingTerminalID>
      <ArrivingTerminalName>String content</ArrivingTerminalName>
      <SailingNotes>String content</SailingNotes>
      <Annotations>
        <string>String content</string>
        <string>String content</string>
      </Annotations>
      <Times>
        <SchedTime>
          <DepartingTime>1999-05-31T11:20:00</DepartingTime>
          <ArrivingTime>1999-05-31T11:20:00</ArrivingTime>
          <LoadingRule>Passenger</LoadingRule>
          <VesselID>2147483647</VesselID>
          <VesselName>String content</VesselName>
          <VesselHandicapAccessible>true</VesselHandicapAccessible>
          <VesselPositionNum>2147483647</VesselPositionNum>
          <Routes>
            <int>2147483647</int>
            <int>2147483647</int>
          </Routes>
          <AnnotationIndexes>
            <int>2147483647</int>
            <int>2147483647</int>
          </AnnotationIndexes>
        </SchedTime>
        <SchedTime>
          <DepartingTime>1999-05-31T11:20:00</DepartingTime>
          <ArrivingTime>1999-05-31T11:20:00</ArrivingTime>
          <LoadingRule>Passenger</LoadingRule>
          <VesselID>2147483647</VesselID>
          <VesselName>String content</VesselName>
          <VesselHandicapAccessible>true</VesselHandicapAccessible>
          <VesselPositionNum>2147483647</VesselPositionNum>
          <Routes>
            <int>2147483647</int>
            <int>2147483647</int>
          </Routes>
          <AnnotationIndexes>
            <int>2147483647</int>
            <int>2147483647</int>
          </AnnotationIndexes>
        </SchedTime>
      </Times>
      <AnnotationsIVR>
        <string>String content</string>
        <string>String content</string>
      </AnnotationsIVR>
    </SchedTerminalCombo>
  </TerminalCombos>
</SchedResponse>
```

The following is an example response Json body:

```
{
	"ScheduleID":2147483647,
	"ScheduleName":"String content",
	"ScheduleSeason":0,
	"SchedulePDFUrl":"String content",
	"ScheduleStart":"\\/Date(928174800000-0700)\\/",
	"ScheduleEnd":"\\/Date(928174800000-0700)\\/",
	"AllRoutes":\[2147483647\],
	"TerminalCombos":\[{
		"DepartingTerminalID":2147483647,
		"DepartingTerminalName":"String content",
		"ArrivingTerminalID":2147483647,
		"ArrivingTerminalName":"String content",
		"SailingNotes":"String content",
		"Annotations":\["String content"\],
		"Times":\[{
			"DepartingTime":"\\/Date(928174800000-0700)\\/",
			"ArrivingTime":"\\/Date(928174800000-0700)\\/",
			"LoadingRule":0,
			"VesselID":2147483647,
			"VesselName":"String content",
			"VesselHandicapAccessible":true,
			"VesselPositionNum":2147483647,
			"Routes":\[2147483647\],
			"AnnotationIndexes":\[2147483647\]
		}\],
		"AnnotationsIVR":\["String content"\]
	}\]
}
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/schedule/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/schedule/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="SchedResponse">
    <xs:sequence>
      <name="ScheduleID" type="xs:int" />
      <name="ScheduleName" nillable="true" type="xs:string" />
      <name="ScheduleSeason" type="tns:Season" />
      <name="SchedulePDFUrl" nillable="true" type="xs:string" />
      <name="ScheduleStart" type="xs:dateTime" />
      <name="ScheduleEnd" type="xs:dateTime" />
      <name="AllRoutes" nillable="true" type="tns:ArrayOfInt" />
      <name="TerminalCombos" nillable="true" type="tns:ArrayOfSchedTerminalCombo" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedResponse" nillable="true" type="tns:SchedResponse" />
  <xs:simpleType name="Season">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Spring" />
      <xs:enumeration value="Summer" />
      <xs:enumeration value="Fall" />
      <xs:enumeration value="Winter" />
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="Season" nillable="true" type="tns:Season" />
  <xs:complexType name="ArrayOfInt">
    <xs:sequence>
      <maxOccurs="unbounded" name="int" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfInt" nillable="true" type="tns:ArrayOfInt" />
  <xs:complexType name="ArrayOfSchedTerminalCombo">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedTerminalCombo" nillable="true" type="tns:SchedTerminalCombo" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedTerminalCombo" nillable="true" type="tns:ArrayOfSchedTerminalCombo" />
  <xs:complexType name="SchedTerminalCombo">
    <xs:sequence>
      <name="DepartingTerminalID" type="xs:int" />
      <name="DepartingTerminalName" nillable="true" type="xs:string" />
      <name="ArrivingTerminalID" type="xs:int" />
      <name="ArrivingTerminalName" nillable="true" type="xs:string" />
      <name="SailingNotes" nillable="true" type="xs:string" />
      <name="Annotations" nillable="true" type="tns:ArrayOfString" />
      <name="Times" nillable="true" type="tns:ArrayOfSchedTime" />
      <name="AnnotationsIVR" nillable="true" type="tns:ArrayOfString" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedTerminalCombo" nillable="true" type="tns:SchedTerminalCombo" />
  <xs:complexType name="ArrayOfString">
    <xs:sequence>
      <maxOccurs="unbounded" name="string" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfString" nillable="true" type="tns:ArrayOfString" />
  <xs:complexType name="ArrayOfSchedTime">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedTime" nillable="true" type="tns:SchedTime" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedTime" nillable="true" type="tns:ArrayOfSchedTime" />
  <xs:complexType name="SchedTime">
    <xs:sequence>
      <name="DepartingTime" type="xs:dateTime" />
      <name="ArrivingTime" nillable="true" type="xs:dateTime" />
      <name="LoadingRule" type="tns:LoadIndicator" />
      <name="VesselID" type="xs:int" />
      <name="VesselName" nillable="true" type="xs:string" />
      <name="VesselHandicapAccessible" type="xs:boolean" />
      <name="VesselPositionNum" type="xs:int" />
      <name="Routes" nillable="true" type="tns:ArrayOfInt" />
      <name="AnnotationIndexes" nillable="true" type="tns:ArrayOfInt" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedTime" nillable="true" type="tns:SchedTime" />
  <xs:simpleType name="LoadIndicator">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Passenger">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Vehicle">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Both">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">3</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="LoadIndicator" nillable="true" type="tns:LoadIndicator" />
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