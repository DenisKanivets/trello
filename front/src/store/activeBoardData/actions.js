import {SET_ACTIVE_BOARD} from "./constants";

export const setBoard = payload => {
    return {
        type: SET_ACTIVE_BOARD,
        payload,
    };
};