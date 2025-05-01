const { Router } = require("express");
const userController = require("../controllers/commonUserController.js");
const authorization = require("../middlewares/authorization");
const { PERMISSION_TYPES } = require("../constants/permissionConstants");

const { ANY } = PERMISSION_TYPES;

const router = Router();

router.get(
  "/get-by-id/:identifier",
  authorization([ANY]),
  userController.getUserByEmail
);

module.exports = router;
