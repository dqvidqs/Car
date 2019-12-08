import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router";
import setAuthorizationToken from "../../utils/AuthorizationToken";
import { connect } from 'react-redux';
import axios from "axios";
setAuthorizationToken(localStorage.getItem('jwt'));

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isLoggedIn: false,
            wasLoggedIn: false,
            update: false,
            role: '',
            name: '',
            surname: ''
        };
    }
    componentDidMount() {
        axios.get('/api/user').then(response =>{
            this.setState({
                data: response.data.user
            });
        }).catch(errors =>{
            console.log(errors);
        })
    }

    componentWillMount() {
        if(localStorage.getItem('jwt') == null) {
            this.setState({
                isLoggedIn: false,
                role: '',
                name: '',
                surname: ''
            });
        }
        else{
            this.setState({
                isLoggedIn: true,
                role: localStorage.getItem('role'),
                name: localStorage.getItem('name'),
                surname: localStorage.getItem('surname')
            });
        }
    }
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (localStorage.getItem('jwt') == null) {
            this.state.isLoggedIn = false;
            if (this.state.isLoggedIn != this.state.wasLoggedIn) {
                this.state.isLoggedIn = false;
                this.state.wasLoggedIn = false;
                this.state.role = '';
                this.state.name = '';
                this.state.surname = '';
                this.forceUpdate();
            }
        }
        if (localStorage.getItem('jwt') != null) {
            this.state.isLoggedIn = true;
            if (this.state.isLoggedIn != this.state.wasLoggedIn) {
                this.state.isLoggedIn = true;
                this.state.wasLoggedIn = true;
                this.state.role = localStorage.getItem('role');
                this.state.name = localStorage.getItem('name');
                this.state.surname = localStorage.getItem('surname');
                this.forceUpdate();
            }
        }
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const role = this.state.role;
        const name = this.state.name;
        const surname = this.state.surname;
        let button_0;//LOG IN// LOGOUT
        let button_1;//NAME SURNAME
        let button_2;//USER WORKER ADMIN SUPERVISOR
        if (!isLoggedIn) {
            button_0 = (
                <ul className="navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link> </li>
                </ul>
            );
        } else {
            button_0 = (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout">Logout<span
                            className="sr-only">(current)</span></Link>
                    </li>
                </ul>
            );
        }
        if(name != ''){
            button_1 = (
                <div><h6>{name}&#160;{surname}&#160;{role}</h6></div>
            );
        }
        else{
            button_1 = (
                <div><h6>Guest</h6></div>
            );
        }
        if(role == 'admin'){
            button_2 = (
                <li className="nav-item">
                    <Link className="nav-link" to="/subsidiaries">Subsidiaries<span
                        className="sr-only">(current)</span></Link>
                </li>
            );
        }
        else if(role == 'worker'){
            button_2 = (
                <div><h6>Guest</h6></div>
            );
        }
        else if(role == 'supervisor'){
            button_2 = (
                <li className="nav-item">
                    <Link className="nav-link" to="/subsidiaries">Subsidiaries<span
                        className="sr-only">(current)</span></Link>
                </li>
            );
        }
        else if(role == 'user'){
            button_2 = (
                <div><h6>Guest</h6></div>
            );
        }
        return (
            <div>
                {button_1}
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cars">Cars<span
                                    className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                        {button_2}
                        {button_0}
                    </div>
                </nav>
            </div>
        );
    }
}
export default NavBar;
