import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import serverReducer from "./server/reducer";
import fileReducer from "./file/reducer";
import userReducer from "./user/reducer";

const env = process.env.NODE_ENV;
const middle = [thunk];

if (env === "development") {
    const {logger} = require("redux-logger");
    middle.push(logger);
}

const applyMiddle = applyMiddleware(...middle);

const reducer = combineReducers({
    server: serverReducer,
    file: fileReducer,
    user: userReducer,
});

export default createStore(reducer, applyMiddle);