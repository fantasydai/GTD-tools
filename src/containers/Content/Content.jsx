import React ,{Component} from 'react';
import styles from './Content.css';
import {connect} from 'react-redux';
import {completeTask,removeTask} from '../../actions/TaskActions';

class Title extends Component {
    constructor (props) {
        super(props);
        this.EditClick = this.EditClick.bind(this);
        this.completeClick = this.completeClick.bind(this);
        this.delClick = this.delClick.bind(this);
    }
    EditClick () {
            this.props.history.replaceState({
                title:this.props.data.title,
                date:this.props.data.date,
                content:this.props.data.content
            },'edit');
    }
    completeClick() {
            let confirmComplete = confirm("确认完成该任务？");
            if(confirmComplete) {
                this.props.dispatch(completeTask(this.props.data.title,this.props.data.date));
            }
    }
    delClick () {
        let confirmComplete = confirm("确认删除该任务？");
            if(confirmComplete) {
                this.props.dispatch(removeTask(this.props.data.title,this.props.data.date,this.props.data.content));
            }
    }
    render(){
            if (this.props.data.state) {
                return (
                <div className={styles.title}>
                    <p className={styles.titleBefore}>任务标题：
                        <span>{this.props.data.title}
                            <span className={styles.state}> (已完成)</span>
                            <span className={styles.delete} title='点击删除任务' onClick={this.delClick}><i className="fa fa-close"></i></span>
                        </span>
                    </p>
                </div>
            );
            } else {
                return (
                <div className={styles.title}>
                    <p className={styles.titleBefore}>任务标题：
                        <span>{this.props.data.title}</span>
                        <span className={styles.edit} title='点击编辑任务' onClick={this.EditClick}><i className="fa fa-edit"></i></span>
                        <span className={styles.complete} title='点击完成任务' onClick={this.completeClick}><i className="fa fa-check"></i></span>
                    </p>
                </div>
                );
            }
    }
}
class Date extends Component {
    render(){
        return (
                <div className={styles.date}>
                    <p className={styles.dateBefore}>任务时间：<span>{this.props.date}</span></p>
                </div>
            );
    }
}
class Text extends Component {
    render(){
        return (
                <div >
                    <p className={styles.content}>{this.props.content}</p>
                </div>
            );
    }
}
class Content extends Component {
    constructor(props) {
        super(props);
        this.getData=this.getData.bind(this);
    }
    getData() {
        let title,date,content,state;
        this.props.classes.forEach((item,index)=>{
            if (item.isSelected && item.tasks) {
                item.tasks.forEach((task,index)=>{
                    task.isSelected.forEach((isSelect,index)=> {
                        if (isSelect) {
                            title = task.titles[index];
                            content = task.contents[index];
                            date = task.date;
                            state=task.state[index];
                        }
                    })
                })
            }
        })
        return {'title':title||"",'content':content||"",'date':date||"",state:state||0};
    }
    render () {
         const data = this.getData();
        return (
            <div className={styles.container}>
                <Title data={data} history={this.props.history} dispatch={this.props.dispatch} />
                <Date date={data.date} />
                <Text content={data.content} />
            </div>
            );
    }
}
function mapStateToProps (state) {
    return {
        classes:state.classes
    }
}
export default connect(mapStateToProps)(Content);