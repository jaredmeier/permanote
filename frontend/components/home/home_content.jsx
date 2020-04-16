import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="home-content-background">
        <div className="home-content">
            <div className="content-header">
                <h1>Your notes will be here. Even when you no longer are.</h1>
            </div>
            <div className="content-text">
                <h3>Meeting notes, projects, to-do lists — take any kind of note and rest easy knowing it’s here forever. Some things are temporary. For everything else, there’s Permanote.</h3>
            </div>
            <div className="content-sign-up">
                <Link to="/signup">
                    <button>SIGN UP FOR FREE</button>
                </Link>
            </div>
            <div className="hero-image-container">
                <img src={heroURL} />
            </div>
        </div>
    </div>
)