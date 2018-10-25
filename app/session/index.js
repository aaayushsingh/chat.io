// @ts-check
"use strict";

var session = require("express-session");
var RedisStore = require("connect-redis")(session);
var db = require("../database");
var config = require("../config");

/**
 * Initialize Session
 * Uses MongoDB-based session store
 *
 */
var init = function() {
  if (process.env.NODE_ENV === "production") {
    return session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      unset: "destroy",
      store: new RedisStore({
        host: "127.0.0.1",
        port: 6379,
        prefix: "sess_",
        pass: ""
      })
    });
  } else {
    return session({
      secret: config.sessionSecret,
      resave: false,
      unset: "destroy",
      saveUninitialized: true,
      store: new RedisStore({
        host: "127.0.0.1",
        port: 6379,
        prefix: "sess_",
        pass: ""
      })
    });
  }
};

module.exports = init();
