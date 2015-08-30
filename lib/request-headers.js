"use strict"

var mime = require("mime")
var fs = require("fs")
var headers = {
  Accept: {
    standard: true,
    description: fs.readFileSync("lib/Accept/desc.txt").toString(),
    rawHeader: "Accept: ",
    defaultHeader: "*/*",
    jsHeader: "*/*",
    htmlHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    cssHeader: "text/css,*/*;q=0.1",
  },
  "Accept-Charset": { /* chrome says: Refused to set unsafe header "Accept-Charset" and firefox does nothing */
    standard: false,
    description: fs.readFileSync("lib/Accept-Charset/desc.txt").toString(),
    rawHeader: "Accept-Charset: ",
    defaultHeader: "iso-8859-1;q=1.0",
    jsHeader: "*",
    htmlHeader: "*",
    cssHeader: "*",
  },
  "Accept-Encoding": {
    standard: true,
    description: fs.readFileSync("lib/Accept-Encoding/desc.txt").toString(),
    rawHeader: "Accept-Encoding: ",
    defaultHeader: "identity",
    jsHeader: "gzip, deflate",
    htmlHeader: "gzip, deflate",
    cssHeader: "gzip, deflate",
  },
  extension: "",
  setExtension: function(ext) { headers.extension = ext ? /\.?.{2,}$/.exec(ext)[0] : "" },
  getHeader: function(type) {
    var header = headers[type].rawHeader
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
