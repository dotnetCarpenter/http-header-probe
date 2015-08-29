#!/usr/bin/env node

"use strict"

var url = ""
var request = require("request")
require("request-debug")(request)
// probe and uri
var util = require("../lib/classes")

// add uris
forEach([url + "/compress/foo.js.gz", url + "/a.txt", url + "/compress/foo.js"], util.uri.add, util.uri)
// add getRequest twice
util.probe.add(getRequest).times(2)

function forEach(arr, fn, scope) {
  for(var i = 0, len = arr.length; i < len; i++) {
    fn.call(scope, arr[i], i, arr)
  }
}

function getRequest() {
  var url = util.uri.get()
  request.get({
    uri: url
  , followRedirect: false
  //, headers: { 'If-Match': '*' }
  //, headers: { 'if-modified-since': Date.now() }
  }, function (err, res, body) {
    if (err) console.log(err), process.exit(1)

  //  console.dir(res)
    console.log('GET ' + uri)
    console.dir(res.headers)
    console.log("*******************************************\r\n")
  });
}
