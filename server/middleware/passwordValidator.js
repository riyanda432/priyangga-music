const passwordValidator = (req, res, next) => {
  if (req.method === "POST") {
      const { password } = req.body;
      if (password) {
          const length = password.length;
          const hasNumber = /[0-9]/.test(password); // Check if password contains a number
          const hasSpecialChar = /[@#$%&*]/.test(password); // Check if password contains a special character
  
          if (length > 7 && hasNumber && hasSpecialChar) {
              return next(); // Proceed to the next middleware or route handler
          } else {
              return res.status(400).json({
                  status: "error",
                  message: "Password must be at least 8 characters long and must include a number and a special character."
              });
          }
      }
  }
  next(); // Call next middleware in case of other HTTP methods or no password provided
};
  
module.exports = { passwordValidator };
  