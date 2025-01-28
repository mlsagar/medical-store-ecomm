const express = require("express");
const { addOrderHistory, userOrderHistory } = require("./order-history-controller");
const authenticate = require("../../core/authentication");

const router = express.Router();

router.route("/")
    .post(authenticate, addOrderHistory)

router.route(process.env.ROUTE_WITH_USER_ID)
    .get(authenticate, userOrderHistory);

module.exports = router