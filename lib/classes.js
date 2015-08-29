"use strict"

function list(of) {
  if( !(this instanceof list) ) {
    return new list(of)
  }
  this[of] = []
  this.kind = of
}
list.prototype.add = function(item) {
  this[this.kind].push(item)
  return this
}
list.prototype.clear = function() {
  var internalList = this[this.kind]
  while(internalList.length > 0) internalList.pop()
  return this
}

var probe = function Probe() {}
//  .__proto__ needed to fix V8 3.28.71.19
probe.prototype = probe.__proto__ = list("probes")
probe.prototype.times = function(num) {
  num = Number(num) - 1
  var lastFn = this.last()
  for(var start = 0, end = start + num; start < end; start++) {
    this.probes.push(lastFn)
  }
  return this
}
probe.prototype.last = function() {
  return this.probes[this.probes.length - 1]
}

var uri = function Uri() {}
//  .__proto__ needed to fix V8 3.28.71.19
uri.prototype = uri.__proto__ = list("uris")
uri.prototype.get = function() {
  return this.uris[Math.floor(Math.random() * this.uris.length)]
}

module.exports = {
  probe: probe,
  uri: uri
}
