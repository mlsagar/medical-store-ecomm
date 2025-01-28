const express = require("express");
const { allProduct, oneProduct } = require("./products-controller");

const router = express.Router();

router.route("/").get(allProduct);

router.route(process.env.ROUTE_WITH_PRODUCT_ID).get(oneProduct)

module.exports = router

