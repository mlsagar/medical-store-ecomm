const express = require("express");
const userRouter = require("../components/users/users-route");
const productRouter = require("../components/products/products-route");

const router = express.Router();

router.use(process.env.ROUTE_USERS, userRouter);
router.use(process.env.ROUTE_PRODUCTS, productRouter);

module.exports = router;