import { createStore } from "redux";
import { refreshPage } from "./reducers";

const defaultState = {
    refresh: false,
};

export const store = createStore(
    refreshPage,
    defaultState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);