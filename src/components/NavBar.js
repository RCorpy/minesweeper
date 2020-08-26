import React, {useState} from 'react'
import {connect} from 'react-redux'
import './NavBar.css'

function NavBar(props) {

    const [columns, setColumns] = useState(10)
    const [rows, setRows] = useState(6)
  
    return (
        <div className="navbar">
            <button className="menubutton" onClick={()=>{props.changeRowsColumns(rows, columns)}}>Menu</button>
            <button className="resetbutton" onClick={()=>{props.resetBoard([props.state.rows, props.state.columns])}}>Reset</button>
        </div>
    )
}

const connectedNavBar = connect(state => ({state:state}), (dispatch)=>({
    changeRowsColumns: (rows, columns) => dispatch({
        type: 'CHANGE_BOARD_SIZE',
        rows: rows,
        columns: columns
    }),
    resetBoard: (size) => dispatch({
        type: 'RESET_BOARD',
        size: size
    })
  }))(NavBar)
  export default connectedNavBar;

