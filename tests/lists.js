"use strict"

// var test = require("tap").test
var assert = require("assert")
var fs = require("fs")
var list = require("../lib/lists")

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

/* Probe */
// .add
assert.deepEqual([1,2,3], list.probe.add(1).add(2).add(3).probes)
// .times
assert.deepEqual([1,2,3,3,3], list.probe.times(3).probes)
// .last
assert.strictEqual(4, list.probe.add(4).last())
// .clear
assert.deepEqual([1,2,3,3,3,4], list.probe.probes)
assert.deepEqual([], list.probe.clear().probes)

/* Uri */
// .add
assert.deepEqual([1,2,3], list.uri.add(1).add(2).add(3).uris)
// .get
var get = list.uri.get() // random entry (1 or 2 or 3)
assert.ok(get === 1 || get === 2 || get === 3)
// .clear
assert.deepEqual([1,2,3], list.uri.uris)
assert.deepEqual([], list.uri.clear().uris)
