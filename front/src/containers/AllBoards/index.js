import React, {Component} from 'react';
import {connect} from "react-redux";
import {getAllBoards, addNewBoard, deleteBoard} from "../../store/boardsCollection/thunk";
import AddNewBoard from "../../components/AddNewBoard";
import BaseButton from "../../components/BaseButton";
import Board from "../../components/Board";
import Loader from 'react-loader-spinner';
import './allBoards.scss'

class AllBoards extends Component {
    state = {
        newBoardTitle: '',
        newBoardDescription: '',
        activeAddNewForm: false,
    };

    componentDidMount() {
        const {onGetAllBoards, boardsData} = this.props;
        if (!boardsData.length) onGetAllBoards();
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value})
    };

    addNewBoard = async () => {
        const payload = {
            title: this.state.newBoardTitle,
            description: this.state.newBoardDescription,
        };
        await this.props.onAddNewBoard(payload);
        await this.setState({newBoardTitle: '', newBoardDescription: '', activeAddNewForm: false});
    };

    goToBoard = id => {
        this.props.history.push(`board/${id}`);
    };

    render() {
        const {activeAddNewForm, newBoardTitle, newBoardDescription} = this.state;
        const {loading, boardsData} = this.props;
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
                        onClick={() => this.goToBoard(item.boardId)}
                        onDelete={() => this.props.onDeleteBoard(item.boardId)}
                    />
                )) : null)}
                {activeAddNewForm ? <AddNewBoard
                        onClickClose={() => this.setState({activeAddNewForm: false})}
                        title={newBoardTitle}
                        titleName='newBoardTitle'
                        description={newBoardDescription}
                        descriptionName='newBoardDescription'
                        handleChange={this.handleChange}
                        onClickAdd={this.addNewBoard}
                    /> :
                    <BaseButton
                        onClick={() => this.setState({activeAddNewForm: true})}
                        label={'Create New Board'}
                    />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.boardsCollection
};

const mapDispatchToProps = dispatch => {
    return {
        onGetAllBoards: () => dispatch(getAllBoards()),
        onAddNewBoard: payload => dispatch(addNewBoard(payload)),
        onDeleteBoard: payload => dispatch(deleteBoard(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllBoards);