import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
    Link, browserHistory
} from "react-router";


export default class CarStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: '',
            codename: '',
            model: '',
            year: '',
            price: '',
            run: '',
            power: '',
            vin: '',
            fuel:'',
            body:''
        }
    }
    componentDidMount() {
        axios.get("/api/car/" + this.props.params.id).then(response => {
            console.log(response);
            this.setState({
                brand: response.data.car.brand,
                codename: response.data.car.codename,
                model: response.data.car.model,
                year: response.data.car.year,
                price: response.data.car.price,
                run: response.data.car.run,
                power: response.data.car.power,
                vin: response.data.car.vin,
                fuel: response.data.car.fuel,
                body: response.data.car.body,
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    handleBrandChange(e){this.setState({brand: e.target.value});}
    handleCodenameChange(e){this.setState({codename: e.target.value});}
    handleModelChange(e){this.setState({model: e.target.value});}
    handleYearChange(e){this.setState({year: e.target.value});}
    handlePriceChange(e){this.setState({price: e.target.value});}
    handleRunChange(e){this.setState({run: e.target.value});}
    handlePowerChange(e){this.setState({power: e.target.value});}
    handleVinChange(e){this.setState({vin: e.target.value});}
    handleFuelChange(e){this.setState({fuel: e.target.value});}
    handleBodyChange(e){this.setState({body: e.target.value});}

    handleSubmit(e) {
        e.preventDefault();
        axios.put('/api/car/' + this.props.params.id, this.state)
            .then(response => {
                browserHistory.push('/cars');
            })
            .catch(errors => {
                console.log(errors);
            });
    }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <label>Brand:</label><br/>
                                    <input
                                        type="text"
                                        name="brand"
                                        onChange={this.handleBrandChange.bind(this)}
                                        value={this.state.brand}
                                    /><br/>
                                    <label>Codename:</label><br/>
                                    <input
                                        type="text"
                                        name="codename"
                                        onChange={this.handleCodenameChange.bind(this)}
                                        value={this.state.codename}
                                    /><br/>
                                    <label>Model:</label><br/>
                                    <input
                                        type="text"
                                        name="model"
                                        onChange={this.handleModelChange.bind(this)}
                                        value={this.state.model}
                                    /><br/>
                                    <label>Year:</label><br/>
                                    <input
                                        type="text"
                                        name="year"
                                        onChange={this.handleYearChange.bind(this)}
                                        value={this.state.year}
                                    /><br/>
                                    <label>Price:</label><br/>
                                    <input
                                        type="text"
                                        name="price"
                                        onChange={this.handlePriceChange.bind(this)}
                                        value={this.state.price}
                                    /><br/>
                                    <label>Run (km):</label><br/>
                                    <input
                                        type="text"
                                        name="run"
                                        onChange={this.handleRunChange.bind(this)}
                                        value={this.state.run}
                                    /><br/>
                                    <label>Power (kW):</label><br/>
                                    <input
                                        type="text"
                                        name="power"
                                        onChange={this.handlePowerChange.bind(this)}
                                        value={this.state.power}
                                    /><br/>
                                    <label>Fuel:</label><br/>
                                    <select onChange={this.handleFuelChange.bind(this)} value={this.state.fuel}>
                                        <option value="null">---</option>
                                        <option value="petrol">Petrol</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="electric">Electric</option>
                                        <option value="gas">Gas</option>
                                        <option value="petrol/gas">Petrol, Gas</option>
                                        <option value="petrol/gas/electric">Petrol, Gas, Electric</option>
                                    </select>
                                    <br/>
                                    <label>Body:</label><br/>
                                    <select onChange={this.handleBodyChange.bind(this)} value={this.state.body}>
                                        <option value="null">---</option>
                                        <option value="sedan">Sedan</option>
                                        <option value="wagon">Wagon</option>
                                        <option value="hatchback">Hatchback</option>
                                        <option value="suv">Suv</option>
                                        <option value="coupe">Coupe</option>
                                    </select>
                                    <br/>
                                    <label>VIN:</label><br/>
                                    <input
                                        type="text"
                                        name="vin"
                                        onChange={this.handleVinChange.bind(this)}
                                        value={this.state.vin}
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

if (document.getElementById('carstore')) {
    ReactDOM.render(<CarStore />, document.getElementById('carstore'));
}
