import  React,{Component} from 'react';
import styles from './Welcome.css';

export default class Welcome extends Component {
    render () {
        return (
                <div className={styles.container}>
                    <h2 className={styles.welcome}>Welcome to use GTD-Tools</h2>
                </div>
            );
    }
}