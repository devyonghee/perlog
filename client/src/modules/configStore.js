import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import server from "./serverReducer";

const env = process.env.NODE_ENV;
const middle = [thunk];

if (env === "development") {
    const {logger} = require("redux-logger");
    middle.push(logger);
}

const applyMiddle = applyMiddleware(...middle);

const reducer = combineReducers({server});

const store = (initialState = {server: {}}) => createStore(reducer, applyMiddle);
export default store();
