import React,{Component} from 'react';
import styles from './Class.css';
import {connect} from 'react-redux';
import ClassItem from '../../components/ClassItem/ClassItem';
class List extends Component {
    render () {
            const {dispatch} = this.props;
        return (
                <ul className={styles.list} >
                    {this.props.lists.map((item,index) =>
                        <ClassItem data={item} key = {index} index={index} selectPatch={dispatch} />
                    )}
                </ul>
            )
    }
}

class Class extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick (e) {
        document.querySelector("#hideDiv").style.display="block";
    }
    render () {
            const {dispatch,classes} = this.props;
        return (
                <div className={styles.container}>
                    <h2 className={styles.title}>分类列表</h2>
                    <List lists={this.props.classes}  dispatch ={dispatch} />
                    <div className={styles.footer}>
                    <p className={styles.add} onClick={this.handleClick}><i className="fa fa-plus"></i> 新增分类</p>
                    </div>
                </div>
            )
    }
}
function select(state) {
  return {
            classes:state.classes
  };
}

export default connect(select)(Class);