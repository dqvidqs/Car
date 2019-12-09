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


export default class WorkerDelete extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.delete("/api/employee/" + this.props.params.id).then(response =>{
            browserHistory.push('/employees');
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

if (document.getElementById('workerdelete')) {
    ReactDOM.render(<WorkerDelete />, document.getElementById('workerdelete'));
}
