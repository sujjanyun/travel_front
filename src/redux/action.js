import { RELOAD } from "./actionTypes";

export const actionReload = (status) => {
    return {
        type: RELOAD,
        payload: { refresh: status },
    };
};