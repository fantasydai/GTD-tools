import React ,{Component} from 'react';
import styles from './List.css';
import Tasks from '../../components/Task/Task';
import {VisibilityFilters} from '../../constants/ActionType'
import {setVisivilityFilter} from '../../actions/TaskActions';
import {connect} from 'react-redux';
import {Link} from 'react-router';

if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}


class List extends Component {
    constructor(props){
        super(props);
        this.filterClick = this.filterClick.bind(this);
    }
    filterClick (e) {
        if (e.target.nodeName == "LI") {
            let children = this.refs.filter.childNodes;
            for (let i = 0; i<children.length;i++){
                if (children[i] === e.target) {
                    children[i].id="filter";
                } else {
                    children[i].id="";
                }
            }
            switch (e.target.title) {
                case VisibilityFilters.SHOW_ALL:
                    this.props.dispatch(setVisivilityFilter(VisibilityFilters.SHOW_ALL));
                    break;
                case VisibilityFilters.SHOW_COMPLETED:
                    this.props.dispatch(setVisivilityFilter(VisibilityFilters.SHOW_COMPLETED));
                    break;
                case VisibilityFilters.SHOW_ACTIVE:
                    this.props.dispatch(setVisivilityFilter(VisibilityFilters.SHOW_ACTIVE));
                    break;
            }
        }
    }
    render () {
        return (
                <div className ={styles.container}>
                    <ul className = {styles.state} ref="filter" onClick={this.filterClick}>
                        <li className={styles.type} id="filter" title="SHOW_ALL">所有</li>
                        <li className={styles.type} title="SHOW_ACTIVE">未完成</li>
                        <li className={styles.type} title="SHOW_COMPLETED">已完成</li>
                    </ul>
                    <div className = {styles.list}>
                        <Tasks  data={this.props.classes.filter((item,index)=>{
                                if (item.isSelected) {
                                    return true;
                                }
                            })} patch={this.props.dispatch} />
                    </div>
                    <div className = {styles.footer}>
                    <Link to='/Edit' className={styles.link}><p className={styles.add}><i className="fa fa-plus"></i> 新增任务</p></Link>
                    </div>
                </div>
            );
    }
}

function filterData(data,filter) {
    return Object.assign({},data,{
        classes:data.classes.map((classItem,index)=>{
            return Object.assign({},classItem,{
                tasks:classItem.tasks.map((task,index)=>{
            return Object.assign({},task,{
                titles:task.titles.filter((title,index)=>{
                    if (task.state[index]===filter){
                        return true;
                    }
                    return false;
                }),
                contents:task.contents.filter((title,index)=>{
                    if (task.state[index]===filter){
                        return true;
                    }
                    return false;
                }),
                state:task.state.filter((title,index)=>{
                    if (task.state[index]===filter){
                        return true;
                    }
                    return false;
                }),
                isSelected:task.isSelected.filter((title,index)=>{
                    if (task.state[index]===filter){
                        return true;
                    }
                    return false;
                })
            })
        })
    })
     })
    });
}

function selectTasks(data, filter) {
  switch (filter) {
    case "SHOW_ALL":
      return data;
    case "SHOW_COMPLETED":
        return filterData(data,1);
    case "SHOW_ACTIVE":
        return filterData(data,0);
  }
}
function mapStateToProps (state){
    return {
            classes:selectTasks(state,state.visibilityFilter).classes
  };
}

export default connect(mapStateToProps)(List);