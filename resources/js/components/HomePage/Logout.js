import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthorizationToken from "../../utils/AuthorizationToken";
import {
    Router,
    browserHistory
} from 'react-router';


export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.state= {
            data: ''
        }
        console.log(super());
    }

    componentDidMount() {
        axios.get('/api/logout')
            .then(response => {
                console.log(response);
                this.state.data = response.data;
                setAuthorizationToken(false);
                localStorage.clear();
                browserHistory.push('/');
            })
            .catch(errors => {
                console.log(errors)
            });

        console.log(this.state);
    }
    render() {
        return (
            <div className="jumbotron">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
//export default Login;
if (document.getElementById('logout')) {
    ReactDOM.render(<Logout />, document.getElementById('logout'));
}
