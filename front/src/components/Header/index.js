import React, { Component } from 'react';
import { FaHome, FaTrello } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './header.scss';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <Link className='home' to='/'><FaHome/></Link>
        <div className='title'>
          <FaTrello/>
          <h1>SIMPLE TRELLO</h1>
        </div>
        <div/>
      </div>
    );
  }
}

export default Header;
