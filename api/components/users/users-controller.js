const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL_NAME);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addUser = function (request, response) {
    const responseCollection = _createResponseCollection();
    bcrypt.genSalt(Number(process.env.PASSWORD_SALT_ROUND))
        .then(_generateHashPassword.bind(null, request))
        .then(_createNewUser.bind(null, request))
        .then(_userCreate)
        .then(_handleAddUser.bind(null, responseCollection))
        .catch(_setInternalError.bind(null, responseCollection))
        .finally(_sendResponse.bind(null, response, responseCollection));
}

const updateUser = function (request, response) {
    const userId = request.params.userId;
    const responseCollection = _createResponseCollection();
    if (!mongoose.isValidObjectId(userId)) {
        responseCollection.status = Number(process.env.BAD_REQUEST_STATUS_CODE);
        responseCollection.message =  process.env.INVALID_USER_ID_MESSAGE;
        _sendResponse(response, responseCollection);
        return;
    }

    User.findById(userId).exec()
        .then(_updateUser.bind(null, request, responseCollection))
        .catch(_setInternalError.bind(null, responseCollection))
        .finally(_sendResponse.bind(null, response, responseCollection));
    }

const _updateUser = function(request, responseCollection, user) {
    user.name = request.body.name;
    user.email = request.body.email;
    user.creditCard = request.body.creditCard;
    user.password = user.password;
    user.save();
    responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE);
    responseCollection.message = "Updated user successfully";
}

const login = function (request, response) {
    const responseCollection = _createResponseCollection();
    if (request.body && request.body.email && request.body.password) {
        User.find({ email: request.body.email })
            .then(_verifyPassword.bind(null, request, responseCollection))
            .catch(_setVerifyPasswordErrorStatusCode.bind(null, responseCollection))
            .then(_handleVerifyPassword.bind(null, responseCollection))
            .catch(_setInternalError.bind(null, responseCollection))
            .finally(_sendResponse.bind(null, response, responseCollection));
        return;
    }

    responseCollection.status = Number(process.env.BAD_REQUEST_STATUS_CODE);
    responseCollection.message = process.env.BAD_REQUEST_MESSAGE;
    _sendResponse(response, responseCollection);
}

const _handleAddUser = function (responseCollection, response) {
    if (!response) {
        responseCollection.status = Number(process.env.SERVER_ERROR_STATUS_CODE);
        responseCollection.message = process.env.BAD_REQUEST_MESSAGE;
        return;
    }

    responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE);
    responseCollection.message = process.env.USER_POST_SUCCESS_MESSAGE;
}

const _generateHashPassword = function (request, salt) {
    return bcrypt.hash(request.body.password, salt);
}

const _createNewUser = function (request, hashPassword) {
    return new Promise((resolve, reject) => {
        if (hashPassword) {
            const newUser = {
                name: request.body.name,
                email: request.body.email,
                password: hashPassword,
                creditCard: request.body.creditCard
            }
            resolve(newUser);
            return;
        }

        reject(process.env.NOT_ABLE_TO_CREATE_USER_MESSAGE);

    })
}

const _userCreate = function (newUser) {
    return User.create(newUser)
}

const _verifyPassword = function(request, responseCollection, databaseUser) {
    return new Promise((resolve, reject) => {
        if (!databaseUser.length) {
            reject(process.env.UNAUTHORIZE_USER_MESSAGE)
            return;
        }
        responseCollection.data = [{
            name:databaseUser[0].name,
            email:databaseUser[0].email,
            _id: databaseUser[0]._id,
            creditCard: databaseUser[0].creditCard,
            password: request.body.password
        }];
        resolve(bcrypt.compare(request.body.password, databaseUser[0].password));
    })

}

const _setVerifyPasswordErrorStatusCode = function(responseCollection, error) {
    responseCollection.status = Number(process.env.UNAUTHORIZE_STATUS_CODE);
    throw error;
}

const _handleVerifyPassword = function(responseCollection, isVerified) {
        if (!isVerified) {
            responseCollection.status = Number(process.env.UNAUTHORIZE_STATUS_CODE);
            responseCollection.message = process.env.UNAUTHORIZE_USER_MESSAGE;
            responseCollection.data = [];
            return;
        }

        responseCollection.status = Number(process.env.SUCCESS_STATUS_CODE);
        responseCollection.message = process.env.LOGIN_SUCCESS_MESSAGE;
        responseCollection.token = jwt.sign(responseCollection.data[0], process.env.JWT_PRIVATE_KEY);
        responseCollection.data = [];
}

const _createResponseCollection = function () {
    return {
        status: Number(process.env.CREATE_STATUS_CODE),
        message: "",
        data: []
    }
}

const _setInternalError = function (responseCollection, error) {
    responseCollection.status = responseCollection.status === Number(process.env.CREATE_STATUS_CODE) ? Number(process.env.SERVER_ERROR_STATUS_CODE) : responseCollection.status;
    responseCollection.message = error.message || error;
}

const _sendResponse = function (response, responseCollection) {
    response.status(responseCollection.status).json({
        ...responseCollection
    })
}

module.exports = {
    addUser,
    updateUser,
    login
}
