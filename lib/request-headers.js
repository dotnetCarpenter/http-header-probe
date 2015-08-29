"use strict"

var mime = require("mime")
var fs = require("fs")
var path = require("path")
var headers = {
  Accept: {
    rawHeader: "Accept: ",
    defaultHeader: "*/*",
    //jsHeader: "*/*",
    htmlHeader: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    cssHeader: "text/css,*/*;q=0.1",
    description: fs.readFileSync("lib/Accept/desc.txt").toString(),
  },
  "Accept-Charset": {},
  extension: "",
  setExtension: function(ext) { headers.extension = /\.?.{2,}$/.exec(ext)[0] },
  getHeader: function() {
    var header = headers.Accept.rawHeader
    switch( mime.lookup(headers.extension) ) {
      case "text/html":
        header += headers.Accept.htmlHeader
        break
      case "text/css":
        header += headers.Accept.cssHeader
        break
      case "application/javascript":
      default:
        header += headers.Accept.defaultHeader
    }
    return header
  },
}

module.exports = headers
