const express = require("express");
const { addOrderHistory, userOrderHistory } = require("./order-history-controller");

const router = express.Router();

router.route("/")
    .post(addOrderHistory)

router.route(process.env.ROUTE_WITH_USER_ID)
    .get(userOrderHistory);

module.exports = router