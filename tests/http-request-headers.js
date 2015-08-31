/*ecmaScript5*/
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

function old() {
  // default
  assert.strictEqual("Accept: */*", reqHeaders.getHeader("Accept"))

  // set extension to foobar and assert
  assert.doesNotThrow(reqHeaders.setExtension.bind(null, "foobar"))
  assert.strictEqual("Accept: */*", reqHeaders.getHeader("Accept"))

  // set extension to html and assert
  assert.doesNotThrow(reqHeaders.setExtension.bind(null, ".html"))
  assert.strictEqual("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", reqHeaders.getHeader("Accept"))
  assert.doesNotThrow(reqHeaders.setExtension.bind(null, "htm"))
  assert.strictEqual("Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8", reqHeaders.getHeader("Accept"))

  // set extension to css and assert
  assert.doesNotThrow(reqHeaders.setExtension.bind(null, "css"))
  assert.strictEqual("Accept: text/css,*/*;q=0.1", reqHeaders.getHeader("Accept"))

  // set extension to js and assert
  assert.doesNotThrow(reqHeaders.setExtension.bind(null, ".js"))
  assert.strictEqual("Accept: */*", reqHeaders.getHeader("Accept"))

  // reqHeaders.Accept.description should contain the text found in lib/Accept/desc.txt
  fs.readFile("lib/Accept/desc.txt", function(err, file) {
    if(err) throw err
    assert.strictEqual(file.toString(), reqHeaders.Accept.description)
  })
}

var assertionCounter = 0
var types = ["Accept", "Accept-Charset", "Accept-Encoding"]
var expected = {
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

// var extensions = {
//   extensionEnum.default: ""
// }

/* ****************
    run the tests
   **************** */
types.map(function(type) {
  var header = expected[type];
  // add type to header
  header.type = type
  return header
}).forEach(function(header) {
  Object.keys(header).forEach(function testAllFileExtensions(enumkey) {
    getEnumKeys(extensions, extensionEnum[enumkey]).forEach(function runRequestHeaderTest(ext) {
      testRequestHeader(header.type, ext === "default" ? "" : ext, header[enumkey])
    })
  })
  testRequestHeaderDescription(header.type)
})

function getEnumKeys(enumeration, enumvalue) {
  return Object.keys(enumeration).filter(function(key) {
    return enumvalue === enumeration[key]
  })
}

function testRequestHeader(type, ext, expected) {
  assert.doesNotThrow(reqHeaders.setExtension.bind(null, ext), format("set extension to %s", ext))
  assert.strictEqual(expected, reqHeaders.getHeader(type), format("testing header for %s", type))
  assertionCounter += 2
}

function testRequestHeaderDescription(type) {
  fs.readFile("lib/" + type + "/desc.txt", function(err, file) {
    if(err) throw err
    assert.strictEqual(
      file.toString(),
      reqHeaders[type].description,
      format("reqHeaders.%s.description should contain the text found in lib/%s/desc.txt", type, type)
    )
    assertionCounter += 1
    done();
  })
}

function format(str) {
  var args = [].splice.call(arguments, 1)
  //console.log("%d of args", args.length)
  args.forEach(function(substitute) {
    str = str.replace(/%s|%d/, substitute)
    //console.log("replacing with %s: %s", substitute, str)
  })
  return str
}

//FIXME: pretty bad
function done() {
  if(assertionCounter === 57) {
    console.log("Ran %d assertions", assertionCounter)
    process.exit(0)
  }
}

// test("GET request-headers should return an Accept request header based on the file extension", function(t) {
//   // default
//   t.equal("*/*;q=1.0", reqHeaders.header())
// })
