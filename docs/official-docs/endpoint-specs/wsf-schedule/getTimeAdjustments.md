Reference for http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/timeadj?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/timeadj?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfSchedTimeAdjResponse xmlns="http://www.wsdot.wa.gov/ferries/schedule/">
  <SchedTimeAdjResponse>
    <ScheduleID>2147483647</ScheduleID>
    <SchedRouteID>2147483647</SchedRouteID>
    <RouteID>2147483647</RouteID>
    <RouteDescription>String content</RouteDescription>
    <RouteSortSeq>2147483647</RouteSortSeq>
    <SailingID>2147483647</SailingID>
    <SailingDescription>String content</SailingDescription>
    <ActiveSailingDateRange>
      <DateFrom>1999-05-31T11:20:00</DateFrom>
      <DateThru>1999-05-31T11:20:00</DateThru>
      <EventID>2147483647</EventID>
      <EventDescription>String content</EventDescription>
    </ActiveSailingDateRange>
    <SailingDir>Westbound</SailingDir>
    <JourneyID>2147483647</JourneyID>
    <VesselID>2147483647</VesselID>
    <VesselName>String content</VesselName>
    <VesselHandicapAccessible>true</VesselHandicapAccessible>
    <VesselPositionNum>2147483647</VesselPositionNum>
    <JourneyTerminalID>2147483647</JourneyTerminalID>
    <TerminalID>2147483647</TerminalID>
    <TerminalDescription>String content</TerminalDescription>
    <TerminalBriefDescription>String content</TerminalBriefDescription>
    <TimeToAdj>1999-05-31T11:20:00</TimeToAdj>
    <AdjDateFrom>1999-05-31T11:20:00</AdjDateFrom>
    <AdjDateThru>1999-05-31T11:20:00</AdjDateThru>
    <TidalAdj>true</TidalAdj>
    <EventID>2147483647</EventID>
    <EventDescription>String content</EventDescription>
    <DepArrIndicator>Departure</DepArrIndicator>
    <AdjType>Addition</AdjType>
    <Annotations>
      <SchedAnnotation>
        <AnnotationID>2147483647</AnnotationID>
        <AnnotationText>String content</AnnotationText>
        <AnnotationIVRText>String content</AnnotationIVRText>
        <AdjustedCrossingTime>2147483647</AdjustedCrossingTime>
        <AnnotationImg>String content</AnnotationImg>
        <TypeDescription>String content</TypeDescription>
        <SortSeq>2147483647</SortSeq>
      </SchedAnnotation>
      <SchedAnnotation>
        <AnnotationID>2147483647</AnnotationID>
        <AnnotationText>String content</AnnotationText>
        <AnnotationIVRText>String content</AnnotationIVRText>
        <AdjustedCrossingTime>2147483647</AdjustedCrossingTime>
        <AnnotationImg>String content</AnnotationImg>
        <TypeDescription>String content</TypeDescription>
        <SortSeq>2147483647</SortSeq>
      </SchedAnnotation>
    </Annotations>
  </SchedTimeAdjResponse>
  <SchedTimeAdjResponse>
    <ScheduleID>2147483647</ScheduleID>
    <SchedRouteID>2147483647</SchedRouteID>
    <RouteID>2147483647</RouteID>
    <RouteDescription>String content</RouteDescription>
    <RouteSortSeq>2147483647</RouteSortSeq>
    <SailingID>2147483647</SailingID>
    <SailingDescription>String content</SailingDescription>
    <ActiveSailingDateRange>
      <DateFrom>1999-05-31T11:20:00</DateFrom>
      <DateThru>1999-05-31T11:20:00</DateThru>
      <EventID>2147483647</EventID>
      <EventDescription>String content</EventDescription>
    </ActiveSailingDateRange>
    <SailingDir>Westbound</SailingDir>
    <JourneyID>2147483647</JourneyID>
    <VesselID>2147483647</VesselID>
    <VesselName>String content</VesselName>
    <VesselHandicapAccessible>true</VesselHandicapAccessible>
    <VesselPositionNum>2147483647</VesselPositionNum>
    <JourneyTerminalID>2147483647</JourneyTerminalID>
    <TerminalID>2147483647</TerminalID>
    <TerminalDescription>String content</TerminalDescription>
    <TerminalBriefDescription>String content</TerminalBriefDescription>
    <TimeToAdj>1999-05-31T11:20:00</TimeToAdj>
    <AdjDateFrom>1999-05-31T11:20:00</AdjDateFrom>
    <AdjDateThru>1999-05-31T11:20:00</AdjDateThru>
    <TidalAdj>true</TidalAdj>
    <EventID>2147483647</EventID>
    <EventDescription>String content</EventDescription>
    <DepArrIndicator>Departure</DepArrIndicator>
    <AdjType>Addition</AdjType>
    <Annotations>
      <SchedAnnotation>
        <AnnotationID>2147483647</AnnotationID>
        <AnnotationText>String content</AnnotationText>
        <AnnotationIVRText>String content</AnnotationIVRText>
        <AdjustedCrossingTime>2147483647</AdjustedCrossingTime>
        <AnnotationImg>String content</AnnotationImg>
        <TypeDescription>String content</TypeDescription>
        <SortSeq>2147483647</SortSeq>
      </SchedAnnotation>
      <SchedAnnotation>
        <AnnotationID>2147483647</AnnotationID>
        <AnnotationText>String content</AnnotationText>
        <AnnotationIVRText>String content</AnnotationIVRText>
        <AdjustedCrossingTime>2147483647</AdjustedCrossingTime>
        <AnnotationImg>String content</AnnotationImg>
        <TypeDescription>String content</TypeDescription>
        <SortSeq>2147483647</SortSeq>
      </SchedAnnotation>
    </Annotations>
  </SchedTimeAdjResponse>
</ArrayOfSchedTimeAdjResponse>
```

The following is an example response Json body:

```
\[{
	"ScheduleID":2147483647,
	"SchedRouteID":2147483647,
	"RouteID":2147483647,
	"RouteDescription":"String content",
	"RouteSortSeq":2147483647,
	"SailingID":2147483647,
	"SailingDescription":"String content",
	"ActiveSailingDateRange":{
		"DateFrom":"\\/Date(928174800000-0700)\\/",
		"DateThru":"\\/Date(928174800000-0700)\\/",
		"EventID":2147483647,
		"EventDescription":"String content"
	},
	"SailingDir":0,
	"JourneyID":2147483647,
	"VesselID":2147483647,
	"VesselName":"String content",
	"VesselHandicapAccessible":true,
	"VesselPositionNum":2147483647,
	"JourneyTerminalID":2147483647,
	"TerminalID":2147483647,
	"TerminalDescription":"String content",
	"TerminalBriefDescription":"String content",
	"TimeToAdj":"\\/Date(928174800000-0700)\\/",
	"AdjDateFrom":"\\/Date(928174800000-0700)\\/",
	"AdjDateThru":"\\/Date(928174800000-0700)\\/",
	"TidalAdj":true,
	"EventID":2147483647,
	"EventDescription":"String content",
	"DepArrIndicator":0,
	"AdjType":0,
	"Annotations":\[{
		"AnnotationID":2147483647,
		"AnnotationText":"String content",
		"AnnotationIVRText":"String content",
		"AdjustedCrossingTime":2147483647,
		"AnnotationImg":"String content",
		"TypeDescription":"String content",
		"SortSeq":2147483647
	}\]
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/schedule/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/schedule/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="ArrayOfSchedTimeAdjResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedTimeAdjResponse" nillable="true" type="tns:SchedTimeAdjResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedTimeAdjResponse" nillable="true" type="tns:ArrayOfSchedTimeAdjResponse" />
  <xs:complexType name="SchedTimeAdjResponse">
    <xs:sequence>
      <name="ScheduleID" type="xs:int" />
      <name="SchedRouteID" type="xs:int" />
      <name="RouteID" type="xs:int" />
      <name="RouteDescription" nillable="true" type="xs:string" />
      <name="RouteSortSeq" type="xs:int" />
      <name="SailingID" type="xs:int" />
      <name="SailingDescription" nillable="true" type="xs:string" />
      <name="ActiveSailingDateRange" nillable="true" type="tns:SchedSailingDateRange" />
      <name="SailingDir" type="tns:Direction" />
      <name="JourneyID" type="xs:int" />
      <name="VesselID" type="xs:int" />
      <name="VesselName" nillable="true" type="xs:string" />
      <name="VesselHandicapAccessible" type="xs:boolean" />
      <name="VesselPositionNum" type="xs:int" />
      <name="JourneyTerminalID" type="xs:int" />
      <name="TerminalID" type="xs:int" />
      <name="TerminalDescription" nillable="true" type="xs:string" />
      <name="TerminalBriefDescription" nillable="true" type="xs:string" />
      <name="TimeToAdj" type="xs:dateTime" />
      <name="AdjDateFrom" type="xs:dateTime" />
      <name="AdjDateThru" type="xs:dateTime" />
      <name="TidalAdj" type="xs:boolean" />
      <name="EventID" nillable="true" type="xs:int" />
      <name="EventDescription" nillable="true" type="xs:string" />
      <name="DepArrIndicator" type="tns:TimeType" />
      <name="AdjType" type="tns:AdjustmentType" />
      <name="Annotations" nillable="true" type="tns:ArrayOfSchedAnnotation" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedTimeAdjResponse" nillable="true" type="tns:SchedTimeAdjResponse" />
  <xs:complexType name="SchedSailingDateRange">
    <xs:sequence>
      <name="DateFrom" type="xs:dateTime" />
      <name="DateThru" type="xs:dateTime" />
      <name="EventID" nillable="true" type="xs:int" />
      <name="EventDescription" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedSailingDateRange" nillable="true" type="tns:SchedSailingDateRange" />
  <xs:simpleType name="Direction">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Westbound">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Eastbound">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="Direction" nillable="true" type="tns:Direction" />
  <xs:simpleType name="TimeType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Departure">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Arrival">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="TimeType" nillable="true" type="tns:TimeType" />
  <xs:simpleType name="AdjustmentType">
    <xs:restriction base="xs:string">
      <xs:enumeration value="Addition">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
      <xs:enumeration value="Cancellation">
        <xs:annotation>
          <xs:appinfo>
            <EnumerationValue xmlns="http://schemas.microsoft.com/2003/10/Serialization/">2</EnumerationValue>
          </xs:appinfo>
        </xs:annotation>
      </xs:enumeration>
    </xs:restriction>
  </xs:simpleType>
  <xs:element name="AdjustmentType" nillable="true" type="tns:AdjustmentType" />
  <xs:complexType name="ArrayOfSchedAnnotation">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedAnnotation" nillable="true" type="tns:SchedAnnotation" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedAnnotation" nillable="true" type="tns:ArrayOfSchedAnnotation" />
  <xs:complexType name="SchedAnnotation">
    <xs:sequence>
      <name="AnnotationID" type="xs:int" />
      <name="AnnotationText" nillable="true" type="xs:string" />
      <name="AnnotationIVRText" nillable="true" type="xs:string" />
      <name="AdjustedCrossingTime" nillable="true" type="xs:int" />
      <name="AnnotationImg" nillable="true" type="xs:string" />
      <name="TypeDescription" nillable="true" type="xs:string" />
      <name="SortSeq" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedAnnotation" nillable="true" type="tns:SchedAnnotation" />
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