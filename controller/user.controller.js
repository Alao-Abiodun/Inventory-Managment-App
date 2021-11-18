const User = require("../models/user.model");
const Response = require("../lib/response");
const Error = require("../lib/error");
const dotenv = require("dotenv");
const { jwtSign } = require("../lib/jwt");
const { passwordHash, passwordCompare } = require("../lib/bcrypt");
dotenv.config();

const { JWT_SECRET } = process.env;

exports.signUp = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    if (!firstname || !lastname || !email || !password) {
      throw Error("Please fill all the required fields", 401);
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw Error("User already exist", 401);
    }
    const hashedPassword = await passwordHash(password);
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const payload = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };
    const token = await jwtSign(payload, JWT_SECRET, { expiresIn: "2h" });
    Response(res).success(
      { message: "User SignUp successfully", data: payload, token },
      201
    );
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw Error("Please fill all the required fields", 401);
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      throw Error("User does not exist", 401);
    }
    const isSamePassword = await passwordCompare(password, userExist.password);
    if (!isSamePassword) {
      throw Error("Password does not match", 401);
    }
    const payload = {
      id: userExist._id,
      email: userExist.email,
      role: userExist.role,
    };
    const token = await jwtSign(payload, JWT_SECRET, { expiresIn: "2h" });
    Response(res).success(
      { message: "User logged In successfully", data: payload, token },
      200
    );
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      throw Error("User does not exist", 401);
    }
    const updateUser = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      upsert: true,
    });
    Response(res).success(
      { message: "User profile updated", data: updateUser },
      200
    );
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.removeUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      throw Error("User does not exist", 401);
    }
    const removeUser = await User.findOneAndDelete({ _id: id });
    Response(res).success(
      { message: "User deleted successfully", removeUser },
      200
    );
  } catch (error) {
    Response(res).error(error, error.code);
  }
};

exports.fetchUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    Response(res).success({ message: "User fetched successfully", Users }, 200);
  } catch (error) {
    Response(res).error(error, error.code);
  }
};
