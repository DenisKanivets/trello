import React, { Component } from 'react';
import './list.scss';
import { FaCheckSquare, FaEdit, FaPlus, FaRegTrashAlt, FaTimes } from 'react-icons/fa';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from '../Card';

class List extends Component {
  state = {
    editingTitle: false,
    localTitle: this.props.title,
    addCardModal: false,
    newCardName: '',
  };

  renameTitle = () => {
    this.props.onRename(this.state.localTitle);
    this.setState({ editingTitle: false });
  };

  addNewCard = () => {
    this.props.onAddNewCard(this.state.newCardName);
    this.setState({ addCardModal: false, newCardName: '' });
  };

  render() {
    const { droppableId, droppableIndex, title, onDelete, allCardsArray, openCardModal } = this.props;
    const { editingTitle, localTitle, addCardModal, newCardName } = this.state;
    return (
      <Draggable draggableId={droppableId} index={droppableIndex}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='list-wrapper'>
            <div {...provided.dragHandleProps} className='head'>
              {editingTitle ? <div className='flex'>
                <input autoFocus className='list-edit' value={localTitle} onKeyPress={e => {
                  if (e.key === 'Enter') this.renameTitle();
                }} onChange={e => this.setState({ localTitle: e.target.value })}/>
                <FaCheckSquare className='icon' onClick={this.renameTitle}/>
              </div> : <h5 className='list-title'>{title}</h5>}
              <div className='flex'>
                {editingTitle ? null : <div>
                  <FaEdit className='icon' onClick={() => this.setState({ editingTitle: true })}/>
                  <FaRegTrashAlt className='icon' onClick={onDelete}/>
                </div>}
              </div>
            </div>
            <hr/>
            <div className='cards'>
              {addCardModal ? (
                <div className='flex add-card-block'>
                  <input autoFocus className='list-edit add-card-input' value={newCardName} onKeyPress={e => {
                    if (e.key === 'Enter') this.addNewCard();
                  }} onChange={e => this.setState({ newCardName: e.target.value })}/>
                  <FaCheckSquare className='icon' onClick={this.addNewCard}/>
                  <FaTimes className='icon' onClick={() => this.setState({ addCardModal: false })}/>
                </div>
              ) : (
                <div className='flex add-card-btn' onClick={() => this.setState({ addCardModal: true })}>
                  <FaPlus className='icon'/>
                  <p className='add-card-txt'>Add a Card</p>
                </div>)}
              <Droppable droppableId={droppableId} type='card'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className='cards-content'
                    {...provided.droppableProps}
                  >
                    {allCardsArray ? allCardsArray.map((item, index) =>
                      <Card
                        key={item.cardId}
                        draggableId={item.cardId}
                        draggableIndex={index}
                        openCard={() => openCardModal(item)}
                        name={item.cardName}
                        time={item.cardEndTime}
                        complete={item.cardComplete}/>,
                    ) : null}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

export default List;