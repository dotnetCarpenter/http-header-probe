#!/usr/bin/env node

"use strict"

//TODO: generate a huge json file with all the test combination currently codyfied in tests/http-request-headers.js

var fs = require('fs')

var testPrimitive = {
  type: undefined,
  default: undefined,
  html: undefined,
  css: undefined,
  js: undefined,
}

var testParent = {
  ext: undefined
}

var types = ["Accept", "Accept-Charset", "Accept-Encoding"]
var requestHeaders = {
  "Accept": {
    default: "Accept: */*",
    html: "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    css: "Accept: text/css,*/*;q=0.1",
    js: "Accept: */*",
  },
  "Accept-Charset": {
    default: "Accept-Charset: iso-8859-1;q=1.0",
    html: "Accept-Charset: *",
    css: "Accept-Charset: *",
    js: "Accept-Charset: *",
  },
  "Accept-Encoding": {
    default: "Accept-Encoding: identity",
    html: "Accept-Encoding: gzip, deflate",
    css: "Accept-Encoding: gzip, deflate",
    js: "Accept-Encoding: gzip, deflate",
  }
}

var extensionEnum = {
  "unknown": 0,
  "default": 1,
  "html": 2,
  "css": 4,
  "js": 8
}

var extensions = {
  "default": extensionEnum.default,
//  "foobar": extensionEnum.unknown | extensionEnum.default,
  ".html": extensionEnum.html,
  "html": extensionEnum.html,
  ".htm": extensionEnum.html,
  "htm": extensionEnum.html,
  ".css": extensionEnum.css,
  "css": extensionEnum.css,
  ".js": extensionEnum.js,
  "js": extensionEnum.js,
}


function getEnumKeys(enumeration, enumvalue) {
  return Object.keys(enumeration).filter(function(key) {
    return enumvalue === enumeration[key]
  })
}
