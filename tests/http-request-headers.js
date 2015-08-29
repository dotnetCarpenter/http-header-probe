"use strict"

// var test = require("tap").test
var assert = require("assert")
var fs = require("fs")
var reqHeaders = require("../lib/request-headers")

/* assert functions
fail,
 ok,
 equal,
 notEqual,
 deepEqual,
 notDeepEqual,
 strictEqual,
 notStrictEqual,
 throws,
 doesNotThrow,
 ifError
*/

// default
assert.strictEqual("Accept: */*", reqHeaders.getHeader())

// set extension to foobar and assert
assert.doesNotThrow(reqHeaders.setExtension.bind(null, "foobar"))
assert.strictEqual("Accept: */*", reqHeaders.getHeader())

// set extension to html and assert
assert.doesNotThrow(reqHeaders.setExtension.bind(null, ".html"))
assert.strictEqual("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", reqHeaders.getHeader())
assert.doesNotThrow(reqHeaders.setExtension.bind(null, "htm"))
assert.strictEqual("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", reqHeaders.getHeader())

// set extension to css and assert
assert.doesNotThrow(reqHeaders.setExtension.bind(null, "css"))
assert.strictEqual("Accept: text/css,*/*;q=0.1", reqHeaders.getHeader())

// set extension to js and assert
assert.doesNotThrow(reqHeaders.setExtension.bind(null, ".js"))
assert.strictEqual("Accept: */*", reqHeaders.getHeader())

// reqHeaders.Accept.description should contain the text found in lib/Accept/desc.txt
fs.readFile("lib/Accept/desc.txt", function(err, file) {
  if(err) throw err
  assert.strictEqual(file.toString(), reqHeaders.Accept.description)
})

// test("GET request-headers should return an Accept request header based on the file extension", function(t) {
//   // default
//   t.equal("*/*;q=1.0", reqHeaders.header())
// })
