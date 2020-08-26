import React , {useState, useEffect} from 'react'
import './gamefield.css'
import Cell from './Cell'
import {connect} from 'react-redux'

function GameField(props) {

    const [columns, setColumns] = useState(10)
    const [rows, setRows] = useState(5)
    const [grid, setGrid] = useState([])

    useEffect(()=>{
        props.createBoard(rows, columns)
    },[columns])

    return (
        <div>
            {props.state.grid.map(row=>row.map(cell => {return (<Cell type="bomb" number={row} position={[1,2]}/>)}))}
            
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