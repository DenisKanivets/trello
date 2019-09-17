import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllBoards, addNewBoard, deleteBoard } from '../../store/boardsCollection/thunk';
import { getUser } from '../../store/auth/thunk';
import AddNewBoard from '../../components/AddNewBoard';
import BaseButton from '../../components/BaseButton';
import Board from '../../components/Board';
import Loader from 'react-loader-spinner';
import ReactModal from 'react-modal';
import './allBoards.scss';

class AllBoards extends Component {
  state = {
    newBoardTitle: '',
    newBoardDescription: '',
    activeAddNewForm: false,
  };

  async componentDidMount() {
    const { onGetAllBoards, onGetUser, auth: { userInfo }, history } = this.props;
    const userIdFromLS = localStorage.getItem('userId');
    const userId = userIdFromLS.substring(userIdFromLS.indexOf('-') + 1, userIdFromLS.length);
    if (userIdFromLS && !userInfo.userId) {
      await onGetUser(userId);
      await onGetAllBoards(userId);
    } else if (userIdFromLS && userInfo.userId) {
      await onGetAllBoards(userId);
    } else {
      history.push('');
    }
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  addNewBoard = async () => {
    const { newBoardTitle, newBoardDescription } = this.state;
    if (newBoardTitle.length > 0) {
      const payload = {
        title: newBoardTitle,
        description: newBoardDescription,
      };
      await this.props.onAddNewBoard(payload);
      await this.setState({ newBoardTitle: '', newBoardDescription: '', activeAddNewForm: false });
    } else {
      alert('Error! Please, enter correct board name.');
    }
  };

  render() {
    const { activeAddNewForm, newBoardTitle, newBoardDescription } = this.state;
    const { boardsCollection: { loading, boardsData }, history } = this.props;
    return (
      <div className='all-boards-wrapper'>
        {loading ? <Loader
          type='Oval'
          color='#1869a7'
          height={200}
          width={200}
          className='loader'
        /> : (boardsData ? boardsData.map(item => (
          <Board
            key={item.boardId}
            label={item.boardTitle}
            description={item.boardDescription}
            onClick={() => history.push(`boards/${item.boardId}`)}
            onDelete={() => this.props.onDeleteBoard(item._id)}
          />
        )) : null)}
        <ReactModal
          isOpen={activeAddNewForm}
          ariaHideApp={false}
          style={{
            overlay: {},
            content: {
              width: '360px',
              height: '300px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }}>
          <AddNewBoard
            onClose={() => this.setState({ activeAddNewForm: false })}
            title={newBoardTitle}
            titleName='newBoardTitle'
            description={newBoardDescription}
            descriptionName='newBoardDescription'
            handleChange={this.handleChange}
            onAdd={this.addNewBoard}
          />
        </ReactModal>
        <BaseButton
          onClick={() => this.setState({ activeAddNewForm: true })}
          label={'Create New Board'}
        />
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
    onGetAllBoards: payload => dispatch(getAllBoards(payload)),
    onAddNewBoard: payload => dispatch(addNewBoard(payload)),
    onDeleteBoard: payload => dispatch(deleteBoard(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBoards);