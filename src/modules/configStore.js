import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import directory from "./directory";
import message from "./message";
import {composeWithDevTools} from "redux-devtools-extension";

const env = process.env.NODE_ENV;
const middle = [thunk];


let applyMiddle = applyMiddleware(...middle);

if (env === "development") {
    const {logger} = require("redux-logger");
    middle.push(logger);
    applyMiddle = composeWithDevTools(applyMiddleware(...middle))
}

const reducer = combineReducers({directory, message});

const store = initialState => createStore(reducer, applyMiddle);
export default store();
