import React, {Component} from 'react';
import {FaTimesCircle} from 'react-icons/fa';
import './addNewBoard.scss'

class AddNewBoard extends Component {
    render() {
        const {onClickClose, title, description, handleChange, onClickAdd, titleName, descriptionName} = this.props;
        return (
            <div className='wrapper'>
                <FaTimesCircle className='close' onClick={onClickClose}/>
                <div className='form'>
                    <p className='text'>Enter title of board</p>
                    <input
                        className='input'
                        onChange={handleChange}
                        value={title} name={titleName}
                    />
                    <p className='text'>Optional: Enter description of board</p>
                    <textarea
                        className='input'
                        onChange={handleChange}
                        rows='5'
                        name={descriptionName}
                        value={description}
                    />
                    <button className='add' onClick={onClickAdd}>Add</button>
                </div>
            </div>
        )
    }
}

export default AddNewBoard;