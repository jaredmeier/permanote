import React from 'react';
import { Link } from 'react-router-dom';

import Nav from './home_nav_bar';
import Content from './home_content';


export default () => (
    <div className="home-container">
        <Nav />
        <Content />
    </div>
)
