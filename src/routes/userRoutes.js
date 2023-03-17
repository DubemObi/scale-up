const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(UserController.createUser)
  .get(UserController.getAllUser);

router.route("/:id").get(UserController.getOneUser);

module.exports = router;
