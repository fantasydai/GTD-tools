import React ,{Component} from 'react';
import styles from './ClassItem.css';
import * as Actions from '../../actions/ClassActions';
import {Link} from 'react-router';

export default class ClassItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
    }
    handleClick() {
            this.props.selectPatch(Actions.selectClass(this.props.index));
    }
    removeClick (e) {
        let mes = confirm('确认删除此类及其所有任务？');
        if(mes){
            this.props.selectPatch(Actions.removeClass(this.props.index));
        }
        e.stopPropagation();
    }
    render (){
        if (this.props.data.isSelected) {
            return (
                <li className={styles.selectedContainer} onClick={this.handleClick}>
                    <i className="fa fa-file"></i>
                    <span className={styles.name}>{this.props.data.className}</span>
                    <span className={styles.close} onClick={this.removeClick}>
                        <i className="fa fa-close"></i>
                    </span>
                </li>
            );
        } else {
            if (this.props.data.tasks.length>0){
                return (
                <Link to="/detail" className={styles.link} >
                    <li className={styles.container} onClick={this.handleClick}>
                        <i className="fa fa-file"></i>
                        <span className={styles.name}>{this.props.data.className}</span>
                        <span className={styles.close} onClick={this.removeClick}>
                            <i className="fa fa-close"></i>
                        </span>
                    </li>
                </Link>
                );
            } else {
                return (
                <Link to='/welcome' className={styles.link} >
                    <li className={styles.container} onClick={this.handleClick}>
                        <i className="fa fa-file"></i>
                        <span className={styles.name}>{this.props.data.className}</span>
                        <span className={styles.close} onClick={this.removeClick}>
                            <i className="fa fa-close"></i>
                        </span>
                    </li>
                </Link>
            );
            }
        }
    }
}