const express = require("express");
const { allProduct, oneProduct } = require("./products-controller");
const authenticate = require("../../core/authentication");

const router = express.Router();

router.route("/").get(authenticate, allProduct);

router.route(process.env.ROUTE_WITH_PRODUCT_ID).get(authenticate, oneProduct)

module.exports = router

