import * as Types from '../constants/ActionType';


export function selectTask(taskIndex,title) {
    return {
        type: Types.SELECT_TASK,
        taskIndex:taskIndex,
        title:title
    };
}

export function addTask(title,date,text) {
    return {
        type: Types.ADD_TASK,
        title:title,
        date:date,
        text:text
    };
}
export function removeTask (title,date,text) {
    return {
        type: Types.REMOVE_TASK,
        title:title,
        date:date,
        text:text
    };
}
export function completeTask (title,date){
    return {
        type:Types.COMPLETE_TASK,
        title: title,
        date:date
    };
}
export function setVisivilityFilter (filter) {
    return {
        type:filter
    };
}