Reference for http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/cacheflushdate

**Url:** http://www.wsdot.wa.gov/Ferries/API/Terminals/rest/cacheflushdate

**HTTP Method:** GET

This operation supports JSONP responses. The callback function can be specified using the **"callback"** Url query parameter.

| Message direction | Format | Body |
| --- | --- | --- |
| Request | N/A | The Request body is empty. |
| Response | Xml | [Example](#response-xml) |
| Response | Json | [Example](#response-json) |

The following is an example response Xml body:

```
<dateTime xmlns="http://schemas.microsoft.com/2003/10/Serialization/">1999-05-31T11:20:00</dateTime>
```

The following is an example response Json body:

```
"\\/Date(928174800000-0700)\\/"
```