import { RELOAD } from "./actionTypes";

export const refreshPage = (state, action) => {
    switch (action.type) {
        case RELOAD:
            const { refresh } = action.payload;
            return { refresh };
        default:
            return state;
    }
};