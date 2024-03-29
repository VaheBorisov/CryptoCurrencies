import React from 'react';

import { Link } from "react-router-dom";

import Search from './Search'

import logo from './logo.png';

import "./Header.css";

export default function Header() {
    return (
        <div className="Header">
            <Link to="/" > <img src={logo} alt="logo" className="Header-logo" /> </Link>

            <Search />

            <Link to="/currencies/favourites" className="favourites">Favourites</Link>
        </div>
    );
};