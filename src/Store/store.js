import { createStore, applyMiddleware, combineReducers } from "redux";

const reducers = combineReducers({});

const ThunkMiddleware = require("redux-thunk").default;

const Store = createStore(reducers, applyMiddleware(ThunkMiddleware));

Store.subscribe(() => console.log(Store.getState()));

export default Store;
