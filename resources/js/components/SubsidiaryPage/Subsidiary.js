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
    componentWillMount(){
        axios.get('/api/subsidiaries').then(response =>{
            this.setState({
                subs: response.data.subsidiaries
            });
        }).catch(errors =>{
            console.log(errors);
        })
    }
    render() {
        return (
            <div className="container">
                <Link to={"/subsidiary-post"}> Post </Link>
                <ul>
                {this.state.subs.map(sub =>
                    <li>
                        <Link to={"/subsidiary/" + sub.id}> {sub.name} </Link>
                        <Link to={"/subsidiary-delete/" + sub.id}> DELETE </Link>
                        <Link to={"/subsidiary-update/" + sub.id}> UPDATE </Link>
                    </li>
                )}
                </ul>
            </div>
        );
    }
}

if (document.getElementById('subsidiaries')) {
    ReactDOM.render(<Subsidiary />, document.getElementById('subsidiaries'));
}
