import React from "react";
import { AuthRoute } from '../util/route_util';
import { Route } from 'react-router-dom';

import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import Greeting from './session/test_greeting';


const App = () => (
    <div>
        <Route exact path="/" component={Greeting} />
        <AuthRoute path="/signin" component={LoginFormContainer} />
        <AuthRoute path="/signup" component={SignupFormContainer} />
    </div>
);

export default App;