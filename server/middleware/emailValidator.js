/**
 * Middleware to validate the email address in the request body.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object if the email is invalid, otherwise calls the next middleware.
 */
const emailValidator = (req, res, next) => {
  if (req.method === "POST") {
    let email = req.body.email;

    let end = "";
    for (let i = email.length - 10; i < email.length; i++) {
      end = end + email[i];
    }

    if (end === "@gmail.com") {
      next();
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Please enter valid email" });
    }
  } else {
    next();
  }
};

module.exports = { emailValidator }
