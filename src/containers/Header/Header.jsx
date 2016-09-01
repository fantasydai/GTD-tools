import React,{Component}from 'react';
import styles from './Header.css';

export default class Header extends Component {
    render () {
        return (
            <header className = {styles.header}>
                <h1 className={styles.logo}>GTD Tools</h1>
            </header>
        );
    }
}