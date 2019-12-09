import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";


export default class WorkerShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {}
        }

        console.log(super());
    }

    componentDidMount() {
        axios.get("/api/employee/" + this.props.params.id).then(response => {
            console.log(response);
            this.setState({
                employee: response.data.employees,
            });
        }).catch(errors => {
            console.log(errors);
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
                                <h>{this.state.employee.name}</h>
                            </div>
                            <div className="card-body">
                                <label>Surname:&#160;</label>
                                <h>{this.state.employee.surname}</h>
                            </div>
                            <div className="card-body">
                                <label>Email:&#160;</label>
                                <h>{this.state.employee.email}</h>
                            </div>
                            <div className="card-body">
                                <label>Role:&#160;</label>
                                <h>{this.state.employee.role}</h>
                            </div>
                            <div className="card-body">
                                <label>Working at:&#160;</label>
                                <h>{this.state.employee.workingid}</h>
                            </div>
                            <div className="card-body">
                                <label>Created:&#160;</label>
                                <h>{this.state.employee.created_at}</h>
                            </div>
                            <div className="card-body">
                                <h>Actions:</h>
                                <div>
                                    <Link to={"/employee-update/" + this.state.employee.id}> Update </Link>
                                </div>
                                <div>
                                    <Link to={"/employee-delete/" + this.state.employee.id}> Delete </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('workershow')) {
    ReactDOM.render(<WorkerShow />, document.getElementById('workershow'));
}
