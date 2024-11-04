const express = require("express");
const router = express.Router();

const getUsersController = require("../controllers/getUsersController.js")

router.get("/all", getUsersController.getAllUsers);

module.exports = router;