const ConflictException = require("../exceptions/ConflictException");
const User = require("../models/userModel");
const { getUserId } = require("../utils/contextUtils");
const logger = require("../utils/logger");

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const createUser = async (userData) => {
  logger.profile("Creating user");
  try {
    const { email } = userData;

    const user = await getUserByEmail(email);

    if (user) {
      logger.error("User already exists");
      throw new ConflictException("User already exists");
    }

    const userModelData = new User({
      ...userData,
      createdBy: 1,
      updatedBy: 1,
    });

    const createdUser = await userModelData.save();

    return createdUser;
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    throw error;
  } finally {
    logger.profile("Creating user");
  }
};

module.exports = {
  getUserByEmail,
  createUser
};
