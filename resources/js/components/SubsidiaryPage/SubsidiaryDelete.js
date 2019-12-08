import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class SubsidiaryDelete extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.delete("/api/subsidiary/" + this.props.match.params.id).then(response =>{
            this.props.history.push('/subsidiaries')
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
                             DELETED
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('subsidiarydelete')) {
    ReactDOM.render(<SubsidiaryDelete />, document.getElementById('subsidiarydelete'));
}
