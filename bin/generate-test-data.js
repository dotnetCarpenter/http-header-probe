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
