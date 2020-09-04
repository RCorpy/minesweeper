import React, {useState} from 'react'
import {connect} from 'react-redux'
import InputSelector from './InputSelector'

function MenuModal(props) {

    const [rows, setRows] = useState(props.state.rows)
    const [columns, setColumns] = useState(props.state.columns)
    const [bombs, setBombs] = useState(props.state.bombs)

    const handleSet = () => {
        props.setNewSizes(rows, columns, bombs)
        props.close()
    }

    return (
        <div class="menuModal">
            <div className="modalContent">
                <span class="close" onClick={props.close}>&times;</span>
                <div className="selectorsAndButton">
                    <InputSelector value={rows} setter={setRows} name="rows" />
                    <InputSelector value={columns} setter={setColumns} name="columns"/>
                    <InputSelector value={bombs} setter={setBombs} name="bombs"/>
                    <button onClick={handleSet}>Set</button>
                </div>
            </div>
        </div>
    )
}

const connectedMenuModal = connect(state => ({state:state}), (dispatch)=>({
    setNewSizes: (rows, columns, bombs) => dispatch({
        type: 'CHANGE_BOARD_SIZE',
        rows: rows,
        columns: columns,
        bombs: bombs
    })
}))(MenuModal)
  export default connectedMenuModal;