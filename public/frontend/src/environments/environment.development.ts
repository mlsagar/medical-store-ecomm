export const environment = {
    BASE_URL: "http://localhost:3000",
    BASE_API_URL: "http://localhost:3000/api",
    APP_TITLE: "MEAN Medical Store",
    ROUTES: {
        HOME: "/home",
        LOGIN: "/login",
        REGISTER: "/register",
        USERS: "/users",
        PRODUCTS: "/products",
        ORDER_HISTORY: "/order-history"
    },
    ROUTE_PATHS: {
        HOME: "home",
        REGISTER: "register",
        LOGIN: "login",
        SINGLE_PRODUCT: "product/:productId",
        ORDER_HISTORY: "order-history"
    },
    LOCAL_STORAGE: {
        USER: "user"
    },
    REQUEST_HEADER: {
        AUTHORIZATION: "Authorization",
        BEARER: "Bearer"
    },
    MESSAGES : {
        SOMETHING_WENT_WRONG: "Something went wrong.",
        CANNOT_ACCESS_THE_PAGE_LOGIN: "Cannot access this page while your are logged in.",
        NO_CHANGES_MADE: "You need to make some changes before submitting the form.",
        ACCESS_DENIED: "Access denied!!!"      
    },
    INITIAL_ARTICLE_COUNT: 8
}