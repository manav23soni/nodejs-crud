// Modules
const express = require("express");
const userRouter = express.Router();

const multipart = require('connect-multiparty');

const multipartMiddleware = multipart();

// Controller
const userCtr = require("./userController");

// Request Schema
const { createOrLoginUserSchema } = require("./userRequestValidator");

// Validator
const validator = require("../../../helper/validator/requestValidation");

// Middleware
const userMiddleware = require("./userMiddleware");

/**
 * User Create Up Route
 */
const userCreateMiddleware = [
  multipartMiddleware,
  validator.isValidRequest(createOrLoginUserSchema),
  userMiddleware.uploadImage,
  userMiddleware.checkEmailAlreadyExists,
  userCtr.createUser,
];
userRouter.post("/", userCreateMiddleware);

/**
 * User Update Up Route
 */
const userUpdateMiddleware = [
  multipartMiddleware,
  validator.isValidRequest(createOrLoginUserSchema),
  userMiddleware.uploadImage,
  userCtr.updateUser,
];
userRouter.put("/:id", userUpdateMiddleware);

/**
 * User Get All User
 */
const getAllUserMiddleware = [
  userCtr.getAllUser,
];
userRouter.get("/get-all-users", getAllUserMiddleware);

/**
 * User Get User
 */
const getUserByIdMiddleware = [
  userCtr.getUserDetails,
];
userRouter.get("/get-user/:id", getUserByIdMiddleware);

/**
 * User Delete
 */
const deleteUserByIdMiddleware = [
  userCtr.deleteUser,
];
userRouter.delete("/:id", deleteUserByIdMiddleware);

module.exports = userRouter;
