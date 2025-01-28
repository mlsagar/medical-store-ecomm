const express = require("express");
const userRouter = require("../components/users/users-route");
const productRouter = require("../components/products/products-route");
const orderHistoryRouter = require("../components/order-history/order-history-route");

const router = express.Router();

router.use(process.env.ROUTE_USERS, userRouter);
router.use(process.env.ROUTE_PRODUCTS, productRouter);
router.use(process.env.ROUTE_ORDER_HISTORY, orderHistoryRouter);

module.exports = router;