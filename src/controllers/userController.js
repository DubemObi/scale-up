const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createUser = catchAsync(async (request, response, next) => {
  const { firstName, lastName, email, phoneNumber } = request.body;
  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
  });
  await newUser.save();
  return response.status(201).send({
    status: true,
    message: "User has been created",
    data: newUser,
  });
});

exports.getOneUser = catchAsync(async (request, response) => {
  try {
    const id = request.params.id;
    const findOneUser = await User.findById(id);

    if (!findOneUser) {
      return response.status(404).send({
        status: false,
        message: "User not found",
      });
    } else {
      return response.status(200).send({
        status: true,
        message: "User found",
        Blog: findOneUser,
      });
    }
  } catch (err) {
    if (err.path === "_id") {
      return response.status(401).send({
        status: false,
        message: "Invalid ID",
      });
    } else {
      return response.status(500).send({
        status: false,
        message: "Server Error",
      });
    }
  }
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  let user = await User.find();
  res.status(200).json({
    status: "success",
    results: user.length,
    data: { user },
  });
});
