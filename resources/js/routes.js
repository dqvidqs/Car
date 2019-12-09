import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App'
import Greetings from "./components/HomePage/Greetings";
import Login from "./components/HomePage/Login";
import Subsidiary from "./components/SubsidiaryPage/Subsidiary";
import SubsidiaryShow from "./components/SubsidiaryPage/SubsidiaryShow";
import Logout from "./components/HomePage/Logout";
import Car from "./components/CarPage/Car";
import CarShow from "./components/CarPage/CarShow";
import SubsidiaryStore from "./components/SubsidiaryPage/SubsidiaryStore";
import SubsidiaryDelete from "./components/SubsidiaryPage/SubsidiaryDelete";
import SubsidiaryUpdate from "./components/SubsidiaryPage/SubsidiaryUpdate";
import Worker from "./components/WorkerPage/Worker";
import WorkerShow from "./components/WorkerPage/WorkerShow";
import WorkerStore from "./components/WorkerPage/WorkerStore";
import WorkerDelete from "./components/WorkerPage/WorkerDelete";
import WorkerUpdate from "./components/WorkerPage/WorkerUpdate";
import CarStore from "./components/CarPage/CarStore";
import CarDelete from "./components/CarPage/CarDelete";
import CarUpdate from "./components/CarPage/CarUpdate";
import CarOrders from "./components/CarPage/CarOrders";
import CarConfirm from "./components/CarPage/CarConfirm";
import CarOrdered from "./components/CarPage/CarOrdered";
import WorkerDetail from "./components/SupervisorPage/WorkerDetail";
import UserDetail from "./components/SupervisorPage/UserDetail";
import About from "./components/HomePage/About";
import Register from "./components/HomePage/Register";

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Greetings}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/register" component={Register}/>
        <Route path="/cars" component={Car}/>
        <Route path="/car/:id" component={CarShow}/>
        <Route path="/subsidiaries" component={Subsidiary}/>
        <Route path="/subsidiary/:id" component={SubsidiaryShow}/>
        <Route path="/subsidiary-post" component={SubsidiaryStore}/>
        <Route path="/subsidiary-delete/:id" component={SubsidiaryDelete}/>
        <Route path="/subsidiary-update/:id" component={SubsidiaryUpdate}/>
        <Route path="/employees" component={Worker}/>
        <Route path="/employee/:id" component={WorkerShow}/>
        <Route path="/employee-post" component={WorkerStore}/>
        <Route path="/employee-delete/:id" component={WorkerDelete}/>
        <Route path="/employee-update/:id" component={WorkerUpdate}/>
        <Route path="/car-post" component={CarStore}/>
        <Route path="/car-delete/:id" component={CarDelete}/>
        <Route path="/car-update/:id" component={CarUpdate}/>
        <Route path="/orders" component={CarOrders}/>
        <Route path="/car-confirm/:id" component={CarConfirm}/>
        <Route path="/car-order/:id" component={CarOrdered}/>
        <Route path="/subsidiary/:ids/worker/:idw/cars" component={WorkerDetail}/>
        <Route path="/subsidiary/:ids/worker/:idw/car/:idc" component={UserDetail}/>
    </Route>
)
