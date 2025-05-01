const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true, // Primary key for the customer
      required: true,
    },
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    updatedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

// Static method to encrypt a password
UserSchema.statics.encryptPassword = async function (password) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  return await bcrypt.hash(password, saltRounds);
};

// Static method to verify a password
UserSchema.statics.verifyPassword = async function (password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = mongoose.model("User", UserSchema);
