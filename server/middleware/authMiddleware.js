const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware function to check user authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const checkUserAuth = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).json({ error: { message: "Please login first" } });
  }

  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(401).send({ error: { message: "Please Login to complete the task !" } });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
}

module.exports = { checkUserAuth };
