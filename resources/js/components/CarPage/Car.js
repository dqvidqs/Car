import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";

export default class Car extends Component {
    constructor() {
        super();
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        axios.get('/api/cars').then(response => {
            this.setState({
                cars: response.data.cars
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    render() {
        const role = localStorage.getItem('role');
        let button_0;
        if (role == 'worker') {
            button_0 = (<Link to={"/car-post"}> Post </Link>);
        }
        return (
            <div className="container">
                {button_0}
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Year</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.cars.map(car =>
                        <tr>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.year}</td>
                            <td><Link to={"/cars/" + car.id}> VIEW </Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById('cars')) {
    ReactDOM.render(<Car />, document.getElementById('cars'));
}
