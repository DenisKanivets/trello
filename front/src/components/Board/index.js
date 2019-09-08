import React, {Component} from 'react';
import {FaTimesCircle} from 'react-icons/fa';
import './board.scss'

class Board extends Component {
    render() {
        const {label, description, onClick, onDelete} = this.props;
        return (
            <div className='board-wrapper'>
                <FaTimesCircle className='close' onClick={onDelete}/>
                <div onClick={onClick} className='board'>
                    <h4 className='title'>{label}</h4>
                    <p className='description'>{description}</p>
                </div>
            </div>
        );
    }
}

export default Board;
