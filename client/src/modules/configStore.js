import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import server from "./reducers/server";
import directory from "./reducers/directory";
import message from "./reducers/message";
import {composeWithDevTools} from "redux-devtools-extension";

const env = process.env.NODE_ENV;
const middle = [thunk];


let applyMiddle = applyMiddleware(...middle);

if (env === "development") {
    const {logger} = require("redux-logger");
    middle.push(logger);
    applyMiddle = composeWithDevTools(applyMiddleware(...middle))
}

const reducer = combineReducers({server, directory, message});

const store = initialState => createStore(reducer, applyMiddle);
export default store();
