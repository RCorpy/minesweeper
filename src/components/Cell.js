import React, {useState} from 'react'
import {connect} from 'react-redux'

function Cell(props) {

    const handleClick = (e) => {
        if (e.type === 'click') {
            if(props.type==="bomb"){
                console.log("BOOOOOM")
                props.setCell("clicked", [props.row, props.column])
            }
            else{
                props.setCell("clicked", [props.row, props.column])}
            

        }
        else if (e.type === 'contextmenu'){
            e.preventDefault()
            if(props.status==="marked"){props.setCell("unclicked" , [props.row, props.column])}
            else{
                props.setCell("marked" , [props.row, props.column])

            }
        }
    }


    if(props.status ==="clicked"){
        return (
        <>
            {props.type==="bomb" ? <button> 💣</button>: <button>{props.number}</button>}
        </>)
    }
    else if(props.status ==="marked"){
        return (<button onContextMenu={(e)=>{handleClick(e)}}>x</button>)
    }
    else { return (<button onClick={(e)=>handleClick(e)} onContextMenu={(e)=>{handleClick(e)}}>o</button>)}
}


const connectedCell = connect(state => ({state:state}), (dispatch)=>({
    setCell: (newStatus, position) => dispatch({
        type: 'SET_CELL',
        newStatus: newStatus,
        position: position
    })
  }))(Cell)
  export default connectedCell;