# WSF Fares API

**Source:** [WSDOT Ferries API Documentation](https://www.wsdot.wa.gov/ferries/api/fares/documentation/rest.html)

**Base URL:** `https://www.wsdot.wa.gov/ferries/api/fares/rest`

## API Access Code

Most of the REST operations require that an API Access Code be passed as part of the URL string. In order to get a valid API Access Code, please register your email address with the WSDOT Traveler API.


---

## /cacheflushdate

### Endpoints

```http
GET /cacheflushdate
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.

The following operations return data that changes infrequently and can be cached in the manner described above:

- `/validdaterange`
- `/terminals`
- `/terminalmates`
- `/terminalcombo`
- `/terminalcomboverbose`
- `/farelineitemsbasic`
- `/farelineitems`
- `/farelineitemsverbose`
- `/faretotals`

### Model

| Field | Type | Description |
|-------|------|-------------|
| `CacheFlushDate` | `date` (optional) | If present, notes the date that certain service data was last changed (see description). |


---

## /validdaterange

### Endpoints

```http
GET /validdaterange?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves a date range for which fares data is currently published & available. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `DateFrom` | `date` | Fares information is available from this date onward. |
| `DateThru` | `date` | Fares information is not available after this date. |


---

## /terminals/{TripDate}

### Endpoints

```http
GET /terminals/{TripDate}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `Description` | `string` | The name of the terminal. |


---

## /terminalmates/{TripDate}/{TerminalID}

### Endpoints

```http
GET /terminalmates/{TripDate}/{TerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalID` | `integer` | Unique identifier for a terminal. |
| `Description` | `string` | The name of the terminal. |

---

## /terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}

### Endpoints

```http
GET /terminalcombo/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation describes what fares are collected for a given departing terminal, arriving terminal and trip date. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `DepartingDescription` | `string` | The name of the departing terminal. |
| `ArrivingDescritpion` | `string` | The name of the arriving terminal. |
| `CollectionDescription` | `string` | Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc). |


---

## /terminalcomboverbose/{TripDate}

### Endpoints

```http
GET /terminalcomboverbose/{TripDate}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves fare collection descriptions for all terminal combinations available on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `DepartingTerminalID` | `integer` | Unique identifier for the departing terminal. |
| `DepartingDescription` | `string` | The name of the departing terminal. |
| `ArrivingTerminalID` | `integer` | Unique identifier for the arriving terminal. |
| `ArrivingDescritpion` | `string` | The name of the arriving terminal. |
| `CollectionDescription` | `string` | Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc). |

---

## /farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}

### Endpoints

```http
GET /farelineitemsbasic/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves the most popular fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `FareLineItemID` | `integer` | Unique identifier for a line item. |
| `FareLineItem` | `string` | A description of the fare (eg. "Adult (age 19 - 64)"). |
| `Category` | `string` | A logical grouping that the fare belongs to (eg. "Passenger"). |
| `DirectionIndependent` | `boolean` | A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal. |
| `Amount` | `decimal` | The cost of the fare in dollars. |


---

## /farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}

### Endpoints

```http
GET /farelineitems/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves fares for either round trip or one-way departures available for a given departing terminal, arriving terminal and trip date. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `FareLineItemID` | `integer` | Unique identifier for a line item. |
| `FareLineItem` | `string` | A description of the fare (eg. "Adult (age 19 - 64)"). |
| `Category` | `string` | A logical grouping that the fare belongs to (eg. "Passenger"). |
| `DirectionIndependent` | `boolean` | A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal. |
| `Amount` | `decimal` | The cost of the fare in dollars. |

---

## /farelineitemsverbose/{TripDate}

### Endpoints

```http
GET /farelineitemsverbose/{TripDate}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation retrieves round trip and one-way fares for all valid departing and arriving terminal combinations on a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `TerminalComboVerbose` | `array` | All valid terminal combinations associated with the trip date. |
| `TerminalComboVerbose[].DepartingTerminalID` | `integer` | Unique identifier for the departing terminal. |
| `TerminalComboVerbose[].DepartingDescription` | `string` | The name of the departing terminal. |
| `TerminalComboVerbose[].ArrivingTerminalID` | `integer` | Unique identifier for the arriving terminal. |
| `TerminalComboVerbose[].ArrivingDescritpion` | `string` | The name of the arriving terminal. |
| `TerminalComboVerbose[].CollectionDescription` | `string` | Text describing what fares are collected at the departing terminal (vehicle/driver, passenger, etc). |
| `LineItemXref` | `array` | Associates a terminal combination with a one-way fare and a round trip fare for the given trip date. |
| `LineItemXref[].TerminalComboIndex` | `integer` | An array index from TerminalComboVerbose. |
| `LineItemXref[].LineItemIndex` | `integer` | An array index from LineItems. |
| `LineItemXref[].RoundTripLineItemIndex` | `integer` | An array index from RoundTripLineItems. |
| `LineItems` | `array` | All one-way fare line items associated with the trip date. |
| `LineItems[].FareLineItemID` | `integer` | Unique identifier for a line item. |
| `LineItems[].FareLineItem` | `string` | A description of the fare (eg. "Adult (age 19 - 64)"). |
| `LineItems[].Category` | `string` | A logical grouping that the fare belongs to (eg. "Passenger"). |
| `LineItems[].DirectionIndependent` | `boolean` | A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal. |
| `LineItems[].Amount` | `decimal` | The cost of the fare in dollars. |
| `RoundTripLineItems` | `array` | All round trip line items associated with the trip date. |
| `RoundTripLineItems[].FareLineItemID` | `integer` | Unique identifier for a line item. |
| `RoundTripLineItems[].FareLineItem` | `string` | A description of the fare (eg. "Adult (age 19 - 64)"). |
| `RoundTripLineItems[].Category` | `string` | A logical grouping that the fare belongs to (eg. "Passenger"). |
| `RoundTripLineItems[].DirectionIndependent` | `boolean` | A flag that, when true, indicates that the fare Amount is not influenced by the departing terminal of use. When false, the Amount might change depending on the departing terminal. |
| `RoundTripLineItems[].Amount` | `decimal` | The cost of the fare in dollars. |

---

## /faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}

### Endpoints

```http
GET /faretotals/{TripDate}/{DepartingTerminalID}/{ArrivingTerminalID}/{RoundTrip}/{FareLineItemID}/{Quantity}?apiaccesscode={APIAccessCode}
```

### Valid Accept Headers

- `application/json`
- `text/xml`

### Description

This operation totals a set of fares & associated quantities for either a round trip or one-way journey, given a departing terminal, arriving terminal and trip date. Fare line item ID is a comma delimited array of line items you'd like to have totalled. Use `/farelineitems` to find valid fare line item ID values. Quantity is also a comma delimited array. Quantity values must be greater than or equal to zero. The same index in the fare line item ID and quantity input arrays must associate a fare with a quantity. For round trip input please use `'true'` to indicate round trip or `'false'` to indicate a one-way journey. A valid departing terminal may be found by using `/terminals` while a valid arriving terminal may be found by using `/terminalmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). A valid API Access Code from the WSDOT Traveler API must also be passed as part of the URL string.

Please consider using `/cacheflushdate` to coordinate the caching of this data in your application.

### Model

| Field | Type | Description |
|-------|------|-------------|
| `FareTotalType` | `enum/integer` | Indicates a logical grouping for the total. 1 for Departing, 2 for Return, 3 for Either (direction independent) and 4 for Total. |
| `Description` | `string` | A description of the amount. |
| `BriefDescription` | `string` | A string representation of the FareTotalType. |
| `Amount` | `decimal` | A total of the fares in dollars. |
