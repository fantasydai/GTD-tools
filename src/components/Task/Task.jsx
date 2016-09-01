import React,{Component} from 'react';
import styles from './Task.css';
import {selectTask} from '../../actions/TaskActions.js';
import {Link} from 'react-router';

class Title extends Component {
    constructor(props) {
        super(props)
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick() {
        this.props.patch(selectTask(this.props.taskIndex,this.props.title));
    }

    render (){
        if (this.props.isSelected) {
            return (
                    <Link to="/detail" className={styles.link}><li className={styles.choosenTitle}>{this.props.title}</li></Link>
                );
        } else {
            return (
            <Link to="/detail" className={styles.link}><li className={styles.title} onClick={this.handleClick}>{this.props.title}</li></Link>
            );
        }
    }
}

class Task extends Component {
    render () {
            return (
                <div>
                            <li className={styles.date}>{this.props.task.date}</li>
                            <ul>
                                {this.props.task.titles.map((title,index)=>
                                    <Title title={title} taskIndex={this.props.taskIndex} isSelected={this.props.task.isSelected[index]} key={index} patch={this.props.patch} />
                                )}
                            </ul>
                </div>
            );
    }
}

export default class Tasks extends Component {

    render () {
        if(this.props.data[0].tasks.length>0) {
            return (
                <ul >
                    {this.props.data[0].tasks.map((item,index)=>{
                        if (item.titles.length > 0) {
                          return <Task task={item} key={index} patch={this.props.patch} taskIndex={index} />
                        }
                    }
                    )}
                </ul>
            );
        } else {
            return (
                <p className={styles.tip}>点击下方按钮添加任务</p>
                );
        }
    }
}