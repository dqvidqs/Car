import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    browserHistory
} from "react-router";


export default class CarDelete extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.delete("/api/car/" + this.props.params.id).then(response =>{
            browserHistory.push('/cars');
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

if (document.getElementById('cardelete')) {
    ReactDOM.render(<CarDelete />, document.getElementById('cardelete'));
}
