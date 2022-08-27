const fs = require('fs');
const path = require('path');
const { v1: uuidv1 } = require("uuid");

// Services
const userService = require("./userService");

// Constants
const messageConstant = require("../../../constant/message");
const { ERROR400, ERROR500 } = require("../../../constant/response");

const userMiddleware = {};

/**
 * @description Check is email is already registered
 * @param {object} req
 * @param {object} res
 * @param  next
 */
userMiddleware.checkEmailAlreadyExists = async (req, res, next) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase();
    const query = {
      condition: {
        email,
      },
      requiredFields: {
        email: 1,
      },
    };
    const user = await userService.getUserDetails(query);
    if (user) {
      /**
       * Check is email is alredy registered with signUpType Email
       */
      return res.status(ERROR400.CODE).json({
        error: messageConstant.EmailAlreadyRegistered,
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

userMiddleware.uploadImage = async (req, res, next) => {
  try {
    if (req.files.profileImg) {
      const tempPath = req.files.profileImg.path;
      const targetPath = path.join(__dirname, `../../../uploads/${uuidv1()}.${req.files.profileImg.originalFilename.split('.')[1]}`);
        fs.rename(tempPath, targetPath, err => {
          if (err) {
            res.status(ERROR400.CODE).json({
              error: messageConstant.BadRequest,
            });
          }
          req.profileImg = targetPath.split('/').splice(5).join('/');        ;
          next();
        });
    } else {
      req.profileImg = null
      next();
    }
  } catch (error) {
    console.log(error)
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

module.exports = userMiddleware;
