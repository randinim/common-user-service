const jwt = require("jsonwebtoken");
const {
  TOKEN_SECRET,
  TENANT,
  ALGORITHM,
  TOKEN_EXPIRATION,
  ISSUER,
} = require("../constants/configConstants");

const getOwner = async (inputParameters) => {
  const { id } = inputParameters;
  return id;
};

const generateToken = (user) => {
  return jwt.sign(
    {
      user: {
        role: "user",
        id: user.id,
        roleId: 1,
      },
      tenant: TENANT,
    },
    TOKEN_SECRET,
    { algorithm: ALGORITHM, expiresIn: TOKEN_EXPIRATION, issuer: ISSUER }
  );
};

module.exports = {
  getOwner,
  generateToken,
};
