// Model
const User = require("../../../db/user/models/user");

const userService = {};

/**
 * @description Insert New User
 * @param {Object} userData
 */
userService.createUser = (userData) => {
  try {
    const user = new User(userData);
    return user.save();
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get User Email Address By Id
 * @param {String} userId
 */
userService.getUser = async (userId) => {
  try {
    const result = await User.findById(userId, {
      email: 1,
      _id: 1,
    }).lean();
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get User All Users
 * @param {String} userId
 */
userService.getAllUsers = async () => {
  try {
    return result = await User.find().lean();
  } catch (error) {
    console.log(error)
  }
};

/**
 * @description Get User Details
 * @param {Object} query
 * @param {Object} query.condition Condition on which basis we want to find user
 * @param {Object} query.requiredFields Fields which we want to return
 */
userService.getUserDetails = async (query) => {
  try {
    const result = await User.findOne(
      query.condition,
      query.requiredFields
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Get User Details
 * @param {Object} query
 * @param {Object} query.condition Condition on which basis we want to find user
 * @param {Object} query.requiredFields Fields which we want to return
 */
userService.deleteUser = async (userId) => {
  try {
    const result = await User.deleteOne({ _id: userId })
    return result;
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Update User Details
 * @param {Object} query
 * @param {Object} query.condition Condition on which basis we want to find user
 * @param {Object} query.dataToUpdate Fields which we want to update
 */
userService.updateUserDetails = async (userId, data) => {
  try {
    const result = await User.updateOne(
      { _id: userId },
      data,
      {
        new: true,
      }
    );
    return result;
  } catch (error) {
    console.log(error)
  }
};

module.exports = userService;
