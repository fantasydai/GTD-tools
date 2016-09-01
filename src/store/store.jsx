import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';

const initialState =[{
    "className":"默认分类",
    "tasks":[{"date":"2016-08-22","titles":["示例任务一"],"state":[1]},{"date":"2016-08-23","titles":["示例任务二"],"state":[0]}],
    isSelect:true
}];

const configure = (initialState) => {
    const store = createStore(rootReducer, initialState);
    return store;
}
export default configure;

