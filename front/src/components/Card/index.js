import React, { Component } from 'react';
import { FaRegEdit } from 'react-icons/all';
import { Draggable } from 'react-beautiful-dnd';
import './card.scss';

class Card extends Component {
  render() {
    const { draggableId, name, time, complete, openCard, draggableIndex } = this.props;
    let colorTime;
    if (complete) {
      colorTime = 'green';
    } else if (new Date(time) < new Date()) {
      colorTime = 'red';
    } else if (new Date() > new Date(new Date(time).setDate(new Date(time).getDate() - 2))) {
      colorTime = 'yellow';
    }

    return (
      <Draggable draggableId={draggableId} index={draggableIndex}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='card-wrapper'
            onClick={openCard}
          >
            <h5>{name}</h5>
            <FaRegEdit className='card-edit-icon'/>
            {time ? <p className={`card-time ${colorTime}-time`}>
              {new Date(time).toLocaleDateString('en-GB', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </p> : null}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;