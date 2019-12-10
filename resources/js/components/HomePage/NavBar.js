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
import Logo from "./Logo";
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
        axios.get('/api/user').then(response => {
            this.setState({
                data: response.data.user
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    componentWillMount() {
        if (localStorage.getItem('jwt') == null) {
            this.setState({
                isLoggedIn: false,
                role: '',
                name: '',
                surname: ''
            });
        } else {
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
                    <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
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
        if (name != '') {
            button_1 = (
                <h6>Hello,&#160;{name}&#160;{surname},&#160;Role:{role}</h6>
            );
        } else {
            button_1 = (
                <h6>Hi, Guest</h6>
            );
        }
        if (role == 'admin') {
            button_2 = (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/subsidiaries">Subsidiaries<span
                            className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/employees">Employees<span
                            className="sr-only">(current)</span></Link>
                    </li>
                </ul>
            );
        } else if (role == 'supervisor') {
            button_2 = (
                <li className="nav-item">
                    <Link className="nav-link" to="/subsidiaries">Subsidiaries<span
                        className="sr-only">(current)</span></Link>
                </li>
            );
        }
        else if (role == 'worker') {
            button_2 = (
                <li className="nav-item">
                    <Link className="nav-link" to="/orders">Orders<span
                        className="sr-only">(current)</span></Link>
                </li>
            );
        }
        return (
            <header>
                <Logo/>
                {button_1}
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNav" aria-controls="navbarNav"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home<span className="sr-only">(current)</span></Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/cars">Cars<span
                                    className="sr-only">(current)</span></Link>
                            </li>
                            {button_2}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About<span
                                    className="sr-only">(current)</span></Link>
                            </li>

                        </ul>
                        {button_0}
                    </div>
                </nav>
            </header>
        );
    }
}
export default NavBar;
