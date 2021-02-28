import React from 'react';

import logo from './logo.png'

import "./Header.css";

export default function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="logo" className="Header-logo" />
        </div>
    );
};