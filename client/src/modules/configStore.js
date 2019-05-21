import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import server from "./reducers/server";
import directory from "./reducers/directory";
import message from "./reducers/message";
import newFile from "./reducers/newFile";

const env = process.env.NODE_ENV;
const middle = [thunk];

if (env === "development") {
    const {logger} = require("redux-logger");
    middle.push(logger);
}

const applyMiddle = applyMiddleware(...middle);

const reducer = combineReducers({server, directory, message, newFile});

const store = initialState => createStore(reducer, applyMiddle);
export default store();
