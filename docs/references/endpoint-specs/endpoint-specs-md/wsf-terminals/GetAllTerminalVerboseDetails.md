Reference for http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose?apiaccesscode={APIACCESSCODE}

**Url:** http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/terminalverbose?apiaccesscode={APIACCESSCODE}

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml),[Schema](#response-schema) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<ArrayOfTerminalVerboseResponse xmlns="http://www.wsdot.wa.gov/ferries/terminals/">
  <TerminalVerboseResponse>
    <TerminalID>2147483647</TerminalID>
    <TerminalSubjectID>2147483647</TerminalSubjectID>
    <RegionID>2147483647</RegionID>
    <TerminalName>String content</TerminalName>
    <TerminalAbbrev>String content</TerminalAbbrev>
    <SortSeq>2147483647</SortSeq>
    <OverheadPassengerLoading>true</OverheadPassengerLoading>
    <Elevator>true</Elevator>
    <WaitingRoom>true</WaitingRoom>
    <FoodService>true</FoodService>
    <Restroom>true</Restroom>
    <Latitude>1.26743233E+15</Latitude>
    <Longitude>1.26743233E+15</Longitude>
    <AddressLineOne>String content</AddressLineOne>
    <AddressLineTwo>String content</AddressLineTwo>
    <City>String content</City>
    <State>String content</State>
    <ZipCode>String content</ZipCode>
    <Country>String content</Country>
    <MapLink>String content</MapLink>
    <Directions>String content</Directions>
    <DispGISZoomLoc>
      <GISZoomLocation>
        <ZoomLevel>2147483647</ZoomLevel>
        <Latitude>1.26743233E+15</Latitude>
        <Longitude>1.26743233E+15</Longitude>
      </GISZoomLocation>
      <GISZoomLocation>
        <ZoomLevel>2147483647</ZoomLevel>
        <Latitude>1.26743233E+15</Latitude>
        <Longitude>1.26743233E+15</Longitude>
      </GISZoomLocation>
    </DispGISZoomLoc>
    <ParkingInfo>String content</ParkingInfo>
    <ParkingShuttleInfo>String content</ParkingShuttleInfo>
    <AirportInfo>String content</AirportInfo>
    <AirportShuttleInfo>String content</AirportShuttleInfo>
    <MotorcycleInfo>String content</MotorcycleInfo>
    <TruckInfo>String content</TruckInfo>
    <BikeInfo>String content</BikeInfo>
    <TrainInfo>String content</TrainInfo>
    <TaxiInfo>String content</TaxiInfo>
    <HovInfo>String content</HovInfo>
    <TransitLinks>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
    </TransitLinks>
    <WaitTimes>
      <WaitTime>
        <RouteID>2147483647</RouteID>
        <RouteName>String content</RouteName>
        <WaitTimeNotes>String content</WaitTimeNotes>
        <WaitTimeLastUpdated>1999-05-31T11:20:00</WaitTimeLastUpdated>
        <WaitTimeIVRNotes>String content</WaitTimeIVRNotes>
      </WaitTime>
      <WaitTime>
        <RouteID>2147483647</RouteID>
        <RouteName>String content</RouteName>
        <WaitTimeNotes>String content</WaitTimeNotes>
        <WaitTimeLastUpdated>1999-05-31T11:20:00</WaitTimeLastUpdated>
        <WaitTimeIVRNotes>String content</WaitTimeIVRNotes>
      </WaitTime>
    </WaitTimes>
    <AdditionalInfo>String content</AdditionalInfo>
    <LostAndFoundInfo>String content</LostAndFoundInfo>
    <SecurityInfo>String content</SecurityInfo>
    <ConstructionInfo>String content</ConstructionInfo>
    <FoodServiceInfo>String content</FoodServiceInfo>
    <AdaInfo>String content</AdaInfo>
    <FareDiscountInfo>String content</FareDiscountInfo>
    <TallySystemInfo>String content</TallySystemInfo>
    <ChamberOfCommerce>
      <LinkURL>String content</LinkURL>
      <LinkName>String content</LinkName>
      <SortSeq>2147483647</SortSeq>
    </ChamberOfCommerce>
    <FacInfo>String content</FacInfo>
    <ResourceStatus>String content</ResourceStatus>
    <TypeDesc>String content</TypeDesc>
    <REALTIME\_SHUTOFF\_FLAG>true</REALTIME\_SHUTOFF\_FLAG>
    <REALTIME\_SHUTOFF\_MESSAGE>String content</REALTIME\_SHUTOFF\_MESSAGE>
    <VisitorLinks>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
    </VisitorLinks>
    <Bulletins>
      <Bulletin>
        <BulletinTitle>String content</BulletinTitle>
        <BulletinText>String content</BulletinText>
        <BulletinSortSeq>2147483647</BulletinSortSeq>
        <BulletinLastUpdated>1999-05-31T11:20:00</BulletinLastUpdated>
        <BulletinLastUpdatedSortable>String content</BulletinLastUpdatedSortable>
      </Bulletin>
      <Bulletin>
        <BulletinTitle>String content</BulletinTitle>
        <BulletinText>String content</BulletinText>
        <BulletinSortSeq>2147483647</BulletinSortSeq>
        <BulletinLastUpdated>1999-05-31T11:20:00</BulletinLastUpdated>
        <BulletinLastUpdatedSortable>String content</BulletinLastUpdatedSortable>
      </Bulletin>
    </Bulletins>
    <IsNoFareCollected>true</IsNoFareCollected>
    <NoFareCollectedMsg>String content</NoFareCollectedMsg>
    <RealtimeIntroMsg>String content</RealtimeIntroMsg>
  </TerminalVerboseResponse>
  <TerminalVerboseResponse>
    <TerminalID>2147483647</TerminalID>
    <TerminalSubjectID>2147483647</TerminalSubjectID>
    <RegionID>2147483647</RegionID>
    <TerminalName>String content</TerminalName>
    <TerminalAbbrev>String content</TerminalAbbrev>
    <SortSeq>2147483647</SortSeq>
    <OverheadPassengerLoading>true</OverheadPassengerLoading>
    <Elevator>true</Elevator>
    <WaitingRoom>true</WaitingRoom>
    <FoodService>true</FoodService>
    <Restroom>true</Restroom>
    <Latitude>1.26743233E+15</Latitude>
    <Longitude>1.26743233E+15</Longitude>
    <AddressLineOne>String content</AddressLineOne>
    <AddressLineTwo>String content</AddressLineTwo>
    <City>String content</City>
    <State>String content</State>
    <ZipCode>String content</ZipCode>
    <Country>String content</Country>
    <MapLink>String content</MapLink>
    <Directions>String content</Directions>
    <DispGISZoomLoc>
      <GISZoomLocation>
        <ZoomLevel>2147483647</ZoomLevel>
        <Latitude>1.26743233E+15</Latitude>
        <Longitude>1.26743233E+15</Longitude>
      </GISZoomLocation>
      <GISZoomLocation>
        <ZoomLevel>2147483647</ZoomLevel>
        <Latitude>1.26743233E+15</Latitude>
        <Longitude>1.26743233E+15</Longitude>
      </GISZoomLocation>
    </DispGISZoomLoc>
    <ParkingInfo>String content</ParkingInfo>
    <ParkingShuttleInfo>String content</ParkingShuttleInfo>
    <AirportInfo>String content</AirportInfo>
    <AirportShuttleInfo>String content</AirportShuttleInfo>
    <MotorcycleInfo>String content</MotorcycleInfo>
    <TruckInfo>String content</TruckInfo>
    <BikeInfo>String content</BikeInfo>
    <TrainInfo>String content</TrainInfo>
    <TaxiInfo>String content</TaxiInfo>
    <HovInfo>String content</HovInfo>
    <TransitLinks>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
    </TransitLinks>
    <WaitTimes>
      <WaitTime>
        <RouteID>2147483647</RouteID>
        <RouteName>String content</RouteName>
        <WaitTimeNotes>String content</WaitTimeNotes>
        <WaitTimeLastUpdated>1999-05-31T11:20:00</WaitTimeLastUpdated>
        <WaitTimeIVRNotes>String content</WaitTimeIVRNotes>
      </WaitTime>
      <WaitTime>
        <RouteID>2147483647</RouteID>
        <RouteName>String content</RouteName>
        <WaitTimeNotes>String content</WaitTimeNotes>
        <WaitTimeLastUpdated>1999-05-31T11:20:00</WaitTimeLastUpdated>
        <WaitTimeIVRNotes>String content</WaitTimeIVRNotes>
      </WaitTime>
    </WaitTimes>
    <AdditionalInfo>String content</AdditionalInfo>
    <LostAndFoundInfo>String content</LostAndFoundInfo>
    <SecurityInfo>String content</SecurityInfo>
    <ConstructionInfo>String content</ConstructionInfo>
    <FoodServiceInfo>String content</FoodServiceInfo>
    <AdaInfo>String content</AdaInfo>
    <FareDiscountInfo>String content</FareDiscountInfo>
    <TallySystemInfo>String content</TallySystemInfo>
    <ChamberOfCommerce>
      <LinkURL>String content</LinkURL>
      <LinkName>String content</LinkName>
      <SortSeq>2147483647</SortSeq>
    </ChamberOfCommerce>
    <FacInfo>String content</FacInfo>
    <ResourceStatus>String content</ResourceStatus>
    <TypeDesc>String content</TypeDesc>
    <REALTIME\_SHUTOFF\_FLAG>true</REALTIME\_SHUTOFF\_FLAG>
    <REALTIME\_SHUTOFF\_MESSAGE>String content</REALTIME\_SHUTOFF\_MESSAGE>
    <VisitorLinks>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
      <Link>
        <LinkURL>String content</LinkURL>
        <LinkName>String content</LinkName>
        <SortSeq>2147483647</SortSeq>
      </Link>
    </VisitorLinks>
    <Bulletins>
      <Bulletin>
        <BulletinTitle>String content</BulletinTitle>
        <BulletinText>String content</BulletinText>
        <BulletinSortSeq>2147483647</BulletinSortSeq>
        <BulletinLastUpdated>1999-05-31T11:20:00</BulletinLastUpdated>
        <BulletinLastUpdatedSortable>String content</BulletinLastUpdatedSortable>
      </Bulletin>
      <Bulletin>
        <BulletinTitle>String content</BulletinTitle>
        <BulletinText>String content</BulletinText>
        <BulletinSortSeq>2147483647</BulletinSortSeq>
        <BulletinLastUpdated>1999-05-31T11:20:00</BulletinLastUpdated>
        <BulletinLastUpdatedSortable>String content</BulletinLastUpdatedSortable>
      </Bulletin>
    </Bulletins>
    <IsNoFareCollected>true</IsNoFareCollected>
    <NoFareCollectedMsg>String content</NoFareCollectedMsg>
    <RealtimeIntroMsg>String content</RealtimeIntroMsg>
  </TerminalVerboseResponse>
</ArrayOfTerminalVerboseResponse>
```

The following is an example response Json body:

```
\[{
	"TerminalID":2147483647,
	"TerminalSubjectID":2147483647,
	"RegionID":2147483647,
	"TerminalName":"String content",
	"TerminalAbbrev":"String content",
	"SortSeq":2147483647,
	"OverheadPassengerLoading":true,
	"Elevator":true,
	"WaitingRoom":true,
	"FoodService":true,
	"Restroom":true,
	"Latitude":1.26743233E+15,
	"Longitude":1.26743233E+15,
	"AddressLineOne":"String content",
	"AddressLineTwo":"String content",
	"City":"String content",
	"State":"String content",
	"ZipCode":"String content",
	"Country":"String content",
	"MapLink":"String content",
	"Directions":"String content",
	"DispGISZoomLoc":\[{
		"ZoomLevel":2147483647,
		"Latitude":1.26743233E+15,
		"Longitude":1.26743233E+15
	}\],
	"ParkingInfo":"String content",
	"ParkingShuttleInfo":"String content",
	"AirportInfo":"String content",
	"AirportShuttleInfo":"String content",
	"MotorcycleInfo":"String content",
	"TruckInfo":"String content",
	"BikeInfo":"String content",
	"TrainInfo":"String content",
	"TaxiInfo":"String content",
	"HovInfo":"String content",
	"TransitLinks":\[{
		"LinkURL":"String content",
		"LinkName":"String content",
		"SortSeq":2147483647
	}\],
	"WaitTimes":\[{
		"RouteID":2147483647,
		"RouteName":"String content",
		"WaitTimeNotes":"String content",
		"WaitTimeLastUpdated":"\\/Date(928174800000-0700)\\/",
		"WaitTimeIVRNotes":"String content"
	}\],
	"AdditionalInfo":"String content",
	"LostAndFoundInfo":"String content",
	"SecurityInfo":"String content",
	"ConstructionInfo":"String content",
	"FoodServiceInfo":"String content",
	"AdaInfo":"String content",
	"FareDiscountInfo":"String content",
	"TallySystemInfo":"String content",
	"ChamberOfCommerce":{
		"LinkURL":"String content",
		"LinkName":"String content",
		"SortSeq":2147483647
	},
	"FacInfo":"String content",
	"ResourceStatus":"String content",
	"TypeDesc":"String content",
	"REALTIME\_SHUTOFF\_FLAG":true,
	"REALTIME\_SHUTOFF\_MESSAGE":"String content",
	"VisitorLinks":\[{
		"LinkURL":"String content",
		"LinkName":"String content",
		"SortSeq":2147483647
	}\],
	"Bulletins":\[{
		"BulletinTitle":"String content",
		"BulletinText":"String content",
		"BulletinSortSeq":2147483647,
		"BulletinLastUpdated":"\\/Date(928174800000-0700)\\/",
		"BulletinLastUpdatedSortable":"String content"
	}\],
	"IsNoFareCollected":true,
	"NoFareCollectedMsg":"String content",
	"RealtimeIntroMsg":"String content"
}\]
```

The following is the response Xml Schema:

```
<xs:schema xmlns:tns="http://www.wsdot.wa.gov/ferries/terminals/" elementFormDefault="qualified" targetNamespace="http://www.wsdot.wa.gov/ferries/terminals/" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:complexType name="ArrayOfTerminalVerboseResponse">
    <xs:sequence>
      <maxOccurs="unbounded" name="TerminalVerboseResponse" nillable="true" type="tns:TerminalVerboseResponse" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfTerminalVerboseResponse" nillable="true" type="tns:ArrayOfTerminalVerboseResponse" />
  <xs:complexType name="TerminalVerboseResponse">
    <xs:sequence>
      <name="TerminalID" type="xs:int" />
      <name="TerminalSubjectID" type="xs:int" />
      <name="RegionID" type="xs:int" />
      <name="TerminalName" nillable="true" type="xs:string" />
      <name="TerminalAbbrev" nillable="true" type="xs:string" />
      <name="SortSeq" type="xs:int" />
      <name="OverheadPassengerLoading" type="xs:boolean" />
      <name="Elevator" type="xs:boolean" />
      <name="WaitingRoom" type="xs:boolean" />
      <name="FoodService" type="xs:boolean" />
      <name="Restroom" type="xs:boolean" />
      <name="Latitude" nillable="true" type="xs:double" />
      <name="Longitude" nillable="true" type="xs:double" />
      <name="AddressLineOne" nillable="true" type="xs:string" />
      <name="AddressLineTwo" nillable="true" type="xs:string" />
      <name="City" nillable="true" type="xs:string" />
      <name="State" nillable="true" type="xs:string" />
      <name="ZipCode" nillable="true" type="xs:string" />
      <name="Country" nillable="true" type="xs:string" />
      <name="MapLink" nillable="true" type="xs:string" />
      <name="Directions" nillable="true" type="xs:string" />
      <name="DispGISZoomLoc" nillable="true" type="tns:ArrayOfGISZoomLocation" />
      <name="ParkingInfo" nillable="true" type="xs:string" />
      <name="ParkingShuttleInfo" nillable="true" type="xs:string" />
      <name="AirportInfo" nillable="true" type="xs:string" />
      <name="AirportShuttleInfo" nillable="true" type="xs:string" />
      <name="MotorcycleInfo" nillable="true" type="xs:string" />
      <name="TruckInfo" nillable="true" type="xs:string" />
      <name="BikeInfo" nillable="true" type="xs:string" />
      <name="TrainInfo" nillable="true" type="xs:string" />
      <name="TaxiInfo" nillable="true" type="xs:string" />
      <name="HovInfo" nillable="true" type="xs:string" />
      <name="TransitLinks" nillable="true" type="tns:ArrayOfLink" />
      <name="WaitTimes" nillable="true" type="tns:ArrayOfWaitTime" />
      <name="AdditionalInfo" nillable="true" type="xs:string" />
      <name="LostAndFoundInfo" nillable="true" type="xs:string" />
      <name="SecurityInfo" nillable="true" type="xs:string" />
      <name="ConstructionInfo" nillable="true" type="xs:string" />
      <name="FoodServiceInfo" nillable="true" type="xs:string" />
      <name="AdaInfo" nillable="true" type="xs:string" />
      <name="FareDiscountInfo" nillable="true" type="xs:string" />
      <name="TallySystemInfo" nillable="true" type="xs:string" />
      <name="ChamberOfCommerce" nillable="true" type="tns:Link" />
      <name="FacInfo" nillable="true" type="xs:string" />
      <name="ResourceStatus" nillable="true" type="xs:string" />
      <name="TypeDesc" nillable="true" type="xs:string" />
      <name="REALTIME\_SHUTOFF\_FLAG" type="xs:boolean" />
      <name="REALTIME\_SHUTOFF\_MESSAGE" nillable="true" type="xs:string" />
      <name="VisitorLinks" nillable="true" type="tns:ArrayOfLink" />
      <name="Bulletins" nillable="true" type="tns:ArrayOfBulletin" />
      <name="IsNoFareCollected" nillable="true" type="xs:boolean" />
      <name="NoFareCollectedMsg" nillable="true" type="xs:string" />
      <name="RealtimeIntroMsg" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="TerminalVerboseResponse" nillable="true" type="tns:TerminalVerboseResponse" />
  <xs:complexType name="ArrayOfGISZoomLocation">
    <xs:sequence>
      <maxOccurs="unbounded" name="GISZoomLocation" nillable="true" type="tns:GISZoomLocation" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfGISZoomLocation" nillable="true" type="tns:ArrayOfGISZoomLocation" />
  <xs:complexType name="GISZoomLocation">
    <xs:sequence>
      <name="ZoomLevel" type="xs:int" />
      <name="Latitude" nillable="true" type="xs:double" />
      <name="Longitude" nillable="true" type="xs:double" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="GISZoomLocation" nillable="true" type="tns:GISZoomLocation" />
  <xs:complexType name="ArrayOfLink">
    <xs:sequence>
      <maxOccurs="unbounded" name="Link" nillable="true" type="tns:Link" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfLink" nillable="true" type="tns:ArrayOfLink" />
  <xs:complexType name="Link">
    <xs:sequence>
      <name="LinkURL" nillable="true" type="xs:string" />
      <name="LinkName" nillable="true" type="xs:string" />
      <name="SortSeq" nillable="true" type="xs:int" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="Link" nillable="true" type="tns:Link" />
  <xs:complexType name="ArrayOfWaitTime">
    <xs:sequence>
      <maxOccurs="unbounded" name="WaitTime" nillable="true" type="tns:WaitTime" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfWaitTime" nillable="true" type="tns:ArrayOfWaitTime" />
  <xs:complexType name="WaitTime">
    <xs:sequence>
      <name="RouteID" nillable="true" type="xs:int" />
      <name="RouteName" nillable="true" type="xs:string" />
      <name="WaitTimeNotes" nillable="true" type="xs:string" />
      <name="WaitTimeLastUpdated" nillable="true" type="xs:dateTime" />
      <name="WaitTimeIVRNotes" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="WaitTime" nillable="true" type="tns:WaitTime" />
  <xs:complexType name="ArrayOfBulletin">
    <xs:sequence>
      <maxOccurs="unbounded" name="Bulletin" nillable="true" type="tns:Bulletin" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="ArrayOfBulletin" nillable="true" type="tns:ArrayOfBulletin" />
  <xs:complexType name="Bulletin">
    <xs:sequence>
      <name="BulletinTitle" nillable="true" type="xs:string" />
      <name="BulletinText" nillable="true" type="xs:string" />
      <name="BulletinSortSeq" type="xs:int" />
      <name="BulletinLastUpdated" nillable="true" type="xs:dateTime" />
      <name="BulletinLastUpdatedSortable" nillable="true" type="xs:string" />
    </xs:sequence>
  </xs:complexType>
  <xs:element name="Bulletin" nillable="true" type="tns:Bulletin" />
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