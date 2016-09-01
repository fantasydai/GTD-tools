import React ,{Component} from 'react';
import { Router, Route, Link } from 'react-router'
import Class from "../Class/Class";
import List from '../List/List';
import Detail from '../Detail/Detail';
import styles from './Main.css'

export default class Main extends Component {
    render () {
        return (
                <div className={styles.main}>
                    <Class />
                    <List />
                    <Detail>{this.props.children}</Detail>
                </div>
            )
    }
}
