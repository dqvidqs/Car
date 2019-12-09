import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";


export default class SubsidiaryShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sub: {},
            works: []
        }

        console.log(super());
    }

    componentDidMount() {
        axios.get("/api/subsidiary/" + this.props.params.id).then(response => {
            console.log(response);
            this.setState({
                sub: response.data.subsidiaries,
                works: response.data.workers
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    render() {
        let button;
        if (localStorage.getItem('role') == 'admin') {
            button = (
                <div>
                    <h>Actions:</h>
                    <div>
                        <Link to={"/subsidiary-update/" + this.state.sub.id}> Update </Link>
                    </div>
                    <div>
                        <Link to={"/subsidiary-delete/" + this.state.sub.id}> Delete </Link>
                    </div>
                </div>
            );
        }
        let workers;
        if (localStorage.getItem('role') == 'supervisor') {
            button = (
                <div>
                    <div className="card-body">
                        <h3>Workers:</h3>
                    </div>
                    <ul>
                        {this.state.works.map(worker =>
                            <li>
                                <Link
                                    to={"/subsidiary/" + this.state.sub.id + "/worker/" + worker.id+"/cars"}> {worker.name}&#160;{worker.surname} </Link>
                            </li>
                        )}
                    </ul>
                </div>
            );
        }
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <label>Name:&#160;</label>
                                <h>{this.state.sub.name}</h>
                            </div>
                            <div className="card-body">
                                <label>Country:&#160;</label>
                                <h>{this.state.sub.country}</h>
                            </div>
                            <div className="card-body">
                                <label>City:&#160;</label>
                                <h>{this.state.sub.city}</h>
                            </div>
                            <div className="card-body">
                                <label>Street:&#160;</label>
                                <h>{this.state.sub.street}</h>
                            </div>
                            <div className="card-body">
                                <label>Created:&#160;</label>
                                <h>{this.state.sub.created_at}</h>
                            </div>
                            <div className="card-body">
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('subsidiaryshow')) {
    ReactDOM.render(<SubsidiaryShow />, document.getElementById('subsidiaryshow'));
}
