const express = require('express');

var test = function() { console.log("test") };
var test2 = function() { console.log("test2") };

module.exports = { test: test, test2: test2 }; 
