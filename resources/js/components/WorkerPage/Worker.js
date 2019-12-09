import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";

export default class Worker extends Component {
    constructor(){
        super();
        this.state ={
            employees: []
        }
    }
    componentWillMount(){
        axios.get('/api/employees').then(response =>{
            this.setState({
                employees: response.data.employees
            });
        }).catch(errors =>{
            console.log(errors);
        })
    }
    render() {
        return (
            <div>
                <Link to={"/employee-post"}> Post </Link>
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.employees.map(employee =>
                        <tr>
                            <td>{employee.name}</td>
                            <td>{employee.surname}</td>
                            <td>{employee.role}</td>
                            <td><Link to={"/employee/" + employee.id}> VIEW </Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById('workers')) {
    ReactDOM.render(<Worker />, document.getElementById('workers'));
}
