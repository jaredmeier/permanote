import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="nav-container">
        <div className="nav-logo-container">
            <img src={window.logoInlineURL} className="nav-logo" />
        </div>
        <div className="nav-links">
            <a href="https://github.com/jaredmeier/permanote">GITHUB</a>
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