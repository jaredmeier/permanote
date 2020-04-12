import React from "react";
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router-dom';

// Session
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import DemoLogin from './session/demo_login';

// Homepage
import Home from "./home/home";

// Main
import Main from './main/main';


const App = () => (
    <div>
        <AuthRoute exact path="/" component={Home} />
        
        <AuthRoute path="/signup" component={SignupFormContainer} />
        <AuthRoute path="/signin" component={LoginFormContainer} />


        <Route exact path="/demo" component={DemoLogin} />

        <ProtectedRoute path="/notes" component={Main} />
        <ProtectedRoute path="/notebooks" component={Main} />
    </div>
);

export default App;

//look into how to protect all / routes beyond any specified above