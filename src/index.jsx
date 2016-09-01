import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute,hashHistory,useRouterHistory} from "react-router";
import {createHashHistory} from 'history';
import App from './containers/App/App';
import Edit from './containers/Edit/Edit';
import Content from './containers/Content/Content';
import Welcome from './containers/Welcome/Welcome';
import configure from './store/store';
require('font-awesome-webpack');

const initialState ={"classes":[{
    "className":"默认分类1",
    "tasks":[{"date":"2016-09-30","titles":["示例任务一","示例任务三"],'contents':["学习使用GTD Tools-1","学习使用GTD Tools-2"],"state":[1,0],"isSelected":[false,false]},{"date":"2016-09-23","titles":["示例任务三"],'contents':["学习使用GTD Tools-3"],"state":[0],
    "isSelected":[false]}],
    isSelected:true
}],visibilityFilter:"SHOW_ALL"};
const history = useRouterHistory(createHashHistory)();
const store = configure(initialState);
render(
        <Provider store={store}>
            <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Welcome} />
                <Route path="edit" component={Edit} />
                <Route path="detail" component={Content} />
                <Route path="welcome" component={Welcome} />
            </Route>
        </Router>
        </Provider>,
        document.getElementById('root')
    );