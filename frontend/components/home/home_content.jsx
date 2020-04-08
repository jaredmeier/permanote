import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div className="home-content-background">
        <div className="home-content">
            <div className="content-header">
                <h1>Your notes. Organized. Effortless.</h1>
            </div>
            <div className="content-text">
                <h3>Take notes anywhere. Find information faster. Share ideas with anyone. Meeting notes, web pages, projects, to-do lists—with Evernote as your note taking app, nothing falls through the cracks.</h3>
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