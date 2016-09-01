import {createAction} from 'redux-actions';
import * as Types from '../constants/ActionType';

 export  function selectClass (index) {
    return {
        type:Types.SELECT_CLASS,
        index:index
    };
}

export  function removeClass (index) {
    return {
        type: Types.REMOVE_CLASS,
        index:index
    };
}
export function addClass (value) {
    return {
        type:Types.ADD_CLASS,
        value:value
    };
}