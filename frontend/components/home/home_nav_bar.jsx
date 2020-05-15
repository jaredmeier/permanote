import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="nav-container">
        <div className="nav-logo-container">
            <img src={window.logoInlineURL} className="home-nav-logo" />
        </div>
        <div className="nav-links">
            
            <a href="https://github.com/jaredmeier/permanote" target="_blank"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/jar-m/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://angel.co/u/jared-meier" target="_blank"><i className="fab fa-angellist"></i></a>
        </div>
        <div className="nav-signup">
            <Link to="/signup">Sign up</Link>
        </div>
        <p>or</p>
        <div className="nav-login">
            <Link to="/signin">
                <button>Sign in</button>
            </Link>
        </div>
    </div>
)