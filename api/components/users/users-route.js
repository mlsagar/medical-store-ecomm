const express = require("express");
const { addUser, updateUser, login } = require("./users-controller");

const router = express.Router();

router.route("/")
    .post(addUser)

router.route(process.env.ROUTE_WITH_USER_ID)
    .put(updateUser)

router.route(process.env.ROUTE_LOGIN)
    .post(login)

module.exports = router;
