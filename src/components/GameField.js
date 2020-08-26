import React , {useEffect} from 'react'
import './gamefield.css'
import Cell from './Cell'
import {connect} from 'react-redux'

function GameField(props) {

    useEffect(()=>{

        props.createBoard(props.state.rows, props.state.columns)
    },[])

    return (
        <div>
            {props.state.grid.map((row, rowIndex)=>row.map((cell, cellIndex) => {return (<Cell type={cell.type} number={cell.number} row={rowIndex} column={cellIndex} status={cell.status}/>)}))} 
            {JSON.stringify(props.state.grid)}
        </div>
    )
}

const connectedGameField = connect(state => ({state:state}), (dispatch)=>({
    createBoard: (rows, columns) => dispatch({
        type: 'CREATE_BOARD',
        size: [rows, columns]
    })
  }))(GameField)

  export default connectedGameField;