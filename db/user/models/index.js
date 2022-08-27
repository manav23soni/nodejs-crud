const mongoose = require("mongoose");

const utils = require("../../../helper/logger/utils");
const envConfig = require("../../../config/environment/environment.config");

/**
 * User DB connection user mongoose
 */
mongoose
  .connect(
    `mongodb://${envConfig.userDbHost}:${envConfig.userDbPort}/${envConfig.userDbName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log(`${envConfig.userDbName} Database server connected....`);
  })
  .catch((error) => {
    console.log("Could not connect Database server....", error);
    utils.errorLog(error);
  });
