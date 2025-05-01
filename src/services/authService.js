const User = require("../models/userModel");
const logger = require("../utils/logger");
const userService = require("./commonUserService");
const ForbiddenException = require("../exceptions/ForbiddenException");
const { generateToken } = require("../utils/userUtils");

/**
 * Login a user
 * @param payload
 * @returns {Promise<{status: number, data: {message: string}}|*>}
 */
const login = async (payload) => {
  try {
    const { email, password } = payload;

    const user = await userService.getUserByEmail(email);

    if (!user) {
      logger.error("User not found");
      throw new ForbiddenException("User not found");
    }

    const isValid = await User.verifyPassword(password, user.password);
    if (!isValid) {
      logger.error("Invalid password");
      throw new ForbiddenException("Invalid password");
    }

    const { password: _, ...userData } = user.toObject();

    return {
      token: generateToken(user),
      ...userData,
    };
  } catch (error) {
    logger.error("Error in login:", error);
    throw error;
  }
};

/**
 * Register a new user
 * @param payload
 * @returns {Promise<*>}
 * @throws {ForbiddenException} If the user already exists
 */
const register = async (payload) => {
  try {
    const { email, password } = payload;

    const user = await userService.getUserByEmail(email);

    if (user) {
      logger.error("User already exists");
      throw new ForbiddenException("User already exists");
    }

    const encryptedPassword = await User.encryptPassword(password);

    const data = {
      ...payload,
      password: encryptedPassword,
    };

    const newUser = await userService.createUser(data);

    const { password: _, ...userData } = newUser.toObject();

    return {
      token: generateToken({...newUser, id: newUser._id}),
      ...userData,
    };

  } catch (error) {
    logger.error("Error in register:", error);
    throw error;
  }
};

module.exports = {
  login,
  register,
};
