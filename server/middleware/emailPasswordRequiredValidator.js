/**
 * Middleware to validate if email and password fields are required.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const emailPassRequiredValidator = (req, res, next) => {
    if (req.method === "POST") {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .send({ status: "error", message: "All Fields are Required" });
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = { emailPassRequiredValidator };