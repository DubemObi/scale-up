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

exports.getOneUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const doc = await User.findById(id);

  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  let user = await User.find();
  res.status(200).json({
    status: "success",
    results: user.length,
    data: { user },
  });
});
