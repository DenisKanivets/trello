import React, { Component } from 'react';
import { FaTimes, FaChalkboard, FaStackExchange, FaRegTrashAlt, FaClock } from 'react-icons/fa';
import Calendar from 'react-calendar';
import Checkbox from 'react-simple-checkbox';
import './cardModal.scss';

class CardModal extends Component {
  state = {
    editDescription: false,
    calendarModal: false,
    description: this.props.cardData.cardDescription,
    endTime: this.props.cardData.cardEndTime,
    complete: this.props.cardData.cardComplete,
  };

  checkCardStatus = async () => {
    await this.setState({ complete: !this.state.complete });
    this.props.editStatus(this.state.complete);
  };

  clickDay = async value => {
    await this.setState({ calendarModal: false, endTime: value });
    this.props.editTime(this.state.endTime);
  };

  render() {
    const {
      cardData: { cardName },
      listData: { listTitle },
      closeModal,
      saveDescription,
      deleteCard
    } = this.props;
    const { editDescription, description, endTime, complete, calendarModal } = this.state;
    const cardEndTimeShortString = new Date(endTime).toLocaleDateString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <div className='card-modal-wrapper'>
        <FaTimes className='close-modal card-modal-icon' onClick={closeModal}/>
        <div className='card-modal-flex'>
          <FaChalkboard className='card-modal-icon'/>
          <p className='card-modal-title'>{cardName}</p>
        </div>
        <p className='card-modal-list-info'>in list <u>{listTitle}</u></p>
        <div className='card-modal-flex'>
          <FaClock className='card-modal-icon'/>
          <p className='card-modal-description'>Due Date</p>
        </div>
        <div className='card-modal-flex'>
          <button
            className='card-modal-button calendar-button'
            onClick={() => this.setState({ calendarModal: !calendarModal })}
          >
            {calendarModal ? 'Close' : 'Set Due Date'}
          </button>
          {endTime && <div className='card-modal-flex'>
            <Checkbox
              className='card-modal-checkbox'
              size={2}
              checked={complete}
              onChange={this.checkCardStatus}
              tickAnimationDuration={300}
              color={'#707070'}
            />
            <p className='card-modal-time'>{cardEndTimeShortString}</p>
            {complete && <p className='card-modal-complete-text'>COMPLETE</p>}
          </div>}
        </div>
        {calendarModal && <Calendar
          minDate={new Date()}
          onClickDay={this.clickDay}
          className='modal-calendar'
        />}
        <div className='card-modal-flex'>
          <FaStackExchange className='card-modal-icon'/>
          <p className='card-modal-description'>Description</p>
        </div>
        <div>
          <textarea
            className='card-modal-textarea'
            cols="70"
            rows={editDescription ? 6 : 3}
            onChange={e => this.setState({ description: e.target.value })}
            onFocus={() => this.setState({ editDescription: true })}
            onBlur={() => this.setState({ editDescription: false })}
            value={description}
          />
          {editDescription && (
            <button
              className='card-modal-button'
              onMouseDown={() => saveDescription(description)}
            >Save Changes</button>
          )}
        </div>
        <div>
          <div className='card-modal-flex archive'>
            <FaRegTrashAlt className='card-modal-icon'/>
            <button onClick={deleteCard} className='card-modal-archive'>Archive Card</button>
          </div>
        </div>
      </div>
    );
  }
}

export default CardModal;