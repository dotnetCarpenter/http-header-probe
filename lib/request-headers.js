"use strict"

var mime = require("mime")
var fs = require("fs")
var headers = {
  //TODO: "MUST", "REQUIRED", "SHALL",
  //      "MUST NOT", "SHALL NOT",
  //      "SHOULD", "RECOMMENDED", "SHOULD NOT",  "MAY", and "OPTIONAL" boolean flags
  /*  Boolean flags
      widelyUsed: firefox and chrome sets these by default
      required:   All GET requests must have this header

      If a header is NOT required(: false) then the response MUST be the same when a request is
      send with the defaultHeader and if the header is missing.

      The Date contructor can not parse rfc850-date though it's required for an HTTP/1.1 server in firefox (works in node)
      console.log(
        new Date("Tue, 01 Sep 2015 10:51:32 GMT"),// rfc1123-date
        new Date("Tuesday, 01-Sep-15 10:51:32 GMT"),// rfc850-date
        new Date("Tue 01 Sep 10:51:32 2015"),// asctime-date
        new Date("Tue 1 Sep 10:51:32 2015")// asctime-date
      )
      Description: All HTTP date/time stamps MUST be represented in Greenwich Mean Time
       (GMT), without exception. For the purposes of HTTP, GMT is exactly
       equal to UTC (Coordinated Universal Time).
  */
  Accept: {
    widelyUsed: true,
    /* If no Accept header field is present, then it is assumed that the
       client accepts all media types. */
    required: false,
    /* If an Accept header field is present,
       and if the server cannot send a response which is acceptable
       according to the combined Accept field value, then the server SHOULD
       send a 406 (not acceptable) response. */
    failResponseCode: 406,
    description: fs.readFileSync("lib/Accept/desc.txt").toString(),
    baseHeader: "Accept: ",
    defaultHeader: "*/*",
    jsHeader: "*/*",
    htmlHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    cssHeader: "text/css,*/*;q=0.1",
  },
  "Accept-Charset": {
    /* chrome says: Refused to set unsafe header "Accept-Charset" and firefox does nothing */
    widelyUsed: false,
    /* If no Accept-Charset header is present, the default is that any
       character set is acceptable. */
    required: false,
    /* If an Accept-Charset header is present,
       and if the server cannot send a response which is acceptable
       according to the Accept-Charset header, then the server SHOULD send
       an error response with the 406 (not acceptable) status code, though
       the sending of an unacceptable response is also allowed. */
    failResponseCode: 406,
    description: fs.readFileSync("lib/Accept-Charset/desc.txt").toString(),
    baseHeader: "Accept-Charset: ",
    /*FIXME: according to the required not defaultHeader is problamatic
      The special value "*", if present in the Accept-Charset field,
      matches every character set (including ISO-8859-1) which is not
      mentioned elsewhere in the Accept-Charset field. If no "*" is present
      in an Accept-Charset field, then all character sets not explicitly
      mentioned get a quality value of 0, except for ISO-8859-1, which gets
      a quality value of 1 if not explicitly mentioned. */
    defaultHeader: "iso-8859-1;q=1.0",
    jsHeader: "*",
    htmlHeader: "*",
    cssHeader: "*",
  },
  "Accept-Encoding": {
    widelyUsed: true,
    description: fs.readFileSync("lib/Accept-Encoding/desc.txt").toString(),
    baseHeader: "Accept-Encoding: ",
    defaultHeader: "identity",
    jsHeader: "gzip, deflate",
    htmlHeader: "gzip, deflate",
    cssHeader: "gzip, deflate",
  },
  "Accept-Language": {
    widelyUsed: true,
    required: false,
    description: fs.readFileSync("lib/Accept-Language/desc.txt").toString(),
    baseHeader: "Accept-Language: ",
    defaultHeader: "*",
    jsHeader: "*",
    htmlHeader: "*",
    cssHeader: "*",
    set language(lang) {
      this.defaultHeader = this.htmlHeader = this.cssHeader = lang
    }
  },
  extension: "",
  setExtension: function(ext) { headers.extension = ext ? /\.?.{2,}$/.exec(ext)[0] : "" },
  getHeader: function(type) {
    var header = headers[type].baseHeader
    switch( mime.lookup(headers.extension) ) {
      case "text/html":
        header += headers[type].htmlHeader
        break
      case "text/css":
        header += headers[type].cssHeader
        break
      case "application/javascript":
        header += headers[type].jsHeader
        break
      default:
        header += headers[type].defaultHeader
    }
    return header
  },
}

module.exports = headers
