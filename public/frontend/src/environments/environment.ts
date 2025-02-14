export const environment = {
    BASE_URL: "To place the base url of the application",
    BASE_API_URL: "To place the base url of the backend api",
    APP_TITLE: "Title of the application",
    ROUTES: {
        HOME: "url constant for home",
        LOGIN: "url constant for login",
        REGISTER: "url constant for register",
        USERS: "url constant for users",
        PRODUCTS: "url constant for products",
        ORDER_HISTORY: "url constant for order history",
        PROFILE: "url constant for profile",
        PROFILE_EDIT: "url constant for profile edit"
    },
    ROUTE_PATHS: {
        HOME: "route path constant for home",
        REGISTER: "route path constant for register",
        LOGIN: "route path constant for login",
        SINGLE_PRODUCT: "route path constant for single product",
        ORDER_HISTORY: "route path constant for order history",
        PROFILE: "route path constant for profile"
    },
    LOCAL_STORAGE: {
        USER: "user constant key to store in localstorage"
    },
    REQUEST_HEADER: {
        AUTHORIZATION: "constant value for authorization",
        BEARER: "constant value for bearer"
    },
    MESSAGES : {
        SOMETHING_WENT_WRONG: "message for something went wrong",
        CANNOT_ACCESS_THE_PAGE_LOGIN: "message for cannot access page while login",
        NO_CHANGES_MADE: "message for no changes mage in the form",
        ACCESS_DENIED: "message for access denied"
    },
    INITIAL_PRODUCT_COUNT: 0, //"initial value for products count"
}