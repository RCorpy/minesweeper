import React from 'react'
import {connect} from 'react-redux'
import './NavBar.css'

function NavBar(props) {

    return (
        <div className="navbar">
            <button className="menubutton" onClick={()=>{props.changeRowsColumns(8, 10, props.state.bombs)}}>Menu</button>
            <button className="resetbutton" onClick={()=>{props.resetBoard([props.state.rows, props.state.columns], props.state.bombs)}}>Reset</button>
        </div>
    )
}

const connectedNavBar = connect(state => ({state:state}), (dispatch)=>({
    changeRowsColumns: (rows, columns, bombs) => dispatch({
        type: 'CHANGE_BOARD_SIZE',
        rows: rows,
        columns: columns,
        bombs: bombs
    }),
    resetBoard: (size, bombs) => dispatch({
        type: 'RESET_BOARD',
        size: size,
        bombs: bombs
    })
  }))(NavBar)
  export default connectedNavBar;

