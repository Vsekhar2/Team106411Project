import React, { Component } from 'react';
import greLogo from '../svgs/GRE.png';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="logo"><img src={greLogo}/></div>
        <ul>
          <Link to="/">
            <li className="active">Home</li>
          </Link>
          <Link to="/Survey">
            <li>Survey</li>
          </Link>
          <Link to="/Search">
            <li>Search</li>
          </Link>
        </ul>
    </div>
  )
}

export default NavBar
