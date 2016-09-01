import React,{Component} from 'react';
import styles from './addClass.css';
import {connect} from 'react-redux';
import {addClass} from '../../actions/ClassActions';

class Content extends Component {
    constructor(props) {
        super(props);
        this.cancelClick = this.cancelClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
    }
    cancelClick() {
        this.refs.warning.innerHTML="";
        this.refs.input.value="";
        this.refs.addClass.parentNode.style.display="none";
    }
    saveClick(e) {
        let value = this.refs.input.value;
        if (value.length>0){
            let isExist = this.props.data.some ((item,index)=>
             (value == item['className'])
            );
            if (isExist) {
                this.refs.warning.innerHTML="类名已存在";
            } else {
                this.props.patch(addClass(value));
                this.cancelClick();
            }
        } else {
            this.refs.warning.innerHTML="请输入正确类名";
        }
    }
    render() {
        return (
                <div className={styles.container} ref="addClass">
                    <p className={styles.newClass}>
                        <span className={styles.title}><i className="fa fa-list"></i> 新建分类</span>
                        <span className={styles.close} onClick={this.cancelClick}><i className="fa fa-close"></i></span>
                    </p>
                    <div className={styles.inputClass}>
                        分类名称：
                        <input type="text" ref="input"  className={styles.input} />
                    </div>
                    <p className={styles.warning} ref="warning"></p>
                    <div className={styles.buttons}>
                        <input type="button" value="保存" className={styles.button} onClick={this.saveClick} />
                        <input type="button" value="取消" className={styles.button} onClick={this.cancelClick} />
                    </div>
                </div>
            );
    }
}

class AddClass extends Component {
    render() {
        return (
                <div className={styles.hidebg} id="hideDiv" ref="hide">
                    <Content  data={this.props.classes} patch={this.props.dispatch} />
                </div>
            );
    }
}

function mapStateToProps(state) {
  return {
            classes:state.classes
  };
}
export default connect(mapStateToProps)(AddClass);