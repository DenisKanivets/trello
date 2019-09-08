import React, {Component} from 'react';
import {connect} from "react-redux";
import {setActiveBoard} from "../../store/activeBoardData/thunk";
import {getAllBoards} from "../../store/boardsCollection/thunk";
import Loader from 'react-loader-spinner';
import AddNewList from "../../components/AddNewList";
import BaseButton from "../../components/BaseButton";
import './activeBoard.scss'

class ActiveBoard extends Component {
    state = {
        newListTitle: '',
        activeAddNewList: false,
    };

    async componentDidMount() {
        const {onGetAllBoards, onSetActiveBoard, match} = this.props;
        await onGetAllBoards();
        await onSetActiveBoard(match.params.id);
    };

    addNewList = () => {
        //todo
        console.log(this.state.newListTitle);
        this.setState({activeAddNewList: false})
    };

    render() {
        const {boardTitle, boardDescription, lists} = this.props;
        const {newListTitle, activeAddNewList} = this.state;
        return (
            <div className='active-board-wrapper'>
                <p className='title'>{boardTitle}</p>
                <p className='description'>{boardDescription}</p>
                {lists ? (lists.length ? lists.map(item =>
                    <p>{item.listTitle}</p>
                ) : null) : <Loader
                    type='Oval'
                    color='#1869a7'
                    height={200}
                    width={200}
                    className='loader'
                />}
                {activeAddNewList ? <AddNewList
                        onClickClose={() => this.setState({activeAddNewList: false})}
                        title={newListTitle}
                        handleChange={e => this.setState({newListTitle: e.target.value})}
                        onClickAdd={this.addNewList}
                    /> :
                    <BaseButton
                        onClick={() => this.setState({activeAddNewList: true})}
                        label={'Add New List...'}
                    />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.activeBoardData
};

const mapDispatchToProps = dispatch => {
    return {
        onSetActiveBoard: payload => dispatch(setActiveBoard(payload)),
        onGetAllBoards: () => dispatch(getAllBoards()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ActiveBoard);