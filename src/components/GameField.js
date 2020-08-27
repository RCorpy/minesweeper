import React , {useEffect} from 'react'
import './gamefield.css'
import Cell from './Cell'
import {connect} from 'react-redux'

function GameField(props) {

    /* eslint-disable */
    useEffect(()=>{ 
        props.createBoard(props.state.rows, props.state.columns, props.state.bombs)
    }, [])
    /* eslint-enable */

    if(props.state.victory || props.state.defeat){
        return(
            <div>
                {props.state.grid.map((row, rowIndex)=>row.map((cell, cellIndex) => {return (<Cell key={`${rowIndex}${cellIndex}`} type={cell.type} number={cell.number} row={rowIndex} column={cellIndex} status={"clicked"}/>)}))} 
            </div>
        )
    }

    return (
        <div>
            {props.state.grid.map((row, rowIndex)=>row.map((cell, cellIndex) => {return (<Cell key={`${rowIndex}${cellIndex}`} type={cell.type} number={cell.number} row={rowIndex} column={cellIndex} status={cell.status}/>)}))} 
        </div>
    )
}

const connectedGameField = connect(state => ({state:state}), (dispatch)=>({
    createBoard: (rows, columns, bombs) => dispatch({
        type: 'CREATE_BOARD',
        size: [rows, columns],
        bombs: bombs
    })
  }))(GameField)

  export default connectedGameField;