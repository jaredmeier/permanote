import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="home-content-background">
        <div className="home-content">
            <div className="content-header">
                <h1>Your notes will be here. Even when you no longer are.</h1>
            </div>
            <div className="content-text">
                <h3>Stay organized and find information faster. Meeting notes, projects, to-do lists — take any kind of note and rest peacefully knowing it’s here forever.</h3>
            </div>
            <div className="content-sign-up">
                <Link to="/signup">
                    <button>SIGN UP</button>
                </Link>
            </div>
            <div className="hero-image-container">
                <img src={heroURL} />
            </div>
        </div>
    </div>
)