import React, {Component} from 'react';

class AddNewList extends Component {
    render() {
        const {onClickClose, title, handleChange, onClickAdd} = this.props;
        return (
            <>
                <button onClick={onClickClose}>close</button>
                <input onChange={handleChange} value={title}/>
                <button onClick={onClickAdd}>Add</button>
            </>
        )
    }
}

export default AddNewList;