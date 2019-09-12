import React, { Component } from 'react';
import './baseButton.scss';

class BaseButton extends Component {
  render() {
    const { label, onClick } = this.props;
    return (
      <button className='button' onClick={onClick}>{label}</button>
    );
  }
}

export default BaseButton;
