import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthorizationToken from "../../utils/AuthorizationToken";
import {
    Router,
    browserHistory
} from 'react-router';
import NavBar from "./NavBar";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        console.log(super());
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
    handleSubmit(e) {
        e.preventDefault();
        axios.post('/api/login', this.state)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('jwt',token);
                setAuthorizationToken(token);
                let decoded = jwt_decode(token);
                localStorage.setItem('name',decoded.name);
                localStorage.setItem('surname',decoded.surname);
                localStorage.setItem('role',decoded.role);
                browserHistory.push('/');
            })
            .catch(errors => {
                console.log(errors)
            })

        console.log(this.props);
    }
    render() {
        return (
            <div className="jumbotron">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
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
//export default Login;
if (document.getElementById('login')) {
    ReactDOM.render(<Login />, document.getElementById('login'));
}
