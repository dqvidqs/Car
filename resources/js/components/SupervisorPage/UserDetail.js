import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";


export default class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }

        //console.log(super());
    }

    componentDidMount() {
        console.log(this.props);
        axios.get("/api/subsidiary/" + this.props.params.ids + "/worker/" + this.props.params.idw + "/car/" + this.props.params.idc).then(response => {
            console.log(response);
            this.setState({
                user: response.data.user,
            });
        }).catch(errors => {
            //console.log(errors);
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <label>Name:&#160;</label>
                                <h>{this.state.user.name}</h>
                            </div>
                            <div className="card-body">
                                <label>Surname:&#160;</label>
                                <h>{this.state.user.surname}</h>
                            </div>
                            <div className="card-body">
                                <label>Email:&#160;</label>
                                <h>{this.state.user.email}</h>
                            </div>
                            <div className="card-body">
                            <label>Role:&#160;</label>
                            <h>{this.state.user.role}</h>
                        </div>
                            <div className="card-body">
                                <label>Brand:&#160;</label>
                                <h>{this.state.user.brand}</h>
                            </div>
                            <div className="card-body">
                                <label>Model:&#160;</label>
                                <h>{this.state.user.model}</h>
                            </div>
                            <div className="card-body">
                                <label>Vin:&#160;</label>
                                <h>{this.state.user.vin}</h>
                            </div>
                            <div className="card-body">
                                <label>Created:&#160;</label>
                                <h>{this.state.user.created_at}</h>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('userdetail')) {
    ReactDOM.render(<UserDetail />, document.getElementById('userdetail'));
}
