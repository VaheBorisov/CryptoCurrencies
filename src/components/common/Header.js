import React from 'react';

import { Link } from "react-router-dom";

import logo from './logo.png'

import "./Header.css";

export default function Header() {
    return (
        <div className="Header">
            <Link to="/" > <img src={logo} alt="logo" className="Header-logo" /> </Link>

            <Link to="/currnecy/favourites" className="favourites" >Favourites</Link>
        </div>
    );
};