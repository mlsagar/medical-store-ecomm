const mongoose = require("mongoose");
const OrderHistory = mongoose.model(process.env.ORDER_HISTORY_MODEL_NAME);
const Product = mongoose.model(process.env.PRODUCT_MODEL_NAME);

const userOrderHistory = function(request, response) {
    const userId = request.params.userId;
    const responseCollection = _createResponseCollection();
    if (!mongoose.isValidObjectId(userId)) {
        responseCollection.status = Number(process.env.BAD_REQUEST_STATUS_CODE);
        responseCollection.message =  process.env.INVALID_USER_ID_MESSAGE;
        _sendResponse(response, responseCollection);
        return;
    }    

    OrderHistory.find({userId}).populate('order.productId').exec()
        .then(_handleUserOrderHistory.bind(null, responseCollection))
        .catch(_setInternalError.bind(null, responseCollection))
        .finally(_sendResponse.bind(null, response, responseCollection));
}

const addOrderHistory = function(request, response) {
    const {userId, order} = request.body

    const responseCollection = _createResponseCollection();



    OrderHistory.create({userId, order})
        .then(_handleAddOrderHistory.bind(null, responseCollection, order))
        .catch(_setInternalError.bind(null, responseCollection))
        .finally(_sendResponse.bind(null, response, responseCollection));

}

const _handleAddOrderHistory = function(responseCollection, order, response) {
    if (!response) {
        responseCollection.status = Number(process.env.SERVER_ERROR_STATUS_CODE);
        responseCollection.message = process.env.BAD_REQUEST_MESSAGE;
        return;
    }

    order.forEach(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        product.stock -= quantity;
        await product.save();
      });

    responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE);
    responseCollection.message = process.env.ORDER_HISTORY_SUCCESS_MESSAGE;
}

const _handleUserOrderHistory = function (responseCollection, order) {
    if (!order) {
        _setResponseCollectionForAbsenceOfOrder(responseCollection);
        return;
    }
    responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE),
    responseCollection.data = order;
    responseCollection.message = process.env.SUCCESS_FETCHING_MESSAGE;
}

const _setResponseCollectionForAbsenceOfOrder = function(responseCollection) {
    responseCollection.status = Number(process.env.NOT_FOUND_STATUS_CODE);
    responseCollection.message = process.env.ORDER_ID_NOT_FOUND_MESSAGE;
}


const _createResponseCollection = function () {
    return {
        status: Number(process.env.CREATE_STATUS_CODE),
        data: [],
        message: ""
    }
}

const _setInternalError = function (responseCollection, error) {
    responseCollection.status = Number(process.env.SERVER_ERROR_STATUS_CODE);
    responseCollection.data = [];
    responseCollection.message = error;
}

const _sendResponse = function (response, responseCollection) {
    response.status(responseCollection.status).json({
        ...responseCollection
    })
}

module.exports = {
    userOrderHistory,
    addOrderHistory
}