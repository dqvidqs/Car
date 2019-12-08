import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class SubsidiaryUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            country: '',
            city: '',
            street: ''
        }
        console.log(super());
    }
    handleNameChange(e){
        this.setState({
           name: e.target.value
        });
    }
    handleCountryChange(e){
        this.setState({
            country: e.target.value
        });
    }
    handleCityChange(e){
        this.setState({
            city: e.target.value
        });
    }
    handleStreetChange(e){
        this.setState({
            street: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios.put('/api/subsidiary/' + this.props.match.params.id, this.state)
            .then(response => {
                console.log(response);
                this.props.history.push('/subsidiaries')
            })
            .catch(errors => {
                console.log(errors);
            });
    }
    componentDidMount() {
        axios.get("/api/subsidiary/" + this.props.match.params.id, this.state).then(response =>{
            this.setState({
                name: response.data.subsidiaries.name,
                country: response.data.subsidiaries.country,
                city: response.data.subsidiaries.city,
                street: response.data.subsidiaries.street,
            });
        }).catch(errors =>{
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
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <label>Name:</label><br/>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={this.handleNameChange.bind(this)}
                                        value={this.state.name}
                                    /><br/>
                                    <label>Country:</label><br/>
                                    <input
                                        type="text"
                                        name="country"
                                        onChange={this.handleCountryChange.bind(this)}
                                        value={this.state.country}
                                    /><br/>
                                    <label>City:</label><br/>
                                    <input
                                        type="text"
                                        name="city"
                                        onChange={this.handleCityChange.bind(this)}
                                        value={this.state.city}
                                    /><br/>
                                    <label>Street:</label><br/>
                                    <input
                                        type="text"
                                        name="street"
                                        onChange={this.handleStreetChange.bind(this)}
                                        value={this.state.street}
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

if (document.getElementById('subsidiaryupdate')) {
    ReactDOM.render(<SubsidiaryUpdate />, document.SubsidiaryUpdate('subsidiaryupdate'));
}
