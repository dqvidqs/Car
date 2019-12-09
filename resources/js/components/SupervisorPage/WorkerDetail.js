import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";


export default class WorkerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            works: {},
            cars:[]
        }

        console.log(super());
    }

    componentDidMount() {
        console.log(this.props);
        axios.get("/api/subsidiary/" + this.props.params.ids + "/worker/" + this.props.params.idw + "/cars").then(response => {
            console.log(response);
            this.setState({
                works: response.data.worker,
                cars: response.data.cars
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
                                <h>{this.state.works.name}</h>
                            </div>
                            <div className="card-body">
                                <label>Surname:&#160;</label>
                                <h>{this.state.works.surname}</h>
                            </div>
                            <div className="card-body">
                                <label>Working at:&#160;</label>
                                <h>{this.state.works.workingid}</h>
                            </div>
                            <div className="card-body">
                                <label>Email:&#160;</label>
                                <h>{this.state.works.email}</h>
                            </div>
                            <div className="card-body">
                                <label>Role:&#160;</label>
                                <h>{this.state.works.role}</h>
                            </div>
                            <div className="card-body">
                                <label>Created:&#160;</label>
                                <h>{this.state.works.created_at}</h>
                            </div>
                            <div className="card-body">
                                <ul>
                                {this.state.cars.map(car =>(
                                    <li>
                                        <Link
                                            to={"/subsidiary/" + this.state.works.working + "/worker/" + this.state.works.id+"/car/" + car.id}> {car.vin}&#160;{car.brand}&#160;{car.year}</Link>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('workerdetail')) {
    ReactDOM.render(<WorkerDetail />, document.getElementById('workerdetail'));
}
