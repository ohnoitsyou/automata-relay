"use strict";
var express = require('express');
var debug = require("debug")("relay");


var Relay = function() {
  this.version = "0.1.0";
  this.router = express.Router();
  this.load = function(options) {
    debug("[Load] Starting");
    debug("[Load] Finishing");
  };
  this.initilize = function() {
    debug("[Initilize] Starting");
    debug("[Initilize] Finishing");
    return true;
  };
  this.loadRoutes = function() {
    debug("[LoadRoutes] Starting");
    this.router.get("/", function(req, res) {
      res.send("Relay!");
    });
    this.router.get("/on", function(req, res) {
      res.send("Relay on!");
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
}

module.exports = Relay;
