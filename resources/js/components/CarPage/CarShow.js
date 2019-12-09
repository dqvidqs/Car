import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";


export default class CarShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            car: {}
        }

        console.log(super());
    }

    componentDidMount() {
        axios.get("/api/car/" + this.props.params.id).then(response => {
            console.log(response);
            this.setState({
                car: response.data.car
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    render() {
        let button_0;
        if(localStorage.getItem('role')=='worker'){
            button_0 = (
                <div>
                    <h>Actions:</h>
                    <div>
                        <Link to={"/car-update/" + this.state.car.id}> Update </Link>
                    </div>
                    <div>
                        <Link to={"/car-delete/" + this.state.car.id}> Delete </Link>
                    </div>
                </div>
            );
        }
        let button_1;
        if(localStorage.getItem('role')=='user'){
            button_1 = (
                <div>
                    <h>Actions:</h>
                    <div>
                        <Link to={"/car-order/" + this.state.car.id}> Order </Link>
                    </div>
                </div>
            );
        }
        let codename;
        if (this.state.car.codename != null) {
            codename = (
                <div className="card-body">
                    <label>Codename:&#160;</label>
                    <h>{this.state.car.codename}</h>
                </div>
            )
        }
        let run;
        if (this.state.car.run != null) {
            run = (
                <div className="card-body">
                    <label>Run:&#160;</label>
                    <h>{this.state.car.run}&#160;km</h>
                </div>
            )
        }
        let fuel;
        if (this.state.car.fuel != null) {
            fuel = (
                <div className="card-body">
                    <label>Fuel:&#160;</label>
                    <h>{this.state.car.fuel}</h>
                </div>
            )
        }
        let body;
        if (this.state.car.body != null) {
            body = (
                <div className="card-body">
                    <label>Body:&#160;</label>
                    <h>{this.state.car.body}</h>
                </div>
            )
        }
        let power;
        if (this.state.car.power != null) {
            power = (
                <div className="card-body">
                    <label>Power:&#160;</label>
                    <h>{this.state.car.power}</h>
                </div>
            )
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                {button_0}
                            </div>
                            <div className="card-body">
                                <label>Brand:&#160;</label>
                                <h>{this.state.car.brand}</h>
                            </div>
                            {codename}
                            <div className="card-body">
                                <label>Model:&#160;</label>
                                <h>{this.state.car.model}</h>
                            </div>
                            <div className="card-body">
                                <label>Year:&#160;</label>
                                <h>{this.state.car.year}</h>
                            </div>
                            <div className="card-body">
                                <label>Price:&#160;</label>
                                <h>{this.state.car.price}&#160;Eu</h>
                            </div>
                            {run}
                            {power}
                            {fuel}
                            {body}
                            <div className="card-body">
                                <label>VIN:&#160;</label>
                                <h>{this.state.car.vin}</h>
                            </div>
                            <div className="card-body">
                                <label>Created:&#160;</label>
                                <h>{this.state.car.created_at}</h>
                            </div>
                            <div className="card-body">
                                {button_1}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('carshow')) {
    ReactDOM.render(<CarShow />, document.getElementById('carshow'));
}
