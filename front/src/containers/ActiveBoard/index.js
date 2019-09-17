import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setActiveBoard,
  addNewList,
  deleteList,
  renameList,
  dragAndDrop,
  addNewCard,
  updateCardDescription,
  updateCardEndTime,
  updateCardStatus,
  deleteCard,
} from '../../store/activeBoard/thunk';
import { getUser } from '../../store/auth/thunk';
import { getAllBoards } from '../../store/boardsCollection/thunk';
import Loader from 'react-loader-spinner';
import ReactModal from 'react-modal';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddNewList from '../../components/AddNewList';
import BaseButton from '../../components/BaseButton';
import List from '../../components/List';
import CardModal from '../../components/CardModal';
import './activeBoard.scss';

class ActiveBoard extends Component {
  state = {
    newListTitle: '',
    activeAddNewList: false,
    modalCardWindow: false,
    modalCardData: null,
    modalListData: null,
    localListsData: [],
  };

  async componentDidMount() {
    const { onGetAllBoards, onGetUser, onSetActiveBoard, auth: { userInfo }, match, history } = this.props;
    const userIdFromLS = localStorage.getItem('userId');
    const userId = userIdFromLS.substring(userIdFromLS.indexOf('-') + 1, userIdFromLS.length);
    if (userIdFromLS && !userInfo.userId) {
      await onGetUser(userId);
      await onGetAllBoards(userId);
      await onSetActiveBoard(match.params.id);
    } else if (userIdFromLS && userInfo.userId) {
      await onSetActiveBoard(match.params.id);
    }else {
      history.push('');
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.activeBoard.activeBoardData && JSON.stringify(nextProps.activeBoard.activeBoardData.lists) !== JSON.stringify(prevState.localListsData)
      && !nextProps.activeBoard.handleDropLoading) {
      return { localListsData: nextProps.activeBoard.activeBoardData.lists };
    }
    return null;
  }

  addList = () => {
    const { newListTitle } = this.state;
    if (newListTitle.length > 0) {
      this.props.onAddNewList(newListTitle);
      this.setState({ newListTitle: '', activeAddNewList: false });
    } else {
      alert('Error! Please, enter correct list name.');
    }
  };

  deleteList = item => {
    this.props.onDeleteList(item);
  };

  renameList = (item, newTitle) => {
    if (newTitle.length > 0) {
      const newItem = item;
      newItem.listTitle = newTitle;
      this.props.onRenameList(newItem);
    } else {
      alert('Error! Please, enter correct list name.');
    }
  };

  addCard = (item, newCardName) => {
    if (newCardName.length > 0) {
      this.props.onAddNewCard(item._id, newCardName);
    } else {
      alert('Error! Please, enter correct card name.');
    }
  };

  openCardModal = (card, item) => {
    this.setState({
      modalCardWindow: true,
      modalCardData: card,
      modalListData: item,
    });
  };

  deleteCard = () => {
    this.props.onDeleteCard(this.state.modalCardData, this.state.modalListData._id);
    this.setState({ modalCardWindow: false });
  };

  editDescription = newDescription => {
    this.props.onUpdateCardDescription(newDescription, this.state.modalListData._id, this.state.modalCardData._id);
  };

  editCardEndTime = newTime => {
    this.props.onUpdateCardEndTime(newTime, this.state.modalListData._id, this.state.modalCardData._id);
  };

  editCardStatus = newStatus => {
    this.props.onUpdateCardStatus(newStatus, this.state.modalListData._id, this.state.modalCardData._id);
  };

  onDragEnd = async result => {
    const { destination, source, draggableId, type } = result;
    let newListsData = this.props.activeBoard.activeBoardData.lists;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    if (type === 'list') {
      let newLists = [...newListsData];
      newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, newListsData.filter(item => draggableId === item.listId)[0]);
      this.setState({ localListsData: newLists });
      await this.props.onDragAndDrop(newLists);
      return;
    }
    const startCardsList = newListsData.filter(item => item.listId === source.droppableId)[0].cards;
    const finishCardsList = newListsData.filter(item => item.listId === destination.droppableId)[0].cards;
    if (startCardsList === finishCardsList) {
      let newList = [...startCardsList];
      newList.splice(source.index, 1);
      newList.splice(destination.index, 0, startCardsList.filter(item => draggableId === item.cardId)[0]);
      newListsData.forEach((elem, index) => {
        if (elem.listId === destination.droppableId) {
          newListsData[index].cards = [...newList];
        }
      });
    } else {
      let newStartList = [...startCardsList];
      newStartList.splice(source.index, 1);
      let newFinishList = [...finishCardsList];
      newFinishList.splice(destination.index, 0, startCardsList.filter(item => draggableId === item.cardId)[0]);
      newListsData.forEach((elem, index) => {
        if (elem.listId === source.droppableId) {
          newListsData[index].cards = [...newStartList];
        }
        if (elem.listId === destination.droppableId) {
          newListsData[index].cards = [...newFinishList];
        }
      });
    }
    this.setState({ localListsData: newListsData });
    await this.props.onDragAndDrop(newListsData);
  };

  render() {
    const { activeBoardData: { boardTitle, boardDescription }, loading } = this.props.activeBoard;
    const { newListTitle, activeAddNewList, modalCardWindow, modalCardData, modalListData, localListsData } = this.state;
    return (
      <div className='active-board-wrapper'>
        <ReactModal
          isOpen={modalCardWindow}
          ariaHideApp={false}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          style={{
            overlay: {
              background: 'rgba(103, 128, 159, 0.7)',
            },
            content: {
              background: '#f5f5f5',
              width: '700px',
              height: '470px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}>
          <CardModal
            cardData={modalCardData}
            listData={modalListData}
            closeModal={() => this.setState({ modalCardWindow: false })}
            saveDescription={newDescription => this.editDescription(newDescription)}
            editTime={newTime => this.editCardEndTime(newTime)}
            editStatus={newStatus => this.editCardStatus(newStatus)}
            deleteCard={this.deleteCard}
          />
        </ReactModal>
        <p className='title'>{boardTitle}</p>
        <p className='description'>{boardDescription}</p>
        <div className='content'>
          {loading ? <Loader
            type='Oval'
            color='#1869a7'
            height={200}
            width={200}
            className='loader'
          /> : (
            <DragDropContext
              onDragEnd={this.onDragEnd}>
              <Droppable droppableId='all-lists' direction='horizontal' type='list'>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className='drag-drop-context'
                  >{localListsData ? localListsData.map((item, index) =>
                    <List
                      key={item.listId}
                      droppableIndex={index}
                      droppableId={item.listId}
                      title={item.listTitle}
                      onDelete={() => this.deleteList(item)}
                      onRename={newTitle => this.renameList(item, newTitle)}
                      onAddNewCard={newCardName => this.addCard(item, newCardName)}
                      allCardsArray={item.cards}
                      openCardModal={card => this.openCardModal(card, item)}
                    />,
                  ) : null}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>)}
          {activeAddNewList ? <AddNewList
              onClose={() => this.setState({ activeAddNewList: false })}
              title={newListTitle}
              handleChange={e => this.setState({ newListTitle: e.target.value })}
              onAdd={this.addList}
            /> :
            <BaseButton
              onClick={() => this.setState({ activeAddNewList: true })}
              label={'Add New List'}
            />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: payload => dispatch(getUser(payload)),
    onSetActiveBoard: payload => dispatch(setActiveBoard(payload)),
    onGetAllBoards: payload => dispatch(getAllBoards(payload)),
    onAddNewList: payload => dispatch(addNewList(payload)),
    onDeleteList: payload => dispatch(deleteList(payload)),
    onRenameList: payload => dispatch(renameList(payload)),
    onDragAndDrop: payload => dispatch(dragAndDrop(payload)),
    onAddNewCard: (listId, newCardName) => dispatch(addNewCard(listId, newCardName)),
    onUpdateCardDescription: (newDescription, listId, cardId) => dispatch(updateCardDescription(newDescription, listId, cardId)),
    onUpdateCardEndTime: (newTime, listId, cardId) => dispatch(updateCardEndTime(newTime, listId, cardId)),
    onUpdateCardStatus: (newStatus, listId, cardId) => dispatch(updateCardStatus(newStatus, listId, cardId)),
    onDeleteCard: (payload, listId) => dispatch(deleteCard(payload, listId)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ActiveBoard);