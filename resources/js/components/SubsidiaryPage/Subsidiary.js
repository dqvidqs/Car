import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";

export default class Subsidiary extends Component {
    constructor(){
        super();
        this.state ={
            subs: []
        }
    }
    componentDidMount(){
        axios.get('/api/subsidiaries').then(response =>{
            this.setState({
                subs: response.data.subsidiaries
            });
        }).catch(errors =>{
            console.log(errors);
        })
    }
    render() {
        let button;
        if(localStorage.getItem('role')=='admin'){
            button=(<Link to={"/subsidiary-post"}> Post </Link>);
        }
        return (
            <div>
                {button}
                <table className="table">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Country</th>
                        <th scope="col">City</th>
                        <th scope="col">Street</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.subs.map(sub =>
                        <tr>
                            <td>{sub.name}</td>
                            <td>{sub.country}</td>
                            <td>{sub.city}</td>
                            <td>{sub.street}</td>
                            <td><Link to={"/subsidiary/" + sub.id}> VIEW </Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

if (document.getElementById('subsidiaries')) {
    ReactDOM.render(<Subsidiary />, document.getElementById('subsidiaries'));
}
