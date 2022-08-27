const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    require: true
  },
  profileImg: {
    type: String,
    require: false
  }
});

const user = mongoose.model("users", userSchema);
module.exports = user;
