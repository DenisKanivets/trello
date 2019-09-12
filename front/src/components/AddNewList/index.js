import React, { Component } from 'react';
import './addNewList.scss';
import { FaTimes } from 'react-icons/fa';

class AddNewList extends Component {
  render() {
    const { onClose, title, handleChange, onAdd } = this.props;
    return (
      <div className='add-new-list-wrapper'>
        <input className='new-list-input' onKeyPress={e => {
          if (e.key === 'Enter') onAdd();
        }} onChange={handleChange} value={title} autoFocus/>
        <div className='new-list-options'>
          <button className='add-button' onClick={onAdd}>Add</button>
          <FaTimes className='close' onClick={onClose}/>
        </div>
      </div>
    );
  }
}

export default AddNewList;