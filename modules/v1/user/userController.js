/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */

// Services
const userService = require("./userService");

const {
  SUCCESS200,
  ERROR500
} = require("../../../constant/response");

const userCtr = {};

/**
 * @description Create User
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
userCtr.createUser = async (req, res) => {
  try {
    const { body, profileImg } = req;
    if (profileImg) {
      body.profileImg = profileImg
    }
    const userData = await userService.createUser(body);
    return res.status(SUCCESS200.CODE).json({
      data: {
        email: userData.email,
        userId: userData._id,
      }
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

/**
 * @description Update User
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
userCtr.updateUser = async (req, res) => {
  try {
    const { body, profileImg } = req;
    const { id } = req.params;
    if (profileImg) {
      body.profileImg = profileImg
    }
    const userData = await userService.updateUserDetails(id, body);
    return res.status(SUCCESS200.CODE).json({
      data: {
        email: userData.email,
        userId: userData._id,
      }
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
}

/**
 * @description List User
 * @param {Object} req
 * @param {Object} res
 * @returns {Array}
 */
userCtr.getAllUser = async (req, res) => {
  try {
    const userData = await userService.getAllUsers();
    return res.status(SUCCESS200.CODE).json({
      data: userData
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

/**
 * @description Get User Details
 * @param {Object} req
 * @param {Object} res
 * @returns {Array}
 */
userCtr.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      condition: {
        _id: id,
      },
      requiredFields: {
        email: 1,
        firstName: 1,
        lastName: 1,
        phoneNumber: 1,
        profileImg: 1
      },
    };
    const userData = await userService.getUserDetails(query);
    return res.status(SUCCESS200.CODE).json({
      data: userData
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};

/**
 * @description Delete User Details
 * @param {Object} req
 * @param {Object} res
 * @returns {Array}
 */
userCtr.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await userService.deleteUser(id);
    return res.status(SUCCESS200.CODE).json({
      data: userData
    });
  } catch (error) {
    return res.status(ERROR500.CODE).json({
      error,
    });
  }
};


module.exports = userCtr;
