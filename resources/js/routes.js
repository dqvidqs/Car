import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App'
import Greetings from "./components/HomePage/Greetings";
import Login from "./components/HomePage/Login";
import Subsidiary from "./components/SubsidiaryPage/Subsidiary";
import SubsidiaryShow from "./components/SubsidiaryPage/SubsidiaryShow";
import Logout from "./components/HomePage/Logout";
import Car from "./components/CarPage/Car";

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Greetings}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/subsidiaries" component={Subsidiary}/>
        <Route path="/cars" component={Car}/>
        <Route path="/subsidiary/:id" component={SubsidiaryShow}/>
    </Route>
)
