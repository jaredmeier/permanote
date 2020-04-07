import React from 'react';

import { Link } from "react-router-dom";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.processForm(this.state).then(() => {
            this.props.history.push('/');
            this.setState({ email: "", password: "" });
        }); 
    }

    updateForm(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    render() {        
        // debugger
        return (
            <>
                <div className="session-form-container">
                    <div className="heading">
                        <img src={window.logoURL} className="session-form-logo" />
                        <div className="logo-byline">Remember everything important.</div>
                    </div>
                    <form onSubmit={this.handleSubmit} type="" className="session-form">
                        <input 
                            type="text"
                            placeholder="Email"
                            className="session-form-input"
                            onChange={this.updateForm('email')}
                            value={this.state.email} 
                        />
                        <br />
                        <input 
                            type="password"
                            placeholder="Password"
                            className="session-form-input"
                            onChange={this.updateForm('password')}
                            value={this.state.password} 
                        />
                        <FormErrors errors={this.props.errors} />
                        <button type="submit" className="session-form-submit button">{this.props.buttonText}</button>
                    </form>
                    <br />
                    <FormLink formType={this.props.formType}/>
                </div>
            </>
        )
    }
}

const FormLink = ( {formType} ) => {
    let link = null;
    let text = null;
    if (formType === "Sign in") {
        link = (<Link to="/signup">Create account</Link>);
        text = "Don't have an account?";
    } else {
        text = "Already have an account?";
        link = (<Link to="/signin">Sign in</Link>);
    }
    return (
        <div className="session-form-switch">
            <div>{text}</div>
            {link}
        </div>
    )
}

const FormErrors = ( {errors} ) => {
    return (
        <div className="session-form-errors">
            {errors}
        </div>
    )
}

export default SessionForm;

//Already have an account? Sign in
//Don't have an account? Create account
//A user with that email address already exists in the system.Either request a forgotten password or select another email address.