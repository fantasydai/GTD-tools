import React,{Proptype,Component} from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import AddClass from '../AddClass/AddClass';
import styles from './App.css';
export default class App extends Component {
    render () {
        return (
            <div className={styles.container}>
                <Header />
                <Main>
                    {this.props.children}
                </Main>
                <AddClass />
            </div>
        )
    }
}