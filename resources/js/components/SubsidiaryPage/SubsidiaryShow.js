import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    Link
} from "react-router";


export default class SubsidiaryShow extends Component {
    constructor(props){
        super(props);
        this.state={
            sub: {},
            works: []
        }

        console.log(super());
    }
    componentDidMount(){
        axios.get("/api/subsidiary/" + this.props.params.id).then(response =>{
            console.log(response);
            this.setState({
                sub: response.data.subsidiaries,
                works: response.data.workers
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
                            <div>
                                HI!
                            </div>
                            <div className="card-body">
                                <h>{this.state.sub.name}</h>
                            <ul>
                                {this.state.works.map(worker =>
                                    <li>
                                        <Link to={"/workers/" + worker.id}> {worker.name} </Link>
                                    </li>
                                )}
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('subsidiaryshow')) {
    ReactDOM.render(<SubsidiaryShow />, document.getElementById('subsidiaryshow'));
}
