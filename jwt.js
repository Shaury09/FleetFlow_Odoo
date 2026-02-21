const env = require("./env");

module.exports = {
  secret: env.jwtSecret,
  expiresIn: "7d", // token valid for 7 days
};