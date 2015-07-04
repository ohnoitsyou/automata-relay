"use strict";
var express = require("express");
var debug = require("debug")("relay");
var request = require("request");
var path = require("path");
var fs = require("fs");

var Relay = function() {
  this.version = "0.1.0";
  this.router = express.Router();
  this.viewsFolder = __dirname + "/views";
  this.stylesFolder = __dirname + "/css";
  this.scriptsFolder = __dirname + "/js";
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
    var self = this;
    this.router.get("/", function(req, res) {
      res.send("Relay!");
    });
    this.router.get("/on/:relaynum", function(req, res) {
      var relay = req.params.relaynum;
      request(res.locals.baseURI + "/api/spark/sendCommand/relay/on/" + relay, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("Relay " + relay + " on");
      });
    });
    this.router.get("/off/:relaynum", function(req, res) {
      var relay = req.params.relaynum;
      request(res.locals.baseURI + "/api/spark/sendCommand/relay/of/" + relay, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("Relay " + relay + " off");
      });
    });
    this.router.get("/toggle/:relaynum", function(req, res) {
      var relay = req.params.relaynum;
      request(res.locals.baseURI + "/api/spark/sendCommand/relay/to/" + relay, function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("Relay " + relay + " toggled");
      });
    });
    this.router.get("/ao", function(req, res) {
      request(res.locals.baseURI + "/api/spark/sendCommand/relay/ao/0", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("All on");
      });
    });
    this.router.get("/af", function(req, res) {
      request(res.locals.baseURI + "/api/spark/sendCommand/relay/af/0", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("All off");
      });
    });
    this.router.get("/ts", function(req, res) {
      request(res.locals.baseURI + "/api/spark/sendCommand/relay/ts/0", function(e, r, b) {
        if(!e && r.statusCode == 200) {
          debug("Success");
        } else {
          debug("Not success: %s", e);
        }
        res.send("Toggled silent");
      });
    });
 
    this.router.get("/render", function(req, res) {
      var viewPath = path.join(res.locals.pluginDir, path.relative(res.locals.pluginDir, self.viewsFolder));
      res.locals.app.render(viewPath + "/relay",{relays: [1,2,3,4],layout: null}, function(err, html) {
        res.send(html);
      });
    });
    debug("[LoadRoutes] Finishing");
    return this.router;
  };
  this.registerStyles = function(pluginDir) {
    debug("[RegisterStyles] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.stylesFolder));
    try {
      fileList = fs.readdirSync(this.stylesFolder);
    } catch(e) {
      debug("[RegisterStyles] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterStyles] Found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterStyles] Finishing");
    return files;
  }
  this.registerScripts = function(pluginDir) {
    debug("[RegisterScripts] Starting");
    var files = [], fileList = [],
        filePath = path.join(path.basename(pluginDir), path.relative(pluginDir, this.scriptsFolder));
    try {
      fileList = fs.readdirSync(this.scriptsFolder);
    } catch(e) {
      debug("[RegisterScripts] Problem: %s", e);
    }
    files = fileList.map(function(file) {
      debug("[RegisterScripts] Found file: %s", file);
      return path.join(filePath, file);
    });
    debug("[RegisterScripts] Finishing");
    return files;
  }
}

module.exports = Relay;
