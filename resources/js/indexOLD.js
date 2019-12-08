/*import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Example from "./components/Example";
import Subsidiary from "./components/Subsidiary";
import SubsidiaryShow from "./components/SubsidiaryShow";
import SubsidiaryStore from "./components/SubsidiaryStore";
import Register from "./components/Register";
import Login from "./components/Login";
import SubsidiaryDelete from "./components/SubsidiaryDelete";
import SubsidiaryUpdate from "./components/SubsidiaryUpdate";
import setAuthorizationToken from "./utils/AuthorizationToken";
import { connect } from 'redux';
setAuthorizationToken(localStorage.getItem('jwt'));



export default class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="collapse navbar-collapse" id="navbarsExample02">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/" >Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/subsidiaries">Subsidiaries<span className="sr-only">(current)</span></Link>
                            </li>
                        </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link  className="nav-link" to="/register">Register<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link  className="nav-link" to="/login">Login<span className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <Link  className="nav-link" to="/logout">Logout<span className="sr-only">(current)</span></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>


                </div>
                <div>

                    <Switch>
                        <Route path="/register" exact render={props => <Register{...props}/>}/>
                        <Route path="/login" exact render={props => <Login{...props}/>}/>
                        <Route path="/subsidiaries">
                            <Subsidiary/>
                        </Route>
                        <Route path="/subsidiary-post" exact render={props => <SubsidiaryStore{...props}/>}/>
                        <Route path="/subsidiary/:id" exact render={props => <SubsidiaryShow{...props}/>}/>
                        <Route path="/subsidiary-delete/:id" exact render={props => <SubsidiaryDelete{...props}/>}/>
                        <Route path="/subsidiary-update/:id" exact render={props => <SubsidiaryUpdate{...props}/>}/>
                        <Route path="/users">
                            <Example/>
                        </Route>
                        <Route path="/">
                            <Example/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}
/*NavigationBar.propTpes={
    auth: React.propTypes.object.isRequired
}

function  mapStateToProps(state) {
    return {
        auth: state.auth
    };
}*/
/*if (document.getElementById('main')) {
    ReactDOM.render(<Index />, document.getElementById('main'));
}
*/
