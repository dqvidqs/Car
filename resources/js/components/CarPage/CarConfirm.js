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


export default class CarConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirm: "0",
        }
    }
    componentDidMount() {
        axios.get("/api/car/" + this.props.params.id).then(response => {
            console.log(response);
            this.setState({
                confirm: "1"
            });
        }).catch(errors => {
            console.log(errors);
        })
        axios.put("/api/car/" + this.props.params.id, this.state).then(response => {
            console.log(response);
            browserHistory.push('/orders');
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

if (document.getElementById('carconfirm')) {
    ReactDOM.render(<CarConfirm />, document.getElementById('carconfirm'));
}
