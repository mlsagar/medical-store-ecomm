const mongoose = require("mongoose");
const Product = mongoose.model(process.env.PRODUCT_MODEL_NAME);

const allProduct = function(request, response) {
    let offset = parseInt(process.env.INITIAL_FIND_OFFSET, process.env.RADIX_VALUE);
    let count = parseInt(process.env.INITIAL_FIND_COUNT, process.env.RADIX_VALUE);

    const responseCollection = _createResponseCollection();
    if (request.query && request.query.offset) {
        offset = parseInt(request.query.offset, process.env.RADIX_VALUE);
    }

    if (request.query && request.query.count) {
        count = parseInt(request.query.count, process.env.RADIX_VALUE);
    }

    if (isNaN(offset) || isNaN(count)) {
        responseCollection.status = Number(process.env.BAD_REQUEST_STATUS_CODE);
        responseCollection.message = process.env.INVALID_OFFSET_COUNT_MESSAGE;
        _sendResponse(response, responseCollection);
        return;
    }

    Product.find().sort({_id: -1}).skip(offset).limit(count).exec()
        .then(_handleAllProduct.bind(null, responseCollection))
        .catch(_setInternalError.bind(null, responseCollection))
        .finally(_sendResponse.bind(null, response, responseCollection));

}

const oneProduct  = function (request, response) {
    const productId = request.params.productId;
    const responseCollection = _createResponseCollection();
    if (!mongoose.isValidObjectId(productId)) {
        responseCollection.status = Number(process.env.BAD_REQUEST_STATUS_CODE);
        responseCollection.message =  process.env.INVALID_PRODUCT_ID_MESSAGE;
        _sendResponse(response, responseCollection);
        return;
    }    

    Product.findById(productId).exec()
        .then(_handleOneProduct.bind(null, responseCollection))
        .catch(_setInternalError.bind(null, responseCollection))
        .finally(_sendResponse.bind(null, response, responseCollection));
}

const _handleAllProduct = function (responseCollection, products) {
    if (!products) {
        responseCollection.status = Number(process.env.BAD_REQUEST_STATUS_CODE);
        responseCollection.message = process.env.BAD_REQUEST_MESSAGE;
        return;
    }

    responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE);
    responseCollection.data = products;
    responseCollection.message = process.env.SUCCESS_FETCHING_MESSAGE;
}

const _handleOneProduct = function (responseCollection, product) {
    if (!product) {
        _setResponseCollectionForAbsenceOfProduct(responseCollection);
        return;
    }
    responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE),
    responseCollection.data = [product];
    responseCollection.message = process.env.SUCCESS_FETCHING_MESSAGE;
}

const _setResponseCollectionForAbsenceOfProduct = function (responseCollection) {
    responseCollection.status = Number(process.env.NOT_FOUND_STATUS_CODE);
    responseCollection.message = process.env.PRODUCT_ID_NOT_FOUND_MESSAGE;
}

const _createResponseCollection = function () {
    return {
        status: Number(process.env.CREATE_STATUS_CODE),
        message: "",
        data: []
    }
}

const _setInternalError = function (responseCollection, error) {
    responseCollection.status = Number(process.env.SERVER_ERROR_STATUS_CODE);
    responseCollection.message = error;
}

const _sendResponse = function (response, responseCollection) {
    response.status(responseCollection.status).json({
        ...responseCollection
    })
}

module.exports = {
    allProduct,
    oneProduct
}