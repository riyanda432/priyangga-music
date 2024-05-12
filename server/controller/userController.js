const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ------------------ SignUp Logic----------------------------------- */

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const isEmailPresent = await UserModel.findOne({ email });
    if (isEmailPresent) {
      return res.status(409).json({ error: { message: "Email already exists" } });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUser = new UserModel({ ...req.body, password: hash });
    await newUser.save();

    return res.status(201).json({
      data: {
        message: "Sign Up Successful!!!",
        status: "success",
      },
    });
  } catch (err) {
    return res.status(400).json({ error: { message: err.message } });
  }
};


/* ------------------ Login Logic----------------------------------- */

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: { message: "All Fields are Required" } });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: { message: "Invalid Credentials" } });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).send({ error: { message: "Invalid Credentials" } });
    }

    const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h",
    });

    const response = {
      status: "success",
      message: "Login Successful!!!",
      token,
    };

    return res.status(200).send({ data: response });
  } catch (err) {
    return res.status(500).send({ error: { message: "Internal Server Error" } });
  }
};


module.exports = { signupController, loginController }