import user from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(10);
export const createUser = async (request, response) => {
  const { username, password } = request.body;
  try {
    const checkUsername = await user.findOne({ username });
    if (checkUsername) {
      return response
        .status(202)
        .json({ message: "Username already exists", type: "fail" });
    }
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await user.create({
      ...request.body,
      password: hashPassword,
    });
    return response.status(200).json({
      message: "User created successfully",
      type: "success",
      data: { username: newUser.username },
    });
  } catch (error) {
    return response.status(500).json({ message: error.message, type: "fail" });
  }
};

// find user by id.
export const findUsers = async (request, response) => {
  const { id } = request.params;
  user
    .findOne({ _id: id })
    .populate()
    .then((data) =>
      response.json({
        data,
        type: "success",
        message: "User fetched successfully",
      })
    )
    .catch((error) =>
      response.status(400).json({ message: error.message, type: "fail" })
    );
};

// find user by userRole.
export const findUsersByRole = async (request, response) => {
  const { userRole } = request.query;
  user
    .findAll({ userRole })
    .populate()
    .then((data) =>
      response.json({
        data,
        type: "success",
        message: "User fetched successfully",
      })
    )
    .catch((error) =>
      response.status(400).json({ message: error.message, type: "fail" })
    );
};

// get all users.
export const getAllUsers = async (request, response) => {
  await user
    .find()
    .then((data) =>
      response.json({
        data,
        type: "success",
        message: "Users fetched successfully",
      })
    )
    .catch((error) =>
      response.status(400).json({ message: error.message, type: "fail" })
    );
};

//login for user
export const userLogin = async (request, response) => {
  const { email, password } = request.body;
  const hashPassword = bcrypt.hashSync(password, salt);
  try {
    if (!email | !password) {
      return response.status(400).json({
        isLoggedin: false,
        email: "Fill correct details",
        password: "Fill correct details",
      });
    }
    const userDetails = await user.findOne({ email });
    if (!userDetails) {
      return response
        .status(404)
        .json({ isLoggedin: false, email: "User doesn't exist", type: "fail" });
    }
    if (!userDetails.password === hashPassword) {
      return response.status(400).json({
        isLoggedin: false,
        password: "Invalid Credentials",
        type: "fail",
      });
    }
    const accessToken = jwt.sign(
      { user: userDetails },
      process.env.ACCESS_TOKEN_SECRET
    );
    return response.status(200).json({
      message: "Logged in Successfully",
      isLoggedin: true,
      token: accessToken,
      username: userDetails?.username,
      id: userDetails?.id,
      type: "success",
    });
  } catch (error) {
    return response.status(500).json({ message: error.message, type: "fail" });
  }
};

//delete user account.
export const deleteUser = async (request, response) => {
  const { id } = request.query;
  await user
    .deleteOne({ _id: id })
    .then(() => response.json("User Successfully deleted"))
    .catch((error) =>
      response.status(400).json({ message: error.message, type: "fail" })
    );
};
