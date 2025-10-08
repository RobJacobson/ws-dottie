Reference for http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/allsailings/{SCHEDROUTEID}?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Schedule/rest/allsailings/{SCHEDROUTEID}?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfSchedSailingResponse xmlns="http://www.wsdot.wa.gov/ferries/schedule/">
  <SchedSailingResponse>
    <ScheduleID>2147483647</ScheduleID>
    <SchedRouteID>2147483647</SchedRouteID>
    <RouteID>2147483647</RouteID>
    <SailingID>2147483647</SailingID>
    <SailingDescription>String content</SailingDescription>
    <SailingNotes>String content</SailingNotes>
    <DisplayColNum>2147483647</DisplayColNum>
    <SailingDir>Westbound</SailingDir>
    <DayOpDescription>String content</DayOpDescription>
    <DayOpUseForHoliday>true</DayOpUseForHoliday>
    <ActiveDateRanges>
      <SchedSailingDateRange>
        <DateFrom>1999-05-31T11:20:00</DateFrom>
        <DateThru>1999-05-31T11:20:00</DateThru>
        <EventID>2147483647</EventID>
        <EventDescription>String content</EventDescription>
      </SchedSailingDateRange>
      <SchedSailingDateRange>
        <DateFrom>1999-05-31T11:20:00</DateFrom>
        <DateThru>1999-05-31T11:20:00</DateThru>
        <EventID>2147483647</EventID>
        <EventDescription>String content</EventDescription>
      </SchedSailingDateRange>
    </ActiveDateRanges>
    <Journs>
      <SchedJourn>
        <JourneyID>2147483647</JourneyID>
        <ReservationInd>true</ReservationInd>
        <InternationalInd>true</InternationalInd>
        <InterislandInd>true</InterislandInd>
        <VesselID>2147483647</VesselID>
        <VesselName>String content</VesselName>
        <VesselHandicapAccessible>true</VesselHandicapAccessible>
        <VesselPositionNum>2147483647</VesselPositionNum>
        <TerminalTimes>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
        </TerminalTimes>
      </SchedJourn>
      <SchedJourn>
        <JourneyID>2147483647</JourneyID>
        <ReservationInd>true</ReservationInd>
        <InternationalInd>true</InternationalInd>
        <InterislandInd>true</InterislandInd>
        <VesselID>2147483647</VesselID>
        <VesselName>String content</VesselName>
        <VesselHandicapAccessible>true</VesselHandicapAccessible>
        <VesselPositionNum>2147483647</VesselPositionNum>
        <TerminalTimes>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
        </TerminalTimes>
      </SchedJourn>
    </Journs>
  </SchedSailingResponse>
  <SchedSailingResponse>
    <ScheduleID>2147483647</ScheduleID>
    <SchedRouteID>2147483647</SchedRouteID>
    <RouteID>2147483647</RouteID>
    <SailingID>2147483647</SailingID>
    <SailingDescription>String content</SailingDescription>
    <SailingNotes>String content</SailingNotes>
    <DisplayColNum>2147483647</DisplayColNum>
    <SailingDir>Westbound</SailingDir>
    <DayOpDescription>String content</DayOpDescription>
    <DayOpUseForHoliday>true</DayOpUseForHoliday>
    <ActiveDateRanges>
      <SchedSailingDateRange>
        <DateFrom>1999-05-31T11:20:00</DateFrom>
        <DateThru>1999-05-31T11:20:00</DateThru>
        <EventID>2147483647</EventID>
        <EventDescription>String content</EventDescription>
      </SchedSailingDateRange>
      <SchedSailingDateRange>
        <DateFrom>1999-05-31T11:20:00</DateFrom>
        <DateThru>1999-05-31T11:20:00</DateThru>
        <EventID>2147483647</EventID>
        <EventDescription>String content</EventDescription>
      </SchedSailingDateRange>
    </ActiveDateRanges>
    <Journs>
      <SchedJourn>
        <JourneyID>2147483647</JourneyID>
        <ReservationInd>true</ReservationInd>
        <InternationalInd>true</InternationalInd>
        <InterislandInd>true</InterislandInd>
        <VesselID>2147483647</VesselID>
        <VesselName>String content</VesselName>
        <VesselHandicapAccessible>true</VesselHandicapAccessible>
        <VesselPositionNum>2147483647</VesselPositionNum>
        <TerminalTimes>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
        </TerminalTimes>
      </SchedJourn>
      <SchedJourn>
        <JourneyID>2147483647</JourneyID>
        <ReservationInd>true</ReservationInd>
        <InternationalInd>true</InternationalInd>
        <InterislandInd>true</InterislandInd>
        <VesselID>2147483647</VesselID>
        <VesselName>String content</VesselName>
        <VesselHandicapAccessible>true</VesselHandicapAccessible>
        <VesselPositionNum>2147483647</VesselPositionNum>
        <TerminalTimes>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
          <SchedTimeTerminal>
            <JourneyTerminalID>2147483647</JourneyTerminalID>
            <TerminalID>2147483647</TerminalID>
            <TerminalDescription>String content</TerminalDescription>
            <TerminalBriefDescription>String content</TerminalBriefDescription>
            <Time>1999-05-31T11:20:00</Time>
            <DepArrIndicator>Departure</DepArrIndicator>
            <IsNA>true</IsNA>
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
          </SchedTimeTerminal>
        </TerminalTimes>
      </SchedJourn>
    </Journs>
  </SchedSailingResponse>
</ArrayOfSchedSailingResponse>
```

The following is an example response Json body:

```
\[{
	"ScheduleID":2147483647,
	"SchedRouteID":2147483647,
	"RouteID":2147483647,
	"SailingID":2147483647,
	"SailingDescription":"String content",
	"SailingNotes":"String content",
	"DisplayColNum":2147483647,
	"SailingDir":0,
	"DayOpDescription":"String content",
	"DayOpUseForHoliday":true,
	"ActiveDateRanges":\[{
		"DateFrom":"\\/Date(928174800000-0700)\\/",
		"DateThru":"\\/Date(928174800000-0700)\\/",
		"EventID":2147483647,
		"EventDescription":"String content"
	}\],
	"Journs":\[{
		"JourneyID":2147483647,
		"ReservationInd":true,
		"InternationalInd":true,
		"InterislandInd":true,
		"VesselID":2147483647,
		"VesselName":"String content",
		"VesselHandicapAccessible":true,
		"VesselPositionNum":2147483647,
		"TerminalTimes":\[{
			"JourneyTerminalID":2147483647,
			"TerminalID":2147483647,
			"TerminalDescription":"String content",
			"TerminalBriefDescription":"String content",
			"Time":"\\/Date(928174800000-0700)\\/",
			"DepArrIndicator":0,
			"IsNA":true,
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
	}\]
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/schedule/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/schedule/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://schemas.microsoft.com/2003/10/Serialization/" />
  <xs:complexType name="ArrayOfSchedSailingResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedSailingResponse" nillable="true" type="tns:SchedSailingResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedSailingResponse" nillable="true" type="tns:ArrayOfSchedSailingResponse" />
  <xs:complexType name="SchedSailingResponse">
    <xs:sequence>
      <name="ScheduleID" type="xs:int" />
      <name="SchedRouteID" type="xs:int" />
      <name="RouteID" type="xs:int" />
      <name="SailingID" type="xs:int" />
      <name="SailingDescription" nillable="true" type="xs:string" />
      <name="SailingNotes" nillable="true" type="xs:string" />
      <name="DisplayColNum" type="xs:int" />
      <name="SailingDir" type="tns:Direction" />
      <name="DayOpDescription" nillable="true" type="xs:string" />
      <name="DayOpUseForHoliday" type="xs:boolean" />
      <name="ActiveDateRanges" nillable="true" type="tns:ArrayOfSchedSailingDateRange" />
      <name="Journs" nillable="true" type="tns:ArrayOfSchedJourn" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedSailingResponse" nillable="true" type="tns:SchedSailingResponse" />
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
  <xs:complexType name="ArrayOfSchedSailingDateRange">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedSailingDateRange" nillable="true" type="tns:SchedSailingDateRange" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedSailingDateRange" nillable="true" type="tns:ArrayOfSchedSailingDateRange" />
  <xs:complexType name="SchedSailingDateRange">
    <xs:sequence>
      <name="DateFrom" type="xs:dateTime" />
      <name="DateThru" type="xs:dateTime" />
      <name="EventID" nillable="true" type="xs:int" />
      <name="EventDescription" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedSailingDateRange" nillable="true" type="tns:SchedSailingDateRange" />
  <xs:complexType name="ArrayOfSchedJourn">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedJourn" nillable="true" type="tns:SchedJourn" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedJourn" nillable="true" type="tns:ArrayOfSchedJourn" />
  <xs:complexType name="SchedJourn">
    <xs:sequence>
      <name="JourneyID" type="xs:int" />
      <name="ReservationInd" type="xs:boolean" />
      <name="InternationalInd" type="xs:boolean" />
      <name="InterislandInd" type="xs:boolean" />
      <name="VesselID" type="xs:int" />
      <name="VesselName" nillable="true" type="xs:string" />
      <name="VesselHandicapAccessible" type="xs:boolean" />
      <name="VesselPositionNum" type="xs:int" />
      <name="TerminalTimes" nillable="true" type="tns:ArrayOfSchedTimeTerminal" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedJourn" nillable="true" type="tns:SchedJourn" />
  <xs:complexType name="ArrayOfSchedTimeTerminal">
    <xs:sequence>
      <maxOccurs="unbounded" name="SchedTimeTerminal" nillable="true" type="tns:SchedTimeTerminal" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfSchedTimeTerminal" nillable="true" type="tns:ArrayOfSchedTimeTerminal" />
  <xs:complexType name="SchedTimeTerminal">
    <xs:sequence>
      <name="JourneyTerminalID" type="xs:int" />
      <name="TerminalID" type="xs:int" />
      <name="TerminalDescription" nillable="true" type="xs:string" />
      <name="TerminalBriefDescription" nillable="true" type="xs:string" />
      <name="Time" nillable="true" type="xs:dateTime" />
      <name="DepArrIndicator" nillable="true" type="tns:TimeType" />
      <name="IsNA" type="xs:boolean" />
      <name="Annotations" nillable="true" type="tns:ArrayOfSchedAnnotation" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="SchedTimeTerminal" nillable="true" type="tns:SchedTimeTerminal" />
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