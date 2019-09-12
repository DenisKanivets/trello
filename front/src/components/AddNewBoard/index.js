import React, { Component } from 'react';
import './addNewBoard.scss';

class AddNewBoard extends Component {
  render() {
    const { onClose, title, description, handleChange, onAdd, titleName, descriptionName } = this.props;
    return (
      <div className='wrapper'>
        <img src={require('../../assets/images/close.png')} alt='close' className='close' onClick={onClose}/>
        <div className='form'>
          <p className='text'>Enter title of board</p>
          <input
            className='input'
            onChange={handleChange}
            value={title} name={titleName}
            autoFocus
          />
          <p className='text'>Optional: Enter description of board</p>
          <textarea
            className='input'
            onChange={handleChange}
            rows='5'
            name={descriptionName}
            value={description}
          />
          <button className='add' onClick={onAdd}>Create</button>
        </div>
      </div>
    );
  }
}

export default AddNewBoard;