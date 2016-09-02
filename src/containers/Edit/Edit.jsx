import React ,{Component} from 'react';
import styles from './Edit.css';
import {Link,hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {addTask,removeTask} from '../../actions/TaskActions'

export default class Edit extends Component {
    constructor (props) {
        super(props)
        this.handleClick=this.handleClick.bind(this)
        this.findSameTitle = this.findSameTitle.bind(this)
    }
    findSameTitle (date,title) {
        let isTitleExist=false;
        this.props.classes.forEach((Class,index)=>{
            Class.tasks.forEach((task,index)=>{
                if(task.date == date&&task.titles.indexOf(title) >= 0) {
                    isTitleExist=true;
                }
            })
        })
        return isTitleExist;
    }
    handleClick(e) {
            let title = this.refs.titleInput.value,
                 date =this.refs.dateInput.value,
                 text =this.refs.textInput.value;
            if(title==""){
                this.refs.titleWarning.innerHTML="请输入任务标题！";
                this.refs.dateWarning.innerHTML="";
                this.refs.textWarning.innerHTML="";
                return;

            }else if(title.length>10){
                this.refs.titleWarning.innerHTML="标题长度不能超过10个字符！";
                this.refs.dateWarning.innerHTML="";
                this.refs.textWarning.innerHTML="";
                return;
            } else if (this.findSameTitle(date,title)){
                    this.refs.titleWarning.innerHTML="当天已存在相同任务！";
                    this.refs.dateWarning.innerHTML="";
                    this.refs.textWarning.innerHTML="";
                    return;
            } else{
                this.refs.titleWarning.innerHTML="";
            }
            //任务时间输入验证
            if(date==""){
                this.refs.dateWarning.innerHTML="请输入任务截止时间！";
                this.refs.titleWarning.innerHTML="";
                this.refs.textWarning.innerHTML="";
                return;
            }else if(!(/\d{4}-\d{2}-\d{2}/.test(date))){
                this.refs.dateWarning.innerHTML="请按指定格式(YYYY-MM-DD)输入截止时间！";
                this.refs.titleWarning.innerHTML="";
                this.refs.textWarning.innerHTML="";
                return;
            }else if(Date.parse(date)<(new Date()).getTime()){
                this.refs.dateWarning.innerHTML="截止时间应晚于当日！";
                this.refs.titleWarning.innerHTML="";
                this.refs.textWarning.innerHTML="";
                return;
            }
            else{
                this.refs.dateWarning.innerHTML="";
            }
            //任务内容输入验证
            if(text==""){
                this.refs.textWarning.innerHTML="请输入任务内容！";
                this.refs.dateWarning.innerHTML="";
                this.refs.titleWarning.innerHTML="";
                return;
            }else if(text.length>50){
                this.refs.textWarning.innerHTML="当前字符长度为"+text.length+"，任务内容长度不能大于50个字符！";
                this.refs.dateWarning.innerHTML="";
                this.refs.titleWarning.innerHTML="";
                return;
            }else{
                this.refs.textWarning.innerHTML="";
            }
            if (this.props.location.state) {
                let oldData = this.props.location.state;
                this.props.dispatch(removeTask(oldData.title,oldData.date,oldData.text));
                this.props.dispatch(addTask(title,date,text));
                hashHistory.push('/detail');
            } else {
                this.props.dispatch(addTask(title,date,text));
                hashHistory.push('/detail');
            }
    }
    render () {
        if (this.props.location.state){
            const data=this.props.location.state;
            return (
                <div className={styles.container}>
                    <div className={styles.title}>
                        <p className={styles.titleBefore}>任务标题：
                            <input  className={styles.write} ref='titleInput' defaultValue={data.title} />
                            <span className={styles.warning} ref='titleWarning'></span>
                        </p>
                    </div>

                    <div className={styles.date}>
                        <p className={styles.dateBefore}>任务时间：
                            <input  className={styles.write} type="date" ref='dateInput' defaultValue={data.date} />
                            <span className={styles.warning} ref='dateWarning'></span>
                        </p>
                    </div>

                    <div >
                        <textarea className={styles.writeContent} ref='textInput' defaultValue={data.content}></textarea>
                        <span className = {styles.warning} ref='textWarning'></span>

                        <div className={styles.form}>
                            <input className={styles.button} value="保存" type="button" onClick={this.handleClick} />
                            <Link to='/detail' className={styles.link}>
                                <input className={styles.button} value="取消" type="button" />
                            </Link>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <p className={styles.titleBefore}>任务标题：
                        <input  className={styles.write} ref='titleInput' />
                        <span className={styles.warning} ref='titleWarning'></span>
                    </p>
                </div>

                <div className={styles.date}>
                    <p className={styles.dateBefore}>任务时间：
                        <input  className={styles.write} type="date" ref='dateInput' />
                        <span className={styles.warning} ref='dateWarning'></span>
                    </p>
                </div>

                <div >
                    <textarea className={styles.writeContent} ref='textInput'></textarea>
                    <span className = {styles.warning} ref='textWarning'></span>

                    <div className={styles.form}>
                        <input className={styles.button} value="保存" type="button" onClick={this.handleClick} />
                        <Link to='/detail' className={styles.link}>
                            <input className={styles.button} value="取消" type="button" />
                        </Link>
                    </div>
                </div>
            </div>
            );
        }
    }
}

function mapStateToProps (state){
    return {
            classes:state.classes
  };
}
export default connect(mapStateToProps)(Edit)