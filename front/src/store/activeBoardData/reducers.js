import {SET_ACTIVE_BOARD} from "./constants";


export default function (state = {}, {type, payload}) {
    switch (type) {
        case SET_ACTIVE_BOARD:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}