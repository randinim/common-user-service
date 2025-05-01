const { appendExceptionStack } = require("../utils/exceptionUtils");
const { createSuccessResponse } = require("../utils/responseGenerator");
const userService = require("../services/commonUserService");

const getUserByEmail = async (req, res, next) => {
    const { identifier } = req.params;
    userService.getUserByEmail(identifier)
      .then((value) => res.status(200).json(createSuccessResponse(value)))
      .catch((err) => next(appendExceptionStack(err)));
  }

module.exports = {
    getUserByEmail,
};