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


export default class WorkerStore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: '',
            working: '',
            subs: []
        }
    }
    handleNameChange(e){
        this.setState({
            name: e.target.value
        });
    }
    handleSurnameChange(e){
        this.setState({
            surname: e.target.value
        });
    }
    handleRoleChange(e){
        this.setState({
            role: e.target.value
        });
    }
    handleWorkingChange(e){
        this.setState({
            working: e.target.value
        });
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
    handleConfirmationChange(e){
        this.setState({
            password_confirmation: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.state.subs =  '';
        console.log(this.state);
        axios.put('/api/employee/' + this.props.params.id, this.state)
            .then(response => {
                browserHistory.push('/employees');
            })
            .catch(errors => {
                console.log(errors);
            });
    }
    componentDidMount() {
        axios.get('/api/subsidiaries').then(response =>{
            this.setState({
                subs: response.data.subsidiaries
            });
        }).catch(errors =>{
            console.log(errors);
        })
        axios.get("/api/employee/" + this.props.params.id).then(response => {
            console.log(response);
            this.setState({
                name: response.data.employees.name,
                surname: response.data.employees.surname,
                role: response.data.employees.role,
                working: response.data.employees.working,
                email: response.data.employees.email,
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
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <label>Name:</label><br/>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={this.handleNameChange.bind(this)}
                                        value={this.state.name}
                                    /><br/>
                                    <label>Surname:</label><br/>
                                    <input
                                        type="text"
                                        name="surname"
                                        onChange={this.handleSurnameChange.bind(this)}
                                        value={this.state.surname}
                                    /><br/>
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
                                    <label>Password confirm:</label><br/>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        onChange={this.handleConfirmationChange.bind(this)}
                                        value={this.state.password_confirmation}
                                    /><br/>
                                    <label>Roles:</label><br/>
                                    <select onChange={this.handleRoleChange.bind(this)} value={this.state.role}>
                                        <option value="null">---</option>
                                        <option value="worker">Worker</option>
                                        <option value="supervisor">Supervisor</option>
                                    </select>
                                    <br/>
                                    <label>Working at:</label><br/>
                                    <select onChange={this.handleWorkingChange.bind(this)} value={this.state.working}>
                                        <option value="null">---</option>
                                        {this.state.subs.map(sub =>
                                            <option value={sub.id}>{sub.name}</option>)
                                        }
                                    </select>
                                    <br/>
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

if (document.getElementById('subsidiarystore')) {
    ReactDOM.render(<SubsidiaryStore />, document.getElementById('subsidiarystore'));
}
