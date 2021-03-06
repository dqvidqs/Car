import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
    withRouter,
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
    Link, browserHistory
} from "react-router";
import setAuthorizationToken from "../../utils/AuthorizationToken";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            password_confirmation: ''
        }
    }
    handleNameChange(e){
        this.setState({
           name: e.target.value
        });
    }
    handleSurnameChange(e){
        this.setState({
            surname: e.target.value
        });
    }
    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }
    handlePasswordConfirmationChange(e){
        this.setState({
            password_confirmation: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/register', this.state)
            .then(response => {
                console.log(response)
                const token = response.data.token;
                localStorage.setItem('jwt', token);
                setAuthorizationToken(token);
                let decoded = jwt_decode(token);
                localStorage.setItem('name', decoded.name);
                localStorage.setItem('surname', decoded.surname);
                localStorage.setItem('role', decoded.role);;
                setAuthorizationToken(token);
                browserHistory.push('/');
            })
            .catch(errors => {
                console.log(errors)
            })
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <label>Name:</label><br/>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={this.handleNameChange.bind(this)}
                                        value={this.state.name}
                                    /><br/>
                                    <label>Surname:</label><br/>
                                    <input
                                        type="text"
                                        name="surname"
                                        onChange={this.handleSurnameChange.bind(this)}
                                        value={this.state.surname}
                                    /><br/>
                                    <label>Email:</label><br/>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={this.handleEmailChange.bind(this)}
                                        value={this.state.email}
                                    /><br/>
                                    <label>Password:</label><br/>
                                    <input
                                        type="password"
                                        name="password"
                                        onChange={this.handlePasswordChange.bind(this)}
                                        value={this.state.password}
                                    /><br/>
                                    <label>Password Confirm:</label><br/>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        onChange={this.handlePasswordConfirmationChange.bind(this)}
                                        value={this.state.password_confirmation}
                                    /><br/>
                                    <button type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('register')) {
    ReactDOM.render(<Register />, document.getElementById('register'));
}
