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


export default class CarOrdered extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordered: "1",
        }
    }
    componentDidMount() {
        axios.put("/api/car/" + this.props.params.id, this.state).then(response => {
            console.log(response);
            browserHistory.push('/cars');
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
                                Ordered!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('carordered')) {
    ReactDOM.render(<CarOrdered />, document.getElementById('carordered'));
}
