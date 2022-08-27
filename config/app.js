const express = require("express");
const cors = require("cors");

// Body Parser
const bodyParser = require("body-parser");

// Created Helpers
const utils = require("../helper/logger/utils");
const envConfig = require("../config/environment/environment.config");
require("../db/user/models");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.set("port", envConfig.serverPort);

// CORS
app.use(cors());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

if (envConfig.nodeEnv === "production") {
  process.on("uncaughtException", (err) => {
    utils.errorLog(
      `${new Date().toUTCString()} uncaughtException: ${err.message}`
    );
    utils.errorLog(err.stack);
    // Todo :- Send Email To Admin
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    utils.errorLog(`${new Date().toUTCString()} unhandledRejection:`);
    utils.errorLog(reason);
    // Todo :- Send Email To Admin
    process.exit(1);
  });
}

// ROUTER
app.use("/api", require("../routes"));

module.exports = app;
