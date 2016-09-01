import * as Types from '../constants/ActionType';

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

export default function rootReducer(state, action) {
  switch(action.type){
        case Types.SELECT_CLASS:
            return Object.assign({},state,{
                classes:state.classes.map((classItem,index)=>{
                    if (index === action.index) {
                        return Object.assign({},classItem,{isSelected:true});
                    }else {
                        return Object.assign({},classItem,{isSelected:false});
                    }
                })
            });
        case Types.REMOVE_CLASS:
            return Object.assign({},state,{
                classes: state.classes.filter((classItem,index)=>{
                     if(index === action.index) {
                        if(action.index === 0) {
                            alert("默认分类无法删除");
                            return true;
                        }
                        return false;
                    } else {
                        return true;
                    }
                }).map((classItem,index)=>{
                    if (index === 0){
                        return Object.assign({},classItem,{isSelected:true});
                    } else {
                        return Object.assign({},classItem);
                    }
                })
            });
        case Types.ADD_CLASS:
            return Object.assign({},state,{
                classes:state.classes.concat({
                    'className':action.value,
                    tasks:[],
                    isSelected:false
                })
            });
        case Types.SELECT_TASK:
            return Object.assign({},state,{
                classes:state.classes.map((classItem,index)=>{
                    if (classItem.isSelected) {
                        return Object.assign({},classItem,{
                            tasks:classItem.tasks.map((task,index)=>{
                                if (index == action.taskIndex) {
                                    return Object.assign({},task,{
                                        isSelected:task.isSelected.map((item,index)=>{
                                            if (task.titles[index] ==action.title) {
                                                return true;
                                            } else {
                                                return false;
                                            }
                                        })
                                    });
                                } else {
                                    return Object.assign({},task,{
                                        isSelected:task.isSelected.map((item,index)=>{
                                            return false;
                                        })
                                    });
                                }
                            })
                        });
                    }else {
                        return Object.assign({},classItem);
                    }
                })
            });
        case Types.ADD_TASK:
            return Object.assign({},state,{
                classes:state.classes.map ((item,index)=>{
                    if (item.isSelected) {
                        let isDateExist=item.tasks.some((task)=>{
                            if (task.date == action.date) {
                                return true;
                            }else {
                                return false;
                            }
                        });
                        if  (isDateExist) {
                            return Object.assign({},item,{
                                tasks:item.tasks.map((task,index)=>{
                                    if (task.date == action.date) {
                                        return Object.assign({},task,{
                                            titles:task.titles.concat(action.title),
                                            contents:task.contents.concat(action.text),
                                            state:task.state.concat(0),
                                            isSelected:task.isSelected.map((item,index)=>{
                                                    return false;
                                                }
                                                ).concat(true)
                                        });
                                    } else {
                                        return Object.assign({},task,{
                                            isSelected:task.isSelected.map((item,index)=>{
                                                    return false;
                                                })
                                        });
                                    }
                                })
                            });
                        } else {
                            return Object.assign({},item,{
                                tasks:item.tasks.map((task,item)=>{
                                    return Object.assign({},task,{
                                        isSelected:task.isSelected.map((item,index)=>{
                                                    return false;
                                                })
                                    });
                                }).concat({
                                    date:action.date,
                                    titles:[action.title],
                                    contents:[action.text],
                                    state:[0],
                                    isSelected:[true]
                                }).sort((task1,task2)=>{
                                   return Date.parse(task2.date)-Date.parse(task1.date)
                                })
                            });
                        }
                    } else {
                        return Object.assign({},item);
                    }
                })
            });
        case Types.REMOVE_TASK:
            return Object.assign({},state,{
                classes:state.classes.map((Class,index)=>{
                                return Object.assign({},Class,{
                                tasks:Class.tasks.map((task,index)=>{
                                    if (task.date == action.date) {
                                        let targetIndex = task.titles.indexOf(action.title);
                                        return Object.assign({},task,{
                                            titles:task.titles.slice(0,targetIndex).concat(task.titles.slice(targetIndex+1)),
                                            contents:task.contents.slice(0,targetIndex).concat(task.contents.slice(targetIndex+1)),
                                            state:task.state.slice(0,targetIndex).concat(task.state.slice(targetIndex+1)),
                                            isSelected:task.isSelected.slice(0,targetIndex).concat(task.isSelected.slice(targetIndex+1))
                                        });
                                    } else {
                                        return Object.assign({},task,{
                                            isSelected:task.isSelected.map((item,index)=>{
                                                    return false;
                                                })
                                        });
                                    }
                                })
                            });
                    })
            })

        case Types.COMPLETE_TASK:
            return Object.assign({},state,{
                classes : state.classes.map((Class,index)=>{
                    return Object.assign({},Class,{
                        tasks : Class.tasks.map((task,index)=> {
                            if (task.date == action.date) {
                                let targetIndex = task.titles.indexOf(action.title);
                                return Object.assign({},task,{
                                    state:task.state.slice(0,targetIndex).concat(1,task.state.slice(targetIndex+1))
                                });
                            } else {
                                return Object.assign({},task);
                            }
                        })
                    });
                })
            });
        case Types.VisibilityFilters.SHOW_ALL:
            return Object.assign({},state,{
                visibilityFilter:"SHOW_ALL"
            });
        case Types.VisibilityFilters.SHOW_COMPLETED:
            return Object.assign({},state,{
                visibilityFilter:"SHOW_COMPLETED"
            });
        case Types.VisibilityFilters.SHOW_ACTIVE:
            return Object.assign({},state,{
                visibilityFilter:"SHOW_ACTIVE"
            });
        default:
            return state;
    }
}